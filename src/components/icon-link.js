import React from "react"
import PropTypes from "prop-types"
import { Link } from "@chakra-ui/react"

const Landing = ({ href, icon }) => {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      {icon}
    </Link>
  )
}

Landing.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
}

export default Landing
