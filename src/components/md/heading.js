import React, { useState } from "react"
import { Heading, Link } from "@chakra-ui/react"
import { css } from "@emotion/react"
import { OctIcon } from "../../icons/oct"

function getId(node) {
  let id = node
  while (id?.props) {
    id = id.props.children
  }
  return id
}

export default ({ as, size, children, ...props }) => {
  const [isHover, setIsHover] = useState(false)
  const visibility = isHover ? "visible" : "hidden"
  const id = getId(children)

  return (
    <Heading
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
      justifyContent="flex-start"
      alignItems="center"
      margin="1.5rem 0"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      {...props}
    >
      {children}
      <Link id={`user-content-${id}`} className="anchor" href={`#${id}`}>
        <OctIcon />
      </Link>
    </Heading>
  )
}
