import React, { useState } from "react"
import { Heading as ChakraHead, Link } from "@chakra-ui/react"
import { css } from "@emotion/react"
import { OctIcon } from "../../icons/oct"

function getId(node) {
  let id = node
  while (id?.props) {
    id = id.props.children
  }
  return id
}

const Heading = ({ as, size, margin, children, isCenter, ...props }) => {
  const [isHover, setIsHover] = useState(false)
  const visibility = isHover ? "visible" : "hidden"
  const id = getId(children)

  return (
    <ChakraHead
      id={id}
      css={css`
        .anchor {
          padding-left: 4px;
          line-height: 1;
        }
        .octicon-link {
          color: #1b1f23;
          vertical-align: middle;
          visibility: ${visibility};
        }
      `}
      as={as}
      size={size}
      display="flex"
      justifyContent={isCenter ? "center" : "flex-start"}
      alignItems="center"
      margin={margin}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      {...props}
    >
      {children}
      <Link id={`user-content-${id}`} className="anchor" href={`#${id}`}>
        <OctIcon />
      </Link>
    </ChakraHead>
  )
}

export default Heading
