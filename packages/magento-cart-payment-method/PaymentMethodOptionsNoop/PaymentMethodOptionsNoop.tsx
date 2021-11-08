import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { useFormCompose } from '@graphcommerce/react-hook-form'
import { PaymentOptionsProps } from '../Api/PaymentMethod'
import { PaymentMethodOptionsNoopDocument } from './PaymentMethodOptionsNoop.graphql'

/** It sets the selected payment method on the cart. */
function PaymentMethodOptionsNoop(props: PaymentOptionsProps) {
  const { code, step } = props

  /**
   * In the this folder you'll also find a PaymentMethodOptionsNoop.graphql document that is
   * imported here and used as the basis for the form below.
   */
  const form = useFormGqlMutationCart(PaymentMethodOptionsNoopDocument, { defaultValues: { code } })

  const { handleSubmit, register } = form
  const submit = handleSubmit(() => {})

  /** To use an external Pay button we register the current form to be handled there as well. */
  useFormCompose({ form, step, submit, key: `PaymentMethodOptions_${code}` })

  /** This is the form that the user can fill in. In this case we don't wat the user to fill in anything. */
  return (
    <form onSubmit={submit} style={{ visibility: 'hidden' }}>
      <input type='hidden' {...register('code')} />
    </form>
  )
}

export default PaymentMethodOptionsNoop
