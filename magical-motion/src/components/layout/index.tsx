/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { Box, Flex } from "@chakra-ui/react"
import Header from "../header"
import Footer from "../footer"
import SEOComponent from "../Seo"
import { siteMetadata } from "../../data/siteMetadata"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { title, description, username, keywords } = siteMetadata.siteMetadata
  // const {
  //   site: {
  //     siteMetadata: { title, description, username, keywords },
  //   },
  // } = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //         description
  //         username
  //         keywords
  //       }
  //     }
  //   }
  // `)

  return (
    <>
      <SEOComponent
        title={title}
        description={description}
        keywords={keywords}
      />
      <Flex height="calc(100vh - 100px - 10.5em)" flexDirection="column">
        {/* <Header siteTitle={title} /> */}
        <Box flexGrow="1" padding="1.45rem 1.0875rem 1.45rem" overflow="auto">
          <Box margin="0 auto" maxWidth="960px">
            {children}
          </Box>
        </Box>
        {/* <Footer username={username} /> */}
      </Flex>
    </>
  )
}

export default Layout
