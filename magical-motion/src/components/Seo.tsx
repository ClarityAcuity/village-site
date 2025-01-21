/**
 * SEOComponent component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import Helmet from "react-helmet"
import { siteMetadata as data } from "../data/siteMetadata"


function SEOComponent({
  description = '', lang = 'en', meta = [], title, keywords = [], image, pathname } : {
    description?: string
    lang?: string
    meta?: any
    title: string
    keywords?: string[]
    image?: any
    pathname?: string
  }
) {
  const { siteMetadata } = data
  // const {
  //   site: { siteMetadata },
  // } = {
  //   site: {
  //     siteMetadata: {
  //       title: `title`,
  //       description: `description`,
  //       author: `author`,
  //       username: `username`,
  //       url: `url`,
  //       twitter: `twitter`,
  //       keywords: `keywords`,
  //     },
  //   },
  // }
  // useStaticQuery(
  //   graphql`
  //     query {
  //       site {
  //         siteMetadata {
  //           title
  //           description
  //           author
  //           username
  //           url
  //           twitter
  //           keywords
  //         }
  //       }
  //     }
  //   `
  // )
  const metaDescription = description || siteMetadata.description
  const metaImage = image || null
  const canonical = pathname
    ? `${siteMetadata.url}/blog/${pathname}`
    : siteMetadata.url

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      link={
        canonical
          ? [
              {
                rel: "canonical",
                href: canonical,
              },
            ]
          : []
      }
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:creator`,
          content: siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : {
                name: "keywords",
                content: siteMetadata.keywords.join(","),
              }
        )
        .concat(
          metaImage
            ? [
                {
                  property: "og:image",
                  content: metaImage,
                },
                {
                  property: "og:image:width",
                  content: metaImage.width,
                },
                {
                  property: "og:image:height",
                  content: metaImage.height,
                },
                {
                  name: "twitter:card",
                  content: "summary_large_image",
                },
              ]
            : [
                {
                  name: "twitter:card",
                  content: "summary",
                },
              ]
        )
        .concat(meta)}
    />
  )
}

export default SEOComponent
