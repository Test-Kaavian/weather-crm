const { LocalStorage } = require('node-localstorage');

const localstorage = LocalStorage('./scratch');

const setItemInLocalStorage = (key, value) => {
  try {
    localstorage.setItem(key, value);
    return true;
  } catch (err) {
    throw new Error(err);
  }
};
const getItemInLocalStorage = (key) => {
  try {
    const value = localstorage.getItem(key);
    return value;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  setItemInLocalStorage,
  getItemInLocalStorage,
};
