import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { ResolveUrlDocument } from 'generated/apollo'
import { PromiseValue } from 'type-fest'

export default async function getUrlResolveProps(
  variables: GQLResolveUrlQueryVariables,
  client: ApolloClient<NormalizedCacheObject>,
) {
  const { data } = await client.query<GQLResolveUrlQuery, GQLResolveUrlQueryVariables>({
    query: ResolveUrlDocument,
    variables,
  })

  if (!data?.urlResolver?.id) throw Error('Page not found')
  return data
}

export type GetUrlResolveProps = PromiseValue<ReturnType<typeof getUrlResolveProps>>