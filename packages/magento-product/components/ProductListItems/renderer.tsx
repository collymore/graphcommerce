import { TypeRenderer } from '@graphcommerce/next-ui'
import { ProductListItemFragment } from '../../Api/ProductListItem.graphql'
import ProductListItem from '../ProductListItem'

export type ProductListItemRenderer = TypeRenderer<ProductListItemFragment>

const renderer: ProductListItemRenderer = {
  SimpleProduct: ProductListItem,
  ConfigurableProduct: ProductListItem,
  BundleProduct: ProductListItem,
  VirtualProduct: ProductListItem,
  DownloadableProduct: ProductListItem,
  GroupedProduct: ProductListItem,
}

export default renderer
