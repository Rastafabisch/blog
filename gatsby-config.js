const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')
const meta = yaml.load(fs.readFileSync('./content/meta.yml', 'utf8'))
const { title, tagline, url, author } = meta

// required for gatsby-plugin-meta-redirect
require('regenerator-runtime/runtime')

module.exports = {
  siteMetadata: {
    title: `${title}`,
    description: `${tagline}`,
    siteUrl: `${url}`,
    author: `${author.name}`
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: path.join(__dirname, 'content', 'posts')
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'media',
        path: path.join(__dirname, 'content', 'media')
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: path.join(__dirname, 'content')
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src', 'images')
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: '<!-- more -->',
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 940,
              quality: 80,
              withWebp: true,
              linkImagesToOriginal: false,
              // sizeByPixelDensity: true,
              showCaptions: true,
              backgroundColor: '#e7eef4'
            }
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'media'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-smartypants',
          'gatsby-remark-autolink-headers'
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        includePaths: [`${__dirname}/node_modules`, `${__dirname}/src/styles`]
      }
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        icon: true
      }
    },
    {
      resolve: 'gatsby-plugin-lunr',
      options: {
        languages: [
          {
            // ISO 639-1 language codes. See https://lunrjs.com/guides/language_support.html for details
            name: 'en'
          }
        ],
        // Fields to index. If store === true value will be stored in index file.
        // Attributes for custom indexing logic. See https://lunrjs.com/docs/lunr.Builder.html for details
        fields: [
          { name: 'title', store: true, attributes: { boost: 20 } },
          { name: 'content' },
          { name: 'excerpt', attributes: { boost: 10 } },
          { name: 'category', store: true, attributes: { boost: 5 } },
          { name: 'tags', store: true },
          { name: 'url', store: true }
        ],
        // How to resolve each field's value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields' values
          MarkdownRemark: {
            title: node => node.frontmatter.title,
            content: node => node.rawMarkdownBody,
            excerpt: node => node.frontmatter.excerpt,
            category: node => node.frontmatter.category,
            tags: node => node.frontmatter.tags,
            url: node => node.fields.slug
          }
        }
      }
    },
    {
      resolve: 'gatsby-plugin-matomo',
      options: {
        siteId: '1',
        matomoUrl: 'https://analytics.kremalicious.com',
        siteUrl: `${url}`
      }
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
                author
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: feedContent(edge),
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  author: site.siteMetadata.author,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 20,
                  sort: { order: DESC, fields: [fields___date] }
                ) {
                  edges {
                    node {
                      html
                      fields { slug, date }
                      frontmatter {
                        title
                        image {
                          childImageSharp {
                            resize(width: 960, quality: 80) {
                              src
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            `,
            output: '/feed.xml'
          }
        ]
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-yaml',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-catch-links',
    'gatsby-redirect-from',
    'gatsby-plugin-meta-redirect'
  ]
}

const feedContent = edge => {
  const { image } = edge.node.frontmatter

  return image
    ? `<img src="${image.childImageSharp.resize.src}" /><br />${edge.node.html}`
    : edge.node.html
}
