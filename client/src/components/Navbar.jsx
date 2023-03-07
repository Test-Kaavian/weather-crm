import React from 'react';
import { Link } from 'react-router-dom';
import BookIcon from '@mui/icons-material/Book';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import LogOut from '../pages/Logout';
import Toggle from './ToggleSwitch';
import './Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <Link className="Weatheralertlink" to="/Home">
        Weather Alert
      </Link>
      <Link className="Logslink" to="/Logs">
        <BookIcon />
        Logs
      </Link>
      <Link className="Userinfolink" to="/Userinfo">
        <InfoIcon />
        Customer
      </Link>
      <Link className="Settingslink" to="/Settings">
        <SettingsIcon />
      </Link>
      <Toggle />
      <LogOut className="Logoutlink" />
    </div>
  );
}
export default Navbar;
