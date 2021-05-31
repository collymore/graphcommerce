import { useQuery } from '@apollo/client'
import { TextField } from '@material-ui/core'
import { useCartQuery, useFormGqlMutationCart } from '@reachdigital/magento-cart'
import AddressFields from '@reachdigital/magento-customer/AddressFields'
import { CustomerDocument } from '@reachdigital/magento-customer/Customer.gql'
import NameFields from '@reachdigital/magento-customer/NameFields'
import { StoreConfigDocument, CountryRegionsDocument } from '@reachdigital/magento-store'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import InputCheckmark from '@reachdigital/next-ui/Form/InputCheckmark'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import {
  useFormAutoSubmit,
  useFormPersist,
  phonePattern,
  useFormCompose,
  UseFormComposeOptions,
} from '@reachdigital/react-hook-form'
import { AnimatePresence } from 'framer-motion'
import React, { useRef } from 'react'
import { GetShippingAddressDocument } from './GetShippingAddress.gql'
import { ShippingAddressFormDocument } from './ShippingAddressForm.gql'

export type ShippingAddressFormProps = Pick<UseFormComposeOptions, 'step'>

export default function ShippingAddressForm(props: ShippingAddressFormProps) {
  const { step } = props
  const classes = useFormStyles()
  const ref = useRef<HTMLFormElement>(null)
  const { data: cartQuery } = useCartQuery(GetShippingAddressDocument)
  const { data: config } = useQuery(StoreConfigDocument)
  const { data: countriesData } = useQuery(CountryRegionsDocument)
  const { data: customerQuery } = useQuery(CustomerDocument, { fetchPolicy: 'cache-only' })

  const shopCountry = config?.storeConfig?.locale?.split('_')?.[1].toUpperCase()

  const currentAddress = cartQuery?.cart?.shipping_addresses?.[0]
  const currentCustomer = customerQuery?.customer
  const currentCountryCode = currentAddress?.country.code ?? shopCountry ?? 'NLD'

  const form = useFormGqlMutationCart(ShippingAddressFormDocument, {
    defaultValues: {
      // todo(paales): change to something more sustainable
      firstname: currentAddress?.firstname ?? currentCustomer?.firstname ?? undefined, // todo: allow for null values in defaultValues
      lastname: currentAddress?.lastname ?? currentCustomer?.lastname ?? undefined,
      telephone:
        currentAddress?.telephone !== '000 - 000 0000' ? currentAddress?.telephone : undefined,
      city: currentAddress?.city,
      company: currentAddress?.company,
      postcode: currentAddress?.postcode ?? '',
      street: currentAddress?.street?.[0] ?? undefined,
      houseNumber: currentAddress?.street?.[1] ?? undefined,
      addition: currentAddress?.street?.[2] ?? undefined,
      regionId: currentAddress?.region?.region_id,
      countryCode: currentCountryCode, // todo: replace by the default shipping country of the store + geoip,
      saveInAddressBook: true,
    },
    mode: 'onChange',
    onBeforeSubmit: (variables) => {
      const regionId = countriesData?.countries
        ?.find((country) => country?.two_letter_abbreviation === variables.countryCode)
        ?.available_regions?.find((region) => region?.id === variables.regionId)?.id

      return {
        ...variables,
        telephone: variables.telephone || '000 - 000 0000',
        regionId,
        customerNote: '',
      }
    },
  })
  const { muiRegister, handleSubmit, valid, formState, required, error } = form
  const submit = handleSubmit(() => {})

  useFormPersist({ form, name: 'ShippingAddressForm' })
  useFormCompose({ form, step, submit, key: 'ShippingAddressForm' })

  const autoSubmitting = useFormAutoSubmit({
    form,
    submit,
    fields: ['postcode', 'countryCode', 'regionId'],
  })
  const readOnly = formState.isSubmitting && !autoSubmitting

  return (
    <form onSubmit={submit} noValidate className={classes.form} ref={ref}>
      <AnimatePresence initial={false}>
        <NameFields form={form} key='name' readOnly={readOnly} />
        <AddressFields
          form={form}
          key='addressfields'
          countries={countriesData?.countries}
          readOnly={readOnly}
        />

        <div className={classes.formRow} key='telephone'>
          <TextField
            variant='outlined'
            type='text'
            error={!!formState.errors.telephone}
            required={required.telephone}
            label='Telephone'
            {...muiRegister('telephone', {
              required: required.telephone,
              pattern: { value: phonePattern, message: 'Invalid phone number' },
            })}
            helperText={formState.isSubmitted && formState.errors.telephone?.message}
            InputProps={{
              readOnly,
              endAdornment: <InputCheckmark show={valid.telephone} />,
            }}
          />
        </div>

        <ApolloErrorAlert error={error} />
      </AnimatePresence>
    </form>
  )
}