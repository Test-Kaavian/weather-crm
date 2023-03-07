import React, { useEffect, useState } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import './Alerthistory.css';

export default function Search() {
  const [item, setItem] = useState([]);
  const [reason1, setReason1] = useState([]);
  const [location, setLocation] = useState([]);
  const [loc, setLoc] = useState('');
  const [reason, setReason] = useState('');
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_PREFIX}/api/alertdisplay`).then((res) => res.json()).then((data) => setItem(data));
    fetch(`${process.env.REACT_APP_SERVER_PREFIX}/api/location`).then((res) => res.json()).then((data) => setLocation(data));
    fetch(`${process.env.REACT_APP_SERVER_PREFIX}/api/Reason`).then((res) => res.json()).then((data) => setReason1(data));
  }, []);
  function refreshPage() {
    window.location.reload(false);
  }
  function onSearch() {
    if (loc !== 'Location') {
      fetch(`${process.env.REACT_APP_SERVER_PREFIX}/api/search`, {
        method: 'POST',
        body: JSON.stringify({ loc, reason }),
        headers: { 'content-type': 'application/json' },
      })
        .then((res) => res.json())
        .then((filtervalue) => {
          setItem(filtervalue.data);
        });
    }
  }
  return (
    <div>
      <select className="logdropdown" value={loc} onChange={(e) => setLoc(e.target.value)}>
        <option>Location</option>
        {location.map((customerloc) => <option>{customerloc}</option>)}
      </select>
      <select className="logdropdown1" value={reason} onChange={(e) => setReason(e.target.value)}>
        <option>Reason</option>
        {reason1.map((msgreason) => <option>{msgreason}</option>)}
      </select>
      <h4>
        <button type="button" className="logbutton" onClick={onSearch}><span>🔍</span></button>
      </h4>
      <button type="button" className="logrefresh" onClick={refreshPage}>
        <RefreshIcon />
      </button>
      <table className="logtable" border="5px" cellSpacing="5px">
        <thead>
          <tr>
            <th>Reason</th>
            <th>Location</th>
            <th>Customer Count</th>
          </tr>
        </thead>
        {item.map(({
          _id, Count,
        }) => (
          <tr>
            <td>{_id.Reason}</td>
            <td>{_id.Location}</td>
            <td>{Count}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
