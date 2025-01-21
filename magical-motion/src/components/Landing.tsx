import { HStack } from "@chakra-ui/react"
import {
  GitHubIcon,
  LinkedinIcon,
  DevtoIcon,
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
} from "../icons"
import IconLink from "./IconLink"
import { ColorEnums } from "../lib/style-utils"
import { siteMetadata } from "../data/siteMetadata"

const Landing = ({
  color = ColorEnums.BLACK,
  iconSize = "2rem",
}: {
  color: string
  iconSize?: string
}) => {
  const { username, twitter, facebook, instagram, linkedin } =
    siteMetadata.siteMetadata
  // const {
  //   site: {
  //     siteMetadata: { username, twitter, facebook, instagram, linkedin },
  //   },
  // } = useStaticQuery(graphql`
  //   query {
  //     site {
  //       id
  //       siteMetadata {
  //         username
  //         twitter
  //         facebook
  //         instagram
  //         linkedin
  //       }
  //     }
  //   }
  // `)
  const iconLinks = [
    {
      key: "github",
      href: `https://github.com/${username}`,
      icon: <GitHubIcon color={color} boxSize={iconSize} />,
    },
    {
      key: "linkedin",
      href: `https://www.linkedin.com/in/${linkedin}`,
      icon: <LinkedinIcon color={color} boxSize={iconSize} />,
    },
    {
      key: "devto",
      href: `https://dev.to/${username}`,
      icon: <DevtoIcon color={color} boxSize={iconSize} />,
    },
    {
      key: "twitter",
      href: `https://twitter.com/${twitter}`,
      icon: <TwitterIcon color={color} boxSize={iconSize} />,
    },
    {
      key: "facebook",
      href: `https://www.facebook.com/${facebook}`,
      icon: <FacebookIcon color={color} boxSize={iconSize} />,
    },
    {
      key: "instagram",
      href: `https://www.instagram.com/${instagram}`,
      icon: <InstagramIcon color={color} boxSize={iconSize} />,
    },
  ]

  return (
    <HStack margin="1rem 0">
      {iconLinks.map(({ key, ...props }) => (
        <IconLink key={key} {...props} />
      ))}
    </HStack>
  )
}

export default Landing
