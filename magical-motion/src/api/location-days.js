import { BASE_URL } from "./utils";

export function locationDays(query, setter) {
  const { location } = query;
    fetch(`${BASE_URL}/${location}/`)
      .then((response) => response.json())
      .then((data) => setter(data));
  }
  