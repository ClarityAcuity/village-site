import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { throttle } from "lodash";
import { searchLocations } from "../../api";
import "./style.css";

function LocationInput({ id, name, location, onChange }) {
  const [value, setValue] = useState(location);
  const [locations, setLocations] = useState([]);
  const getLocations = useRef(throttle(searchLocations, 1000));

  function _handleChange(e) {
    const nextValue = e.target.value;
    setValue(nextValue);
    if (nextValue.length) {
      getLocations.current({ title: nextValue }, setLocations);
    }
  }

  function _renderLocations(locations) {
    return locations.map((data) => {
      const { title, woeid } = data;
      return (
        <div key={woeid} onClick={() => onChange(data)}>
          {title}
        </div>
      );
    });
  }

  return (
    <div className="location-input">
      <label>
        {name}: <em>{location}</em>
        <div>
          <input
            className="search-input"
            type="search"
            id={id}
            name={name}
            onChange={_handleChange}
            value={value}
          />
          <div className="list">{_renderLocations(locations)}</div>
        </div>
      </label>
    </div>
  );
}

LocationInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  location: PropTypes.string,
  onChange: PropTypes.func,
};

LocationInput.defaultProps = {
  id: "location",
  name: "Location",
  location: "",
};

export default LocationInput;
