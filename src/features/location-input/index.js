import React, { useState, useRef } from "react"
import PropTypes from "prop-types"
import { throttle } from "lodash"
import { Box, Text, Input } from "@chakra-ui/react"
import { searchLocations } from "../../api"

function LocationInput({ id, name, location, onChange }) {
  const [value, setValue] = useState(location)
  const [locations, setLocations] = useState([])
  const getLocations = useRef(throttle(searchLocations, 1000))

  function _handleChange(e) {
    const nextValue = e.target.value
    setValue(nextValue)
    if (nextValue.length) {
      getLocations.current({ title: nextValue }, setLocations)
    }
  }

  function _renderLocations(locations) {
    return locations.map((data) => {
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

LocationInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  location: PropTypes.string,
  onChange: PropTypes.func,
}

LocationInput.defaultProps = {
  id: "location",
  name: "Location",
  location: "",
}

export default LocationInput
