import { useEffect, React } from 'react';
import './Togglebtn.css';

function Toggle() {
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_PREFIX}/api/cron`).then((res) => res.json())
      .then(({ msg }) => console.log(msg))
      .catch((err) => console.log('corn fetch err', err));
  }, []);
  function Stopcron() {
    window.alert('Deactivated');
    fetch(`${process.env.REACT_APP_SERVER_PREFIX}/api/cronstop`).then((res) => res.json())
      .then(({ msg }) => console.log(msg))
      .catch((err) => console.log('corn fetch err', err));
  }
  return (
    <div className="container">
      <label htmlFor="togglebutton" className="switch">
        <input type="checkbox" onClick={Stopcron} />
        {' '}
        <div />
      </label>
    </div>
  );
}

export default Toggle;
