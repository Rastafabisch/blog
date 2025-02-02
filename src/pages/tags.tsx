import React, { ReactElement } from 'react'
import { graphql, PageProps } from 'gatsby'
import Page from '../components/templates/Page'
import Tag from '../components/atoms/Tag'
import * as styles from './tags.module.css'
import HeadMeta, { HeadMetaProps } from '../components/atoms/HeadMeta'

const meta: Partial<HeadMetaProps> = {
  title: 'Tags',
  description: 'All the tags being used.'
}

const TagsPage = ({ data }: PageProps<Queries.TagsPageQuery>): ReactElement => (
  <Page title={meta.title}>
    <ul className={styles.tags}>
      {Array.from(data.allMarkdownRemark.group)
        .sort((a, b) => b.totalCount - a.totalCount)
        .map((tag) => (
          <li key={tag.fieldValue}>
            <Tag
              name={tag.fieldValue || ''}
              url={`/archive/${tag.fieldValue}/`}
              count={tag.totalCount}
              style={{ fontSize: `${100 + tag.totalCount * 2}%` }}
            />
          </li>
        ))}
    </ul>
  </Page>
)

export default TagsPage

export function Head(props: PageProps) {
  return <HeadMeta {...meta} slug={props.location.pathname} />
}

export const tagsPageQuery = graphql`
  query TagsPage {
    allMarkdownRemark {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`
