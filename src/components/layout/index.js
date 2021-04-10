/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Box, Flex } from "@chakra-ui/react"
import Header from "../header"
import Footer from "../footer"
import SEOComponent from "../seo"

const Layout = ({ children }) => {
  const {
    site: {
      siteMetadata: { title, description, username, keywords },
    },
  } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          username
          keywords
        }
      }
    }
  `)

  return (
    <>
      <SEOComponent
        title={title}
        description={description}
        keywords={keywords}
      />
      <Flex height="100vh" flexDirection="column">
        <Header siteTitle={title} />
        <Box
          as="main"
          flexGrow="1"
          padding="1.45rem 1.0875rem 1.45rem"
          overflow="auto"
        >
          <Box margin="0 auto" maxWidth="960px">
            {children}
          </Box>
        </Box>
        <Footer username={username} />
      </Flex>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
