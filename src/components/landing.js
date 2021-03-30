import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { HStack } from "@chakra-ui/react"
import {
  GitHubIcon,
  LinkedinIcon,
  DevtoIcon,
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
} from "../icons"
import IconLink from "./icon-link"
import { ColorEnums } from "../lib/style-utils"

const { BLACK } = ColorEnums

const Landing = ({ color, iconSize }) => {
  const {
    site: {
      siteMetadata: { username, twitter, facebook, instagram, linkedin },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        id
        siteMetadata {
          username
          twitter
          facebook
          instagram
          linkedin
        }
      }
    }
  `)
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
      {iconLinks.map(props => (
        <IconLink {...props} />
      ))}
    </HStack>
  )
}

Landing.propTypes ={
  color: PropTypes.oneOf(Object.values(ColorEnums)),
  iconSize: PropTypes.string,
}

Landing.defaultProps = {
  color: BLACK,
  iconSize: "2rem",
}

export default Landing
