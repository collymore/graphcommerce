import { Box, Link, SxProps, Theme, Typography } from '@mui/material'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { extendableComponent } from '../../Styles'
import { responsiveVal } from '../../Styles/responsiveVal'

export type BlogListItemProps = {
  asset: React.ReactNode
  url: string
  date: string
  /** @deprecated Not used anymore, locale is automatically resolved. */
  locale?: string
  title: string
  sx?: SxProps<Theme>
}

const name = 'BlogListItem' as const
const parts = ['item', 'date', 'asset', 'title'] as const
const { classes } = extendableComponent(name, parts)

export function BlogListItem(props: BlogListItemProps) {
  const { asset, url, date, title, sx = [] } = props
  const { locale } = useRouter()

  if (process.env.NODE_ENV !== 'production') {
    if (props.locale) {
      console.warn(`${name} component does not support locale prop.`)
    }
  }

  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Box
      className={classes.item}
      sx={[
        (theme) => ({
          display: 'grid',
          gridTemplateRows: `${responsiveVal(140, 220)} auto auto`,
          alignContent: 'start',
          color: theme.palette.text.primary,
          gap: theme.spacings.xxs,
          marginBottom: theme.spacings.sm,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <PageLink href={`/${url}`} passHref>
        <Link color='inherit' underline='hover'>
          <Box
            className={classes.asset}
            sx={(theme) => ({
              display: 'grid',
              overflow: 'hidden',
              height: '100%',
              width: '100%',
              borderRadius: responsiveVal(
                theme.shape.borderRadius * 2,
                theme.shape.borderRadius * 3,
              ),
              '& img': {
                height: '100% !important',
                objectFit: 'cover',
              },
              '& p': {
                alignSelf: 'center',
                justifySelf: 'center',
              },
              background: theme.palette.background.paper,
            })}
          >
            {asset}
          </Box>
        </Link>
      </PageLink>

      <Box
        component='time'
        className={classes.date}
        dateTime={date}
        sx={(theme) => ({
          display: 'inline-block',
          textDecoration: 'none',
          color: theme.palette.text.secondary,
        })}
      >
        {formatter.format(new Date(date))}
      </Box>

      <PageLink href={`/${url}`} passHref>
        <Link href={`/${url}`} className={classes.title} color='inherit' underline='hover'>
          <Typography component='h2' variant='h4'>
            {title}
          </Typography>
        </Link>
      </PageLink>
    </Box>
  )
}
