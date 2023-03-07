const localStorageMethod = require('./local-storage-methods');

const setting = (time, rain, temp, speed) => {
  try {
    localStorageMethod.setItemInLocalStorage('Rain', rain);
    localStorageMethod.setItemInLocalStorage('Speed', speed);
    localStorageMethod.setItemInLocalStorage('Temp', temp);
    localStorageMethod.setItemInLocalStorage('Time', time);
    return true;
  } catch (err) {
    throw new Error('Incorrect Inputs..', err);
    // return 'false';
  }
};

module.exports = {
  setting,
};
