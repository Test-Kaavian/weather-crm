/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-return-assign */
/* eslint-disable no-useless-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-unresolved */
/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './nextFiveDaysReport.css';

export default function NextFivedaysWeatherReport(location) {
  const currentDate = new Date().toISOString().split('T')[0];
  const { selectlocation } = location;
  const [data, setData] = useState([]);
  const [date, setDate] = useState([]);
  const arr = [];
  const ar = [];
  let dis;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${selectlocation}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
  useEffect(() => {
    axios.get(url).then((res) => {
      const { list } = res.data;
      setData(list);
      data.map((el) => {
        const date1 = el.dt_txt;
        console.log(date);
        const dateString = date1.slice(0, 10);
        console.log(dateString);
        currentDate === dateString ? arr.push(el) : ar.push(el);
        return;
      });
      const result = [];
      const secondDate = ar.slice(0, 7);
      const thirdDate = ar.slice(8, 15);
      const fourthDate = ar.slice(16, 23);
      const fifthDate = ar.slice(24, 31);
      result.push(arr, secondDate, thirdDate, fourthDate, fifthDate);
      setDate(result);
      //  console.log(secondDate);
      //  console.log(thirdDate);
      // arr.map((item,idx)=>(

      // ))
      result.map((item) => console.log(item));

      //   console.log(data);
    });
  }, [url]);
  return (
    <div className="fivedays_weather">
      {date.map((item) => (
        <div className="full" id="entirediv">
          {item.map((ans, idx) => (
            <div className="cardtwo">
              <p {...idx === 0 ? dis = 'block' : dis = 'none'} style={{ display: dis }} id="date">{(ans.dt_txt).slice(0, 10)}</p>
              <p>{new Date(ans.dt * 1000).toLocaleTimeString('en-IN')}</p>
              <h6 className="weathertype">{ans.weather[0].main}</h6>
              <img className="weather5dayimg" src={`${process.env.REACT_APP_WEATHER_ICON_URL}${ans.weather[0].icon}.png`} alt="" />
              <span className="temp5days">
                {Math.floor(ans.main.temp - 273.15)}
                &deg;C
              </span>
            </div>
          ))}
          <br />
        </div>
      ))}
      <br />
    </div>
  );
}
