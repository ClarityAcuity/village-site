import React from "react"
import { Link } from "@chakra-ui/react"

const Landing = ({ href, icon }: { href: string; icon: React.ReactNode }) => {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      {icon}
    </Link>
  )
}

export default Landing
