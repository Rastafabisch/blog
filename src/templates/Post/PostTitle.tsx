import React from 'react'
import { Link } from 'gatsby'
import { ReactComponent as Forward } from '../../images/forward.svg'
import styles from './PostTitle.module.scss'

export default function PostTitle({
  type,
  slug,
  linkurl,
  title
}: {
  type?: string
  slug?: string
  linkurl?: string
  title: string
}) {
  const linkHostname = linkurl ? new URL(linkurl).hostname : null

  return type === 'link' ? (
    <>
      <h1
        className={[styles.hentry__title, styles.hentry__title__link].join(' ')}
      >
        <a href={linkurl} title={`Go to source: ${linkurl}`}>
          {title} <Forward />
        </a>
      </h1>
      <div className={styles.linkurl}>{linkHostname}</div>
    </>
  ) : slug ? (
    <h1 className={styles.hentry__title}>
      <Link to={slug}>{title}</Link>
    </h1>
  ) : (
    <h1 className={styles.hentry__title}>{title}</h1>
  )
}