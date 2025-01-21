import { BASE_URL } from "./utils";

export function locationDate(query, setter) {
  const { location, date } = query;
  fetch(`${BASE_URL}${location}/${date}/`)
    .then((response) => response.json())
    .then((data) => setter(data));
}
