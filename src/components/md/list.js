import React from "react"
import { UnorderedList, OrderedList, List, ListItem } from "@chakra-ui/react"

export default function MDList(props) {
  return <List {...props} />
}

MDList.UnorderedList = props => <UnorderedList {...props} />
MDList.OrderedList = props => <OrderedList {...props} />
MDList.ListItem = props => <ListItem {...props} />
