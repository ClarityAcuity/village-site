import React from "react"
import { type CollectionEntry } from "astro:content"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { Flex, Text, Link } from "@chakra-ui/react"

type Props = CollectionEntry<"blog">

export default function PostsLayout(props: Props) {
  return (
    <>
      <Link href="/blog">
        <Flex alignItems="center">
          <ArrowBackIcon boxSize="1.5rem" />
          <Text fontSize="1.5rem">Back to posts</Text>
        </Flex>
      </Link>
    </>
  )
}
