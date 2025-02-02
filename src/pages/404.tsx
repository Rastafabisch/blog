import React, { ReactElement } from 'react'
import { Link, PageProps } from 'gatsby'
import Page from '../components/templates/Page'
import * as styles from './404.module.css'
import HeadMeta, { HeadMetaProps } from '../components/atoms/HeadMeta'

const meta: Partial<HeadMetaProps> = {
  title: `I'm sorry Dave`,
  description: `I'm afraid I can't do that`
}

const NotFound = (): ReactElement => (
  <Page title={meta.title}>
    <div className={styles.hal9000} />

    <div className={styles.wrapper}>
      <h1 className={styles.title}>{meta.title}</h1>{' '}
      <p className={styles.text}>{meta.description}</p>
      <Link to={'/'}>Back to homepage</Link>
    </div>
  </Page>
)

export default NotFound

export function Head(props: PageProps) {
  return <HeadMeta {...meta} slug={props.location.pathname} />
}
