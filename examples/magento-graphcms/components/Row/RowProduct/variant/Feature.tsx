import RichText from '@graphcommerce/graphcms-ui/RichText'
import { Image } from '@graphcommerce/image'
import { ImageText } from '@graphcommerce/next-ui'
import { Typography, useTheme, withStyles, Theme } from '@material-ui/core'
import React from 'react'
import { RowProductFragment } from '../RowProduct.graphql'
import { ProductFeatureMediaFragment } from './ProductFeatureMedia.graphql'

type FeatureProps = RowProductFragment & ProductFeatureMediaFragment

const RichTextFeature = withStyles((theme: Theme) => ({
  h2: { ...theme.typography.h1 },
  paragraph: { ...theme.typography.subtitle1 },
}))(RichText)

export default function Feature(props: FeatureProps) {
  const { productCopy, title, media_gallery } = props
  const theme = useTheme()
  const item = media_gallery?.[2] ?? media_gallery?.[0]

  if (!item) return null

  return (
    <ImageText
      item={
        item.__typename === 'ProductImage' &&
        item.url && (
          <Image
            alt={item.label ?? ''}
            width={1532}
            height={1678}
            src={item.url}
            layout='fill'
            sizes={{
              0: '100vw',
              [theme.breakpoints.values.md]: '50vw',
            }}
          />
        )
      }
    >
      {title && (
        <Typography variant='overline' color='textSecondary'>
          {title}
        </Typography>
      )}
      {productCopy?.raw && <RichTextFeature {...productCopy} />}
    </ImageText>
  )
}
