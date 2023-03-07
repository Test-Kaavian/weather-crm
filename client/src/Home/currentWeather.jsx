/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import './Home.css';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import AirIcon from '@mui/icons-material/Air';
import { WiHumidity } from 'react-icons/wi';
import { GiSunset, GiSunrise } from 'react-icons/gi';
import axios from 'axios';

export default function CurrentWeather(location) {
  const { selectlocation } = location;
  const [iconurl, setIconurl] = useState({});
  const [mainweather, setMainWeather] = useState('');
  const [cityname, setCityName] = useState('');
  const [temp, setTemp] = useState('');
  const [humidity, setHumidity] = useState('');
  const [windspeed, setWindSpeed] = useState('');
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${selectlocation}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;

  useEffect(() => {
    axios.get(url).then((res) => {
      // setData(res.data);
      const { weather } = res.data;

      const [first] = weather;
      setMainWeather(first.main);
      setCityName(res.data.name);
      setTemp(res.data.main.temp);
      setHumidity(res.data.main.humidity);
      setWindSpeed(res.data.wind.speed);
      setSunrise(new Date(res.data.sys.sunrise * 1000).toLocaleTimeString('en-IN'));
      setSunset(new Date(res.data.sys.sunset * 1000).toLocaleTimeString('en-IN'));
      console.log(cityname, temp, humidity, windspeed, sunrise, sunset);
      setIconurl(`${process.env.REACT_APP_WEATHER_ICON_URL}${res.data.weather[0].icon}.png`);
    });
  }, [url]);
  // const iconurl= `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  return (

    <div className="current_weather">
      <div className="card">
        <h1 className="cityname">{cityname}</h1>
        <h2 className="mainweather">{mainweather}</h2>
        <h3 className="temp">
          <DeviceThermostatIcon className="tempicon" />
          {Math.floor(temp - 273.15)}
          &deg;C
        </h3>

        <span className="windspeed">
          <AirIcon />
          {windspeed}
          m/s WSW
        </span>
        <br />
        <span className="humidity">
          <WiHumidity className="humidicon" />
          Humidity:
          {humidity}
          %
        </span>
        <br />
        <span className="sunrisetime">
          <GiSunrise className="sunriseicon" />
          Sunrise Time:
          {sunrise}
        </span>
        <br />
        <span className="sunsettime">
          <GiSunset className="sunseticon" />
          Sunset:
          {sunset}
        </span>
        <br />
        <img className="weatherimg" src={iconurl} alt="weather" />
      </div>
    </div>
  );
}
