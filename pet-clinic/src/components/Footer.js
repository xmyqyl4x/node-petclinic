import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div>
        <Link to="/privacy-policy">Privacy Policy and Terms of Service</Link>
      </div>
      <div className="social-icons">
        <a
          href="https://www.facebook.com/SanFranciscoPetHospital/"
          target="_blank"
          rel="noreferrer"
          className="icon"
          aria-label="Facebook"
        >
          <i className="fab fa-facebook-f" aria-hidden="true"></i>
        </a>
        <a
          href="https://www.instagram.com/sfpethospital/"
          target="_blank"
          rel="noreferrer"
          className="icon"
          aria-label="Instagram"
        >
          <i className="fab fa-instagram" aria-hidden="true"></i>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
