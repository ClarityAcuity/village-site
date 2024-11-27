import { useState, useEffect, useCallback } from "react"
import { Box, Badge, Link } from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { request } from "@octokit/request"
import { SizeEnums, ColorEnums } from "../lib/style-utils"
import { siteMetadata } from "../data/siteMetadata"
import type { OctokitResponse } from "@octokit/types"

type RepoData = {
  name: string
  description: string
  html_url: string
  updated_at: string
  owner: {
    login: string
  }
}

const { LARGE, EXTRALARGE, XXL } = SizeEnums
const { GRAY } = ColorEnums
const RepoPage = () => {
  const { username } = siteMetadata.siteMetadata
  const [repoData, setrepoData] = useState<RepoData[]>([])
  // const data = useStaticQuery(graphql`
  //   query useStaticQuery {
  //     site {
  //       siteMetadata {
  //         username
  //       }
  //     }
  //   }
  // `)
  // const {
  //   site: {
  //     siteMetadata: { username },
  //   },
  // } = data

  const _getProjectRequest = useCallback(
    async function (): Promise<OctokitResponse<RepoData[]>> {
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
    <>
      <Box>
        {repoData?.map(
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
                <Box display="flex" alignItems="baseline">
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
                  mt="10"
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
    </>
  )
}

export default RepoPage
