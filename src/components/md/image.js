import React from "react"
import { graphql } from "gatsby"
import Image from "../image"

function Img({ src, alt }) {
  console.log(src, gatsbyImageData)
  return <Image image={gatsbyImageData} alt={alt} />
}

export default Img

export const {
  placeholderImage: {
    childImageSharp: { gatsbyImageData },
  },
} = graphql`
  query($src: String!) {
    placeholderImage: file(relativePath: { eq: $src }) {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
`
