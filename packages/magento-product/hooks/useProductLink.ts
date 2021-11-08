import { ProductLinkFragment } from './ProductLink.graphql'

type ProductLinkProps = Omit<ProductLinkFragment, 'uid'>

export function productLink(link: ProductLinkProps) {
  const { __typename, url_key } = link
  const productRoute = __typename
    .split(/(?=[A-Z])/)
    .map((s) => s.toLowerCase())
    .reverse()

  // For Simple and Virtual products we're not navigating to a type specific page
  if (__typename === 'SimpleProduct') productRoute.splice(1, 1)

  return `/${productRoute.join('/')}/${url_key}`
}

export function useProductLink(props: ProductLinkProps) {
  return productLink(props)
}
