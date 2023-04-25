import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = 'https://restcountries.com/v3.1';
const BASE_SEARCH_POINT = '/name/';
const SERCH_PARAMS = 'fields=name,capital,population,flags,languages';

function fetchCountries(byName) {
  const URL = `${BASE_URL}${BASE_SEARCH_POINT}${byName}?${SERCH_PARAMS}`;

  return fetch(URL).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  });
}

export { fetchCountries };
