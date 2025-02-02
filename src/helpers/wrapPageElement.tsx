import type { GatsbyBrowser, GatsbySSR } from 'gatsby'
import React, { ReactElement } from 'react'
import Layout from '../components/Layout'

const wrapPageElement:
  | GatsbyBrowser['wrapPageElement']
  | GatsbySSR['wrapPageElement'] = ({ element, props }): ReactElement => (
  <Layout {...props}>{element}</Layout>
)

export default wrapPageElement
