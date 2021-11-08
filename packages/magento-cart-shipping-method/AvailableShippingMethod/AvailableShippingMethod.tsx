import { Money } from '@graphcommerce/magento-store'
import { UseStyles, ToggleButton, ToggleButtonProps } from '@graphcommerce/next-ui'
import { FormHelperText, makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { SetOptional } from 'type-fest'
import { AvailableShippingMethodFragment } from './AvailableShippingMethod.graphql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      textAlign: 'left',
      justifyContent: 'space-between',
      alignItems: 'normal',
    },
    label: {
      ...theme.typography.body2,
      [theme.breakpoints.up('sm')]: {
        ...theme.typography.body1,
      },
      display: 'grid',
      gridTemplate: `
        "title      amount"
        "additional additional"
        "error      error"
      `,
      gridTemplateColumns: 'auto min-content',
      columnGap: theme.spacings.xxs,
    },
    methodTitle: {
      ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightBold,
      [theme.breakpoints.up('sm')]: {
        ...theme.typography.body1,
        fontWeight: theme.typography.fontWeightBold,
      },
      gridArea: 'title',
    },
    methodAdditional: {
      ...theme.typography.body2,
      [theme.breakpoints.up('sm')]: {
        ...theme.typography.body1,
      },
      gridArea: 'additional',
    },
    errorMessage: {
      gridArea: 'error',
    },
    amountLabel: {
      gridArea: 'amount',
      fontWeight: theme.typography.fontWeightBold,
    },
    amountLabelFree: {
      color: theme.palette.success.main,
    },
  }),
  { name: 'ShippingMethodToggleButton' },
)

export type AvailableShippingMethodProps = SetOptional<AvailableShippingMethodFragment, 'amount'> &
  Omit<ToggleButtonProps, 'size'> &
  UseStyles<typeof useStyles>

const AvailableShippingMethod = React.forwardRef<any, AvailableShippingMethodProps>(
  (props, ref) => {
    const {
      amount,
      available,
      disabled,
      carrier_code,
      carrier_title,
      error_message,
      method_code,
      method_title,
      children,
      ...toggleProps
    } = props
    const {
      amountLabel,
      amountLabelFree,
      methodTitle,
      methodAdditional,
      errorMessage,
      ...classes
    } = useStyles(props)

    return (
      <ToggleButton
        {...toggleProps}
        classes={classes}
        ref={ref}
        disabled={!available}
        size='large'
        color='secondary'
      >
        <div className={methodTitle}>
          {carrier_title} {method_title}
        </div>

        {amount?.value === 0 ? (
          <div className={clsx(amountLabel, amountLabelFree)}>Free</div>
        ) : (
          <div className={amountLabel}>
            <Money {...amount} />
          </div>
        )}

        {error_message ? (
          <FormHelperText className={errorMessage} disabled>
            {error_message}
          </FormHelperText>
        ) : (
          children && <div className={methodAdditional}>{children}</div>
        )}
      </ToggleButton>
    )
  },
)

export default AvailableShippingMethod
