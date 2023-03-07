/* eslint-disable no-use-before-define */
// Require application dependencies
const axios = require('axios');

// Configure dotenv package

require('dotenv').config();

// Set up your OpenWeatherMap API_KEY
const apiKey = `${process.env.API_KEY}`;

const doRequest = (url) => new Promise((resolve, reject) => {
  // axios.post(url, (err, response, body) => {
  //   if (err) reject(err);
  //   const data = JSON.parse(body);
  //   resolve(data);
  // });
  axios.post(url).then(({ data }) => {
    resolve(data);
  })
    .catch((err) => {
      reject(err);
    });
});

const currentWeather = async (city) => {
  // Use that city name to fetch data
  // Use the API_KEY in the '.env' file
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&cnt=3&appid=${apiKey}`;
  // const url = `api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=${apiKey}`;

  // Request for data using the URL
  try {
    const weather = await funcs.doRequest(url);
    return weather;
  } catch (err) {
    throw new Error(err);
  }
};
const funcs = {
  currentWeather,
  doRequest,
};

module.exports = funcs;
