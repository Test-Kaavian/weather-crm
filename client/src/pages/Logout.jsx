import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './logout.css';
import LogoutIcon from '@mui/icons-material/Logout';

function LogOut() {
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);
  const logoutPage = () => {
    // e.preventDefault();
    localStorage.removeItem('token');
    setLogout(true);
    console.log(logout);
    return navigate('/login');
  };
  return (
    <button type="button" className="logoutbt" onClick={logoutPage}>
      <LogoutIcon className="logouticon" />
    </button>
  );
}

export default LogOut;
