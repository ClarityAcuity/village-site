import React, { useState, useRef } from "react"
import { throttle } from "lodash"
import { Box, Text, Input } from "@chakra-ui/react"
import { searchLocations } from "../../api"
import type { Location } from "../location-weather"

type LocationInputProps = {
  id?: string
  name: string
  location: string
  onChange: (data: Location) => void
}

function LocationInput({
  id = "location",
  name = "Location",
  location = "",
  onChange,
}: LocationInputProps) {
  const [value, setValue] = useState(location)
  const [locations, setLocations] = useState([])
  const getLocations = useRef(throttle(searchLocations, 1000))

  function _handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const nextValue = e.target.value
    setValue(nextValue)
    if (nextValue.length) {
      getLocations.current({ title: nextValue }, setLocations)
    }
  }

  function _renderLocations(locations: Location[]) {
    return locations.map((data: Location) => {
      const { title, woeid } = data
      return (
        <div key={woeid} onClick={() => onChange(data)}>
          {title}
        </div>
      )
    })
  }

  return (
    <Box height="240px" margin="24px" width="100%" maxWidth="1024px">
      <Text as="label">
        {name}: <em>{location}</em>
        <Box>
          <Input
            width="50%"
            type="search"
            id={id}
            name={name}
            onChange={_handleChange}
            value={value}
          />
          <Box width=" 100%" maxHeight="150px" overflowY="auto">
            {_renderLocations(locations)}
          </Box>
        </Box>
      </Text>
    </Box>
  )
}

export default LocationInput
