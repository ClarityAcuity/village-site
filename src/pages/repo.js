import React, { useState, useEffect, useCallback } from "react"
import { Box, Badge } from "@chakra-ui/react"
import { Link } from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import Layout from "../components/layout"
import { request } from "@octokit/request"
import { SizeEnums, ColorEnums } from "../lib/style-utils"
import { useStaticQuery, graphql } from "gatsby"

const { LARGE, EXTRALARGE, XXL } = SizeEnums
const { GRAY } = ColorEnums
const RepoPage = () => {
  const [repoData, setrepoData] = useState([])
  const data = useStaticQuery(graphql`
    query useStaticQuery {
      site {
        siteMetadata {
          username
        }
      }
    }
  `)
  const {
    site: {
      siteMetadata: { username },
    },
  } = data

  const _getProjectRequest = useCallback(
    async function() {
      return await request({
        method: "GET",
        url: `/users/${username}/repos`,
        username: `${username}`,
        sort: "updated",
      })
    },
    [username]
  )

  useEffect(() => {
    async function resRepo() {
      const result = await _getProjectRequest()
      setrepoData(result?.data)
    }
    resRepo()
  }, [_getProjectRequest])

  return (
    <Layout>
      <Box>
        {repoData.map(
          (
            { name, description, html_url, updated_at, owner: { login } },
            n
          ) => (
            <Box
              key={n}
              maxW={XXL}
              borderWidth="1px"
              borderRadius={LARGE}
              overflow="hidden"
              margin="5"
            >
              <Box padding="4">
                <Box d="flex" alignItems="baseline">
                  <Badge borderRadius="full" colorScheme="teal">
                    {login}
                  </Badge>
                </Box>
                <Box as="h1" fontWeight="semibold" fontSize={EXTRALARGE}>
                  <Link href={html_url} isExternal>
                    {name}
                    <ExternalLinkIcon mx="2px" />
                  </Link>
                </Box>
                <Box
                  margin="1.5rem 0"
                  marginTop="1"
                  as="p"
                  fontSize={LARGE}
                  isTruncated
                >
                  {description}
                </Box>
                <Box
                  display="flex"
                  margintop="10"
                  alignItems="center"
                  position="relative"
                >
                  <Box
                    as="span"
                    display="flex"
                    alignItems="center"
                    justifyItems="center"
                    color={GRAY}
                    fontSize="sm"
                    position="absolute"
                    right="0"
                  >
                    Latest Updated:{" "}
                    {updated_at.slice(0, 4) +
                      "-" +
                      updated_at.slice(5, 7) +
                      "-" +
                      updated_at.slice(8, 10)}
                  </Box>
                </Box>
              </Box>
            </Box>
          )
        )}
      </Box>
    </Layout>
  )
}

export default RepoPage
