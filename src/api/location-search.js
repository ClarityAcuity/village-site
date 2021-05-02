import { BASE_URL } from "./utils";

export function searchLocations(query, setter) {
  const { title, latt, long } = query;
  const url = title
    ? `${BASE_URL}/search/?query=${title}`
    : `${BASE_URL}/search/?lattlong=(${latt}),(${long})`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => setter(data));
}
