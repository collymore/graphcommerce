import { ApolloCache, NormalizedCacheObject } from '@apollo/client'
import type { QueryCartArgs, ShippingCartAddress, TypedTypePolicies } from '@graphcommerce/graphql'
import { CartPrices } from '@graphcommerce/graphql/generated/types'
import { CartFabDocument } from './components/CartFab/CartFab.graphql'
import { CurrentCartIdDocument } from './hooks/CurrentCartId.graphql'

export const cartTypePolicies: TypedTypePolicies = {
  CurrentCartId: { keyFields: [] },
  CartPrices: {
    merge: (exiting, incomming, { mergeObjects }) => mergeObjects(exiting, incomming),
  },
  Cart: {
    fields: {
      shipping_addresses: {
        merge: (
          existing: ShippingCartAddress[] | undefined,
          incoming: ShippingCartAddress[],
          options,
        ) => [options.mergeObjects(existing?.[0] ?? {}, incoming[0])],
      },
      prices: {
        merge: (existing: CartPrices[] | undefined, incoming: CartPrices[], options) =>
          options.mergeObjects(existing ?? {}, incoming),
      },
    },
  },

  Query: {
    fields: {
      currentCartId: (_, { toReference }) => toReference({ __typename: 'CurrentCartId' }),
      cart: (_, { args, toReference }) =>
        toReference({ __typename: 'Cart', id: (args as QueryCartArgs)?.cart_id }),
    },
  },
}

export const migrateCart = (
  oldCache: ApolloCache<NormalizedCacheObject>,
  newCache: ApolloCache<NormalizedCacheObject>,
) => {
  const currentCartId = oldCache.readQuery({ query: CurrentCartIdDocument })
  const cartId = currentCartId?.currentCartId?.id

  if (cartId) {
    newCache.writeQuery({ query: CurrentCartIdDocument, data: currentCartId, broadcast: true })

    // We have special handling for the CartFab because it tries to load data only from the cache.
    const cartFab = oldCache.readQuery({ query: CartFabDocument })
    newCache.writeQuery({
      query: CartFabDocument,
      data: cartFab,
      variables: { cartId },
      broadcast: true,
    })
  }
}
