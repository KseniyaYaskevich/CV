import i18Obj from './translate.js';
import * as storage from './storage.js'

const ru = document.querySelector('#ru');
const en = document.querySelector('#en');

const getString = (lang, key) => {
  if (i18Obj[lang].hasOwnProperty(key)) {
    return i18Obj[lang][key];
  }
  return key;
}

const getTranslate = (lang) => {
  const dataElement = document.querySelector('[data-i18]');

  dataElement.innerHTML = getString(lang, dataElement.getAttribute('data-i18'));
}

const saveLangHandler = (evt) => {
  let lang = evt.target.id;
  storage.setItem('lang', lang);
  getTranslate(lang);
}

const getLocalStorage = () => {
  const lang = storage.getItem('lang');

  if (lang) {
    getTranslate(lang);

    if (lang === 'ru') {
      ru.checked = true;
    }
    if (lang === 'en') {
      en.checked = true;
    }
  } else {
    en.checked = true;
  }
}

ru.addEventListener('click', saveLangHandler);
en.addEventListener('click', saveLangHandler);

window.addEventListener('load', getLocalStorage);
