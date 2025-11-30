import React from 'react';
import './Footer.css';

import lmLogo from '../Assets/LM2.png'; // Updated logo import
import instagram_icon from '../Assets/instagram_icon.png';
import pintrest_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={lmLogo} alt="Lamer Logo" /> {/* Updated logo */}
        <p>lamer.ind</p>
      </div>
      <div className="footer-social-icons">
        <div className="footer-icons-container">
          <a href="https://www.instagram.com/lamer.ind/" target="_blank" rel="noopener noreferrer">
            <img src={instagram_icon} alt="Instagram" />
          </a>
        </div>
        <div className="footer-icons-container">
            <img src={pintrest_icon} alt="" />
        </div>
        <div className="footer-icons-container">
            <img src={whatsapp_icon} alt="" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
      </div>
    </div>
  );
};

export default Footer;
