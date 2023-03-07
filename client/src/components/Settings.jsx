/* eslint-disable import/no-unresolved */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line import/no-unresolved
import React, { useEffect, useState } from 'react';
import './settings.css';

// eslint-disable-next-line import/no-extraneous-dependencies
function Settings() {
  const [rain, setRain] = useState('');
  const [speed, setSpeed] = useState('');
  const [temp, setTemp] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState('');

  function Submitform(e) {
    e.preventDefault();
    // eslint-disable-next-line object-curly-newline
    fetch(`${process.env.REACT_APP_SERVER_PREFIX}/api/setting`, { method: 'post', body: JSON.stringify({ rain, speed, temp, time }), headers: { 'Content-type': 'application/json' } })
      .then((res) => res.json())
      .then(({ message }) => {
        if (message) window.location.reload();
      });
  }

  return (
    <body className="head">
      <form className="daeh">
        <h3 className="settingtitle">Settings</h3>
        <label className="font" htmlFor="rainfall">Rainfall (In) m/s</label>
        <input className="setting" type="number" placeholder="🌧️ Rain" name="rainfall" onChange={(e) => setRain(e.target.value)} />
        <br />
        <label className="font" htmlFor="wind">speed (kmph) </label>
        <input className="setting" type="number" placeholder="💨 Windspeed" name="wind" onChange={(e) => setTemp(e.target.value)} />
        <br />
        <label className="font" htmlFor="snow">temperature (c) </label>
        <input className="setting" type="number" placeholder="🌡️ Temperature" name="temperature" max="0" onChange={(e) => setSpeed(e.target.value)} />
        <br />
        <label className="font" htmlFor="time">Time (Hrs) </label>
        <input className="setting" type="text" placeholder="⌛ Time" name="durationtime" onChange={(e) => setTime(e.target.value)} />
        <br />
        <button className="setbtn" type="submit" onClick={Submitform}>SUBMIT</button>
      </form>
    </body>
  );
}

export default Settings;
