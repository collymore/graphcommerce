import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useQuery } from '@graphcommerce/graphql'
import {
  ApolloCustomerErrorFullPage,
  CustomerDocument,
  UpdateCustomerEmailForm,
} from '@graphcommerce/magento-customer'
import { PageMeta } from '@graphcommerce/magento-store'
import {
  GetStaticProps,
  iconEmailOutline,
  SectionContainer,
  LayoutOverlayHeader,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Container, NoSsr } from '@mui/material'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountContactPage() {
  const { loading, data, error } = useQuery(CustomerDocument, {
    ssr: false,
  })
  const customer = data?.customer

  if (loading) return <div />
  if (error)
    return (
      <ApolloCustomerErrorFullPage
        error={error}
        signInHref='/account/signin'
        signUpHref='/account/signin'
      />
    )

  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconEmailOutline}>
          <Trans>Contact</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>
      <NoSsr>
        <Container maxWidth='md'>
          <PageMeta
            title={t`Contact`}
            metaDescription={t`Contact information`}
            metaRobots={['noindex']}
          />

          <LayoutTitle icon={iconEmailOutline}>
            <Trans>Contact</Trans>
          </LayoutTitle>

          <SectionContainer labelLeft='Email'>
            {customer && <UpdateCustomerEmailForm email={customer.email ?? ''} />}
          </SectionContainer>
        </Container>
      </NoSsr>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account',
  Layout: LayoutOverlay,
}
AccountContactPage.pageOptions = pageOptions

export default AccountContactPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => ({
  props: {
    variantMd: 'bottom',
    size: 'max',
    up: { href: '/account', title: 'Account' },
  },
})
