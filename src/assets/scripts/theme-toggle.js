import * as storage from './storage.js'

const storageKey = 'theme-preference';
const themeToggle = document.querySelector('#theme-toggle');

const onThemeToggleClick = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  setPreference();
};

const getColorPreference = () => {
  if (storage.getItem(storageKey)) {
    return storage.getItem(storageKey);
  } else {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
};

const setPreference = () => {
  storage.setItem(storageKey, theme.value);
  reflectPreference();
};

const reflectPreference = () => {
  document.firstElementChild.setAttribute('data-theme', theme.value);

  themeToggle.setAttribute('aria-label', theme.value)
};

const theme = {
  value: getColorPreference(),
};

reflectPreference();

window.onload = () => {
  reflectPreference();

  themeToggle.addEventListener('click', onThemeToggleClick);
};

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({
    matches: isDark
  }) => {
    theme.value = isDark ? 'dark' : 'light'
    setPreference();
  })
