import { makeStyles, Theme, Typography, TypographyProps } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { responsiveVal } from '..'
import { UseStyles } from '../Styles'
import SvgImage, { SvgImageProps } from '../SvgImage'
import SvgImageSimple from '../SvgImage/SvgImageSimple'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      flexFlow: 'unset',
      [theme.breakpoints.up('md')]: {
        flexFlow: 'column',
      },
    },
    typography: {},
    small: {
      flexFlow: 'unset',
      '& svg': {
        width: responsiveVal(24, 28),
        height: responsiveVal(24, 28),
        strokeWidth: 1.4,
      },
    },
  }),
  {
    name: 'Title',
  },
)

export type TitleProps = {
  children: React.ReactNode
  icon?: SvgImageProps['src']
  size?: 'small' | 'medium'
  variant?: TypographyProps['variant']
  component?: React.ElementType
} & UseStyles<typeof useStyles>

const Title = React.forwardRef<HTMLDivElement, TitleProps>((props, ref) => {
  const { children, icon, size = 'medium', component, variant } = props
  const classes = useStyles(props)
  const small = size === 'small'

  return (
    <div className={clsx(classes.container, small && classes.small)}>
      {icon && <SvgImageSimple src={icon} size='xl' />}
      <Typography
        ref={ref}
        variant={variant || (small ? 'h6' : 'h3')}
        component={component ?? 'h1'}
        className={small ? undefined : classes.typography}
      >
        {children}
      </Typography>
    </div>
  )
})

export default Title