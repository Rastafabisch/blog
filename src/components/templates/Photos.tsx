import React, { ReactElement } from 'react'
import { graphql, Link, PageProps } from 'gatsby'
import { PageContext } from '../../@types/Post'
import { Image } from '../atoms/Image'
import Pagination from '../molecules/Pagination'
import Page from './Page'
import * as styles from './Photos.module.css'

export const PhotoThumb = ({
  photo
}: {
  photo: Queries.PhotosTemplateQuery['allMarkdownRemark']['edges'][0]['node']
}): ReactElement => {
  const { title, image } = photo.frontmatter
  const { slug } = photo.fields
  const { gatsbyImageData } = (image as any).childImageSharp

  return (
    <article className={styles.photo}>
      {image && (
        <Link to={slug}>
          <Image title={title} image={gatsbyImageData} alt={title} />
        </Link>
      )}
    </article>
  )
}

interface PhotosPageProps extends PageProps {
  data: Queries.PhotosTemplateQuery
  pageContext: PageContext
}

function getMetadata(currentPageNumber: number, numPages: number) {
  const paginationTitle =
    numPages > 1 && currentPageNumber > 1
      ? `Page ${currentPageNumber} / ${numPages}`
      : ''

  return {
    frontmatter: {
      title: `Photos ${paginationTitle}`,
      description:
        'Personal photos of designer & developer Matthias Kretschmann.'
    }
  }
}

export default function Photos(props: PhotosPageProps): ReactElement {
  const photos = props.data.allMarkdownRemark.edges
  const { currentPageNumber, numPages } = props.pageContext
  const page = getMetadata(currentPageNumber, numPages)

  return (
    <Page
      title={page.frontmatter.title}
      post={page}
      pathname={props.location.pathname}
    >
      <section className={styles.photos}>
        {photos.map(({ node }) => (
          <PhotoThumb key={node.id} photo={node} />
        ))}
      </section>

      {numPages > 1 && <Pagination pageContext={props.pageContext} />}
    </Page>
  )
}

export const photosQuery = graphql`
  query PhotosTemplate($skip: Int, $limit: Int) {
    allMarkdownRemark(
      filter: { fields: { type: { eq: "photo" } } }
      sort: { fields: { date: DESC } }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            image {
              childImageSharp {
                ...PhotoFluidThumb
              }
            }
          }
          fields {
            slug
            type
          }
        }
      }
    }
  }
`
