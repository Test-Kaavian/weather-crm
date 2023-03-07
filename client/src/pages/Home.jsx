/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import CurrentWeather from '../Home/currentWeather';
import NextFivedaysWeatherReport from '../Home/nextFiveDaysReport';

function Weatherdisplay() {
  const [selectlocation, setSelectlocation] = useState('ohio');
  return (
    <div>
      <img className="img7" src="images/rain.svg" alt="rain" />
      <select className="listbox" name="location" onChange={(e) => { setSelectlocation(e.target.value); }}>
        <option>Select Location</option>
        <option>Ohio</option>
        <option>Atlanta</option>
        <option>washington</option>
        <option>Florida</option>
        <option>chicago</option>
      </select>
      <CurrentWeather selectlocation={selectlocation} />
      <NextFivedaysWeatherReport selectlocation={selectlocation} />
    </div>
  );
}

export default Weatherdisplay;
