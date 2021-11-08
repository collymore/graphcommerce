import { ProductListItem, ProductListItemProps } from '@graphcommerce/magento-product'
import React from 'react'
import { ProductListItemSimpleFragment } from './ProductListItemSimple.graphql'

export type ProductListItemSimpleProps = ProductListItemSimpleFragment & ProductListItemProps

export default function ProductListItemSimple(props: ProductListItemSimpleProps) {
  return <ProductListItem {...props} />
}
