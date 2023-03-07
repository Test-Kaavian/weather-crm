/* eslint-disable no-use-before-define */
const getWeather = require('./weather');
const localstorage = require('./local-storage-methods');

const windSpeedValidate = (windSpeed) => {
  const windLevel = localstorage.getItemInLocalStorage('Speed');
  if (windSpeed >= windLevel) return true;
  return false;
};
const rainFallValidate = (humidity, temparature) => {
  const rainLevel = localstorage.getItemInLocalStorage('Rain');
  if (humidity > rainLevel || temparature > 20) return true;
  return false;
};
const snowFallValidate = (windSpeed, temparature) => {
  const tempLevel = localstorage.getItemInLocalStorage('Temp');
  if (windSpeed <= 7 || temparature <= tempLevel) return true;
  return false;
};
const weatherAlert = async (city) => {
  try {
    const weather = await getWeather.currentWeather(city);
    if (weatherValidate.windSpeedValidate(weather.wind.speed)) return 'wind_alert';
    if (weatherValidate.rainFallValidate(weather.main.humidity, weather.main.temp)) return 'rainfall_alert_msg';
    if (weatherValidate.snowFallValidate(weather.wind.speed, weather.main.temp)) return 'snowfall_alert';
    return 'safe level';
  } catch (err) {
    throw new Error(err);
  }
};
const weatherValidate = {
  windSpeedValidate,
  rainFallValidate,
  snowFallValidate,
  weatherAlert,
};

module.exports = weatherValidate;
