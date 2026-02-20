import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div>
        <Link to="/privacy-policy">Privacy Policy and Terms of Service</Link>
      </div>
    </footer>
  );
}

export default Footer;
