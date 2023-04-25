import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';

// Notiflix.Notify.success('Sol lucet omnibus');

// Notiflix.Notify.failure('Qui timide rogat docet negare');

// Notiflix.Notify.warning('Memento te hominem esse');

// Notiflix.Notify.info('Cogito ergo sum');

const inputForm = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const contryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;
let serchCountryName = inputForm.textContent;
console.log(inputForm.textContent); //// del

inputForm.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  evt.preventDefault();
  console.log(evt); //// del
  serchCountryName = evt.target.value.trim();
  console.log(serchCountryName.trim()); //// del

  fetchCountries(serchCountryName)
    .then(data => (countryList.innerHTML = createMarcup(data)))
    .catch(error => console.log(error));
}

// fetchCountries(serchCountryName)
//   .then(data => console.log(data))
//   .catch(error => console.log(error));

// function fetchCountries(byName) {
//   console.log(byName); //// del
//   const URL = `${BASE_URL}${BASE_SEARCH_POINT}${byName}?${SERCH_PARAMS}`;
//   console.log(URL); //// del
//   return fetch(URL).then(response => {
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }

//     return response.json();
//   });
// }

function createMarcup(arr) {
  return arr
    .map(
      ({
        name: { common },
        flags: { svg, alt },
      }) => `<li class="country-list__item"><img class="country-list__img" src="${svg}" alt="${alt}">
<h5 class="country-list__text">${common}</h5>
</li>`
    )
    .join('');
}
