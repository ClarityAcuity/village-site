import React from "react"
import { Box, Table, Thead, Tbody, Tfoot, Tr, Th, Td } from "@chakra-ui/react"
import { ColorSchemeEnums } from "../../lib/style-utils"

const { GRAY } = ColorSchemeEnums

export default function MDTable({ children }) {
  return (
    <Box
      margin="1rem"
      boxShadow="outline"
      overflow="auto"
    >
      <Table variant="striped" colorScheme={GRAY}>
        {children}
      </Table>
    </Box>
  )
}

MDTable.Thead = props => <Thead {...props} />
MDTable.Tbody = props => <Tbody {...props} />
MDTable.Tfoot = props => <Tfoot {...props} />
MDTable.Tr = props => <Tr {...props} />
MDTable.Th = props => <Th {...props} />
MDTable.Td = props => <Td {...props} />
