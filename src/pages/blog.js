import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Box, Badge } from "@chakra-ui/react"
import Layout from "../components/layout"
import { TimeIcon, ViewIcon } from "@chakra-ui/icons"
import { SizeEnums, ColorEnums } from "../lib/style-utils"

function IndexPageQuery({ data }) {
  const query = useStaticQuery(graphql`
    query IndexPageQuery {
      allMdx(sort: { order: DESC, fields: frontmatter___date }) {
        nodes {
          id
          slug
          timeToRead
          excerpt
          frontmatter {
            title
            date
            author
          }
        }
      }
    }
  `)

  const {
    allMdx: { nodes },
  } = query

  const { SMALL, LARGE, EXTRALARGE , XXL} = SizeEnums

  const { GRAY } = ColorEnums

  function _renderPosts() {
    return nodes.map(
      ({
        id,
        slug,
        timeToRead,
        excerpt,
        frontmatter: { title, date, author },
      }) => {
        return (
          <Box
            key={id}
            maxW={XXL}
            borderWidth="1px"
            borderRadius={LARGE}
            overflow="hidden"
            margin="5"
          >
            <Box padding="4">
              <Box d="flex" alignItems="baseline">
                <Badge borderRadius="full" colorScheme="teal">
                  {author}
                </Badge>
              </Box>
              <Box as="h1" fontWeight="semibold" fontSize={EXTRALARGE}>
                <Link to={`/posts/${slug}`}>{title}</Link>
              </Box>
              <Box marginTop="1" as="p" fontSize={LARGE}>
                {excerpt}
              </Box>
              <Box
                display="flex"
                margintop="10"
                alignItems="center"
                position="relative"
              >
                <Box as="span" color={GRAY} fontSize={SMALL}>
                  <ViewIcon margin="2" />
                  {timeToRead} min read
                </Box>
                <Box
                  as="span"
                  color={GRAY}
                  fontSize="sm"
                  position="absolute"
                  right="0"
                >
                  <TimeIcon margin="2" />
                  {date}
                </Box>
              </Box>
            </Box>
          </Box>
        )
      }
    )
  }
  return <Layout>{_renderPosts()}</Layout>
}

export default IndexPageQuery
