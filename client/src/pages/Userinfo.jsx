import { useEffect, useState, React } from 'react';

import './Userinfo.css';

function Userinfo() {
  const [cust, setCust] = useState([]);
  const [details, setDetails] = useState([]);
  const [custid, setCustid] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [number, setNumber] = useState('');
  // Insert Customer
  const insert = () => {
    if (!custid || !name || !address || !city || !number) {
      // eslint-disable-next-line no-alert
      window.alert('Enter Your all Details...');
      // eslint-disable-next-line no-undef
      setDisp('');
    } else {
      fetch(
        `${process.env.REACT_APP_SERVER_PREFIX}/api/insertCustomer`,
        {
          method: 'post',
          body: JSON.stringify(
            // eslint-disable-next-line no-undef
            {
              // eslint-disable-next-line no-undef
              custid, name, address, city, number,
            },
          ),
          headers: { 'content-type': 'application/json' },
        },
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            window.alert('Inserting Failed');
          } else {
            window.alert('Inserted Successfully');
          }
        });
    }
  };
  // Fetch the data in Database display UI
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_PREFIX}/api/customerId`).then((res) => res.json())
      .then(({ data }) => setCust(data));
  }, [cust]);
  // Search Customer Data
  const search = () => {
    fetch(`${process.env.REACT_APP_SERVER_PREFIX}/api/customerSearch`, {
      method: 'POST',
      body: JSON.stringify({ custid }),
      headers: { 'content-type': 'application/json' },
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setDetails(data);
        setName(data.Name); // prefill the text box with the already existing value from the db
        setAddress(data.Address);
        setCity(data.City);
        setNumber(data.Contact);
        // eslint-disable-next-line no-console
        console.log('Name', data.Name);
        // eslint-disable-next-line no-console
        console.log('Data1', data);
        // eslint-disable-next-line no-console
        console.log('details', details);
      });
  };
  // Update customer
  const updatecust = (e) => {
    if (!custid || !name || !address || !city || !number) {
      // eslint-disable-next-line no-alert
      window.alert('Search Your  Details...');
      // eslint-disable-next-line no-undef
      setDisp('');
    } else {
      e.preventDefault();
      fetch(`${process.env.REACT_APP_SERVER_PREFIX}/api/customerupdate`, {
        method: 'PUT',
        body: JSON.stringify({
          custid, name, address, city, number,
        }),
        headers: { 'content-type': 'application/json' },
        // eslint-disable-next-line no-console
      }).then((res) => res.json()).then(console.log(details));
      setCustid('');
      setName('');
      setAddress('');
      setCity('');
      setNumber('');
      // eslint-disable-next-line no-alert
      alert('Updated Successfully.');
    }
  };
  return (
    <body className="Wrapper">
      <form className="custform">
        <h3 className="header">Add & Update Customer</h3>
        <select className="customerdropdown" value={custid} onChange={(e) => setCustid(e.target.value)}>
          <option>CUSTOMER ID</option>
          {cust.map((el) => <option>{el}</option>)}
        </select>
        <button type="button" className="searchbtn" onClick={search}>🔍 </button>
        <br />
        <input className="customerinput" type="text" value={custid} placeholder="🔑Enter Customer ID*" onChange={(e) => setCustid(e.target.value)} />
        <br />
        <input className="customerinput" type="text" value={name} placeholder="👤Enter Customer Name*" onChange={(e) => setName(e.target.value)} />
        <br />
        <input className="customerinput" type="text" value={address} placeholder="🏠Enter Customer Address*" onChange={(e) => setAddress(e.target.value)} />
        <br />
        <input className="customerinput" type="text" value={city} placeholder="🗽Enter Customer City*" onChange={(e) => setCity(e.target.value)} />
        <br />
        <input className="customerinput" type="number" maxLength={10} value={number} placeholder="📞Enter Customer Number*" onChange={(e) => setNumber(e.target.value)} />
        <br />
        <div className="userinfobtns">
          <button type="button" className="addbtn" onClick={insert}> INSERT </button>
          <button type="button" className="editbtn" onClick={updatecust}> UPDATE </button>
        </div>
      </form>
    </body>
  );
}
export default Userinfo;
