import { Fab, makeStyles, Theme, Typography } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { responsiveVal } from '../..'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      alignContent: 'center',
      justifyItems: 'center',
    },
    fab: {
      border: `1px solid ${theme.palette.divider}`,
      height: 'auto',
      width: 'auto',
      marginBottom: theme.spacings.xxs,
      padding: 3,
      boxShadow: 'unset',
    },
    asset: {
      width: responsiveVal(60, 90),
      borderRadius: '99em',
      overflow: 'hidden',
      '& img': {
        display: 'block',
      },
    },
    storyTitle: {
      width: `calc(${responsiveVal(60, 90)} + 20px)`,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textTransform: 'uppercase',
      ...theme.typography.caption,
      fontWeight: theme.typography.fontWeightBold,
    },
    current: {
      border: `1px solid ${theme.palette.primary.main}`,
    },
  }),
  { name: 'StoryListItem' },
)

export type StoryItemProps = UseStyles<typeof useStyles> & {
  asset: React.ReactNode
  url: string
  title: string
  current: boolean
}

export default function StoryItem(props: StoryItemProps) {
  const { asset, title, url, current } = props
  const classes = useStyles(props)

  return (
    <div className={classes.root}>
      <Fab className={clsx(classes.fab, current && classes.current)} href={`/${url}`} size='large'>
        <div className={classes.asset}>{asset}</div>
      </Fab>
      <Typography component='h2' variant='caption' className={classes.storyTitle}>
        {title}
      </Typography>
    </div>
  )
}
