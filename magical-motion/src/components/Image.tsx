// import { GatsbyImage } from "gatsby-plugin-image"
import { Box } from "@chakra-ui/react"

/*
 * This component is built using `gatsby-plugin-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-plugin-image`: https://gatsby.dev/gatsby-plugin-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const Image = ({ image, alt, ...props }: { image: string; alt: string }) => {
  return (
    <Box {...props}>{image && <img src={image} alt={alt} />}</Box>
  )
}

export default Image
