import React from 'react';
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined';
import './Footer.css';

function Footer() {
  return (
    <div className="main">
      <div className="footer">
        <p className="footercontent">
          <CopyrightOutlinedIcon className="copyright" />
          {new Date().getFullYear()}
          |Weather Alert | ALL Rights Reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;
