import React from "react"
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from "@chakra-ui/react"
import { ColorEnums, ColorSchemeEnums } from "../../lib/style-utils"

const { GRAY: grayColor } = ColorEnums
const { GRAY } = ColorSchemeEnums

export default function MDTable({ children }) {
  return (
    <Table
      variant="striped"
      overflow="auto"
      margin="1rem"
      borderTop="1px"
      borderStyle="solid"
      boederColor={grayColor}
      colorScheme={GRAY}
    >
      {children}
    </Table>
  )
}

MDTable.Thead = props => <Thead {...props} />
MDTable.Tbody = props => <Tbody {...props} />
MDTable.Tfoot = props => <Tfoot {...props} />
MDTable.Tr = props => <Tr {...props} />
MDTable.Th = props => <Th {...props} />
MDTable.Td = props => <Td {...props} />
