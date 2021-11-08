import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticPathsResult } from 'next'
import {
  GetCategoryStaticPathsDocument,
  GetCategoryStaticPathsQuery,
} from './GetCategoryStaticPaths.graphql'

type StaticPathsResult = GetStaticPathsResult<{ url: string[] }>

const getCategoryStaticPaths = async (
  client: ApolloClient<NormalizedCacheObject>,
  locale: string,
) => {
  const rootCategory =
    (await client.query({ query: StoreConfigDocument })).data.storeConfig?.root_category_uid ?? ''

  const { data } = await client.query({
    query: GetCategoryStaticPathsDocument,
    variables: { rootCategory },
  })

  const paths: StaticPathsResult['paths'] = []

  type Category = NonNullable<NonNullable<GetCategoryStaticPathsQuery['categories']>['items']>[0]
  const add = (cat: Category) => {
    if (cat?.url_path) paths.push({ params: { url: cat.url_path.split('/') }, locale })
    if (cat?.children) cat.children.forEach(add)
  }
  data.categories?.items?.forEach(add)

  return process.env.VERCEL_ENV !== 'production' ? paths.slice(0, 1) : paths
}

export { getCategoryStaticPaths }
