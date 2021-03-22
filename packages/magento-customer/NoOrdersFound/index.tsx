import { makeStyles, Theme } from '@material-ui/core'
import IconTitle from '@reachdigital/next-ui/IconTitle'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    noOrdersContainer: {
      marginTop: theme.spacings.sm,
    },
  }),
  { name: 'AccountLatestOrder' },
)

export default function NoOrdersFound() {
  const classes = useStyles()

  return (
    <div className={classes.noOrdersContainer}>
      <IconTitle
        iconSrc='/icons/desktop_checkout_box.svg'
        title='No orders found'
        alt='no order'
        size='small'
      />
    </div>
  )
}