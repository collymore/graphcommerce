import {
  PageShellHeader as PageShellHeaderBase,
  PageShellHeaderProps as PageShellHeaderPropsBase,
} from '@graphcommerce/next-ui'
import React from 'react'
import Logo from './Logo'

type FullPageShellHeaderProps = Omit<PageShellHeaderPropsBase, 'logo'>

export default function FullPageShellHeader(props: FullPageShellHeaderProps) {
  return <PageShellHeaderBase logo={<Logo alwaysShow />} fill='mobile-only' {...props} />
}