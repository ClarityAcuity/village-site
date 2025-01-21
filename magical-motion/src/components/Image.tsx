import { Box } from "@chakra-ui/react"

const Image = ({ image, alt, ...props }: { image: string; alt: string }) => {
  return <Box {...props}>{image && <img src={image} alt={alt} />}</Box>
}

export default Image
