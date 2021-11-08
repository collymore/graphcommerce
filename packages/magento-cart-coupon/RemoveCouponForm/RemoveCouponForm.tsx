import { useFormGqlMutationCart, ApolloCartErrorAlert } from '@graphcommerce/magento-cart'
import { UseStyles, SvgImageSimple, iconCancelAlt, Button } from '@graphcommerce/next-ui'
import { lighten, IconButton, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { CouponFragment } from '../Api/Coupon.graphql'
import { RemoveCouponFormDocument } from './RemoveCouponForm.graphql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    inlineCoupon: {
      fontWeight: 600,
      background: lighten(theme.palette.secondary.light, theme.palette.action.hoverOpacity),
      '& svg': {
        stroke: 'transparent',
        fill: theme.palette.secondary.main,
      },
      // margin: `-1px 0 -2px`,
      // padding: `4px ${theme.spacings.xxs} 4px ${theme.spacings.xxs}`,
      // color: theme.palette.secondary.main,
      // borderRadius: 4,
      // ...theme.typography.body2,
      // fontWeight: 600,
      // display: 'flex',
      // alignItems: 'center',
      // '& .MuiIconButton-root': {
      //   width: 14,
      //   height: 14,
      //   marginLeft: 4,
      //   color: theme.palette.grey[400],
      //   '& .MuiSvgIcon-root': {
      //     padding: 2,
      //   },
      // },
    },
  }),
  { name: 'RemoveCouponForm' },
)

export type CartCouponProps = CouponFragment & UseStyles<typeof useStyles>

export default function RemoveCouponForm(props: CartCouponProps) {
  const { applied_coupons } = props
  const classes = useStyles(props)
  const form = useFormGqlMutationCart(RemoveCouponFormDocument)

  const { handleSubmit, error } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <form onSubmit={submitHandler} noValidate>
      <Button
        type='submit'
        variant='text'
        color='secondary'
        className={classes.inlineCoupon}
        endIcon={<SvgImageSimple src={iconCancelAlt} />}
      >
        {applied_coupons?.[0]?.code}
      </Button>
      <ApolloCartErrorAlert error={error} />
    </form>
  )
}
