import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  CartAgreementsForm,
  CartSummary,
  CartTotals,
  EmptyCart,
  useCartQuery,
  useCurrentCartId,
} from '@graphcommerce/magento-cart'
import { CouponAccordion } from '@graphcommerce/magento-cart-coupon'
import {
  PaymentMethodButton,
  PaymentMethodContextProvider,
  PaymentMethodOptions,
  PaymentMethodPlaceOrder,
  PaymentMethodToggles,
  useCartLock,
} from '@graphcommerce/magento-cart-payment-method'
import { braintree, braintree_local_payment } from '@graphcommerce/magento-payment-braintree'
import { included_methods } from '@graphcommerce/magento-payment-included'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { mollie_methods } from '@graphcommerce/mollie-magento-payment'
import {
  AppShellTitle,
  FormDiv,
  FullPageMessage,
  GetStaticProps,
  iconChevronRight,
  iconId,
  PageShellHeader,
  Stepper,
  SvgImageSimple,
  Title,
} from '@graphcommerce/next-ui'
import { ComposedForm } from '@graphcommerce/react-hook-form'
import {
  CircularProgress,
  Container,
  Dialog,
  Divider,
  NoSsr,
  makeStyles,
  Theme,
} from '@material-ui/core'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import MinimalPageShell from '../../components/AppShell/MinimalPageShell'
import { SheetShellProps } from '../../components/AppShell/SheetShell'
import { DefaultPageDocument } from '../../components/GraphQL/DefaultPage.graphql'
import apolloClient from '../../lib/apolloClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props>

function PaymentPage() {
  const cartId = useCurrentCartId()
  const { locked } = useCartLock()

  const useStyles = makeStyles(
    (theme: Theme) => ({
      paymentButton: {
        marginBottom: theme.spacings.lg,
      },
    }),
    { name: 'Payment' },
  )

  const classes = useStyles()

  return (
    <ComposedForm>
      <PageMeta title='Payment' metaDescription='Payment' metaRobots={['noindex']} />
      <NoSsr>
        {!cartId && <EmptyCart />}
        {cartId && (
          <>
            <PageShellHeader
              primary={
                <PaymentMethodButton
                  type='submit'
                  color='secondary'
                  variant='pill-link'
                  display='inline'
                  size='small'
                  endIcon={<SvgImageSimple src={iconChevronRight} size='small' inverted />}
                >
                  Pay
                </PaymentMethodButton>
              }
              divider={
                <Container maxWidth='md'>
                  <Stepper steps={3} currentStep={3} />
                </Container>
              }
            >
              <Title size='small' icon={iconId}>
                Payment
              </Title>
            </PageShellHeader>
            <Container maxWidth='md'>
              <Dialog open={locked} fullWidth>
                <FullPageMessage
                  disableMargin
                  icon={<CircularProgress />}
                  title='Processing your payment'
                >
                  We're processing your payment, this will take a few seconds.
                </FullPageMessage>
              </Dialog>

              <>
                <AppShellTitle icon={iconId}>Payment</AppShellTitle>

                <PaymentMethodContextProvider
                  modules={{
                    braintree_local_payment,
                    braintree,
                    ...included_methods,
                    ...mollie_methods,
                  }}
                >
                  <AnimatePresence initial={false}>
                    <PaymentMethodToggles key='toggle' step={1} />

                    <PaymentMethodOptions
                      key='options'
                      step={2}
                      Container={({ children }) => (
                        <FormDiv contained background='secondary'>
                          {children}
                        </FormDiv>
                      )}
                    />

                    <CartSummary editable key='cart-summary'>
                      <Divider />
                      <CartTotals />
                    </CartSummary>

                    <CouponAccordion key='coupon' />

                    <CartAgreementsForm step={3} key='agreements' />

                    <PaymentMethodPlaceOrder key='placeorder' step={4} />

                    <div className={classes.paymentButton}>
                      <PaymentMethodButton
                        key='button'
                        type='submit'
                        color='secondary'
                        variant='pill'
                        size='large'
                        endIcon={<SvgImageSimple src={iconChevronRight} inverted />}
                      >
                        Place order
                      </PaymentMethodButton>
                    </div>
                  </AnimatePresence>
                </PaymentMethodContextProvider>
              </>
            </Container>
          </>
        )}
      </NoSsr>
    </ComposedForm>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  SharedComponent: MinimalPageShell,
  sharedKey: () => 'checkout',
}
PaymentPage.pageOptions = pageOptions

export default PaymentPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)

  const conf = client.query({ query: StoreConfigDocument })

  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: {
      url: `checkout/payment`,
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })

  return {
    props: {
      ...(await page).data,
      up: { href: '/checkout', title: 'Shipping' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
