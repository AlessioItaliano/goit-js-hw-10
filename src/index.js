import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';

const inputForm = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

inputForm.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  evt.preventDefault();
  const serchCountryName = evt.target.value.trim();

  fetchCountries(serchCountryName)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if ((data.length >= 2) & (data.length <= 10)) {
        resetMarkup(countryList);
        countryList.innerHTML = createMarkupList(data);
        resetMarkup(countryInfo);
      } else {
        resetMarkup(countryInfo);
        countryInfo.innerHTML = createMarkupInfo(data);
        resetMarkup(countryList);
      }
    })

    .catch(() => {
      resetMarkup(countryList);
      resetMarkup(countryInfo);
      Notify.failure('Oops, there is no country with that name');
    });
}

function createMarkupList(arr) {
  return arr
    .map(
      ({
        flags: { svg, alt },
        name: { common },
      }) => `<li class="country-list__item"><img class="country-list__img" src="${svg}" alt="${alt}">
<h5 class="country-list__text">${common}</h5>
</li>`
    )
    .join('');
}

function createMarkupInfo(arr) {
  return arr
    .map(
      ({
        flags: { svg, alt },
        name: { official },
        capital,
        languages,
        population,
      }) =>
        `<div class="country-info__main" >
    <img class="country-info__flag" src="${svg}" alt="${alt}">
<h2 class="country-info__name">${official}</h2>
          </div>
          <ul class="country-info__openInfo">
          <li class="country-info__item">
            <span class="country-info__title">Capital:
</span>${capital}</li>
          <li class="country-info__item">
            <span class="country-info__title">Langueges:
</span> ${Object.values(languages).join(', ')}</li>
          <li class="country-info__item">
            <span class="country-info__title">Population:
</span> ${population}</li>
          </ul>`
    )
    .join('');
}

function resetMarkup(e) {
  e.innerHTML = '';
}
