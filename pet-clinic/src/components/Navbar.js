import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/style.css';
function Navbar(){
    return (
        <nav className="navbar custom-navbar">
            <Link to="/"><img src="Logo.png" alt="Clinic Logo" className="navbar-logo" /></Link>
            <ul className="nav-ul">
                <li className="nav-item"><Link to="/" className="nav-link">HOME</Link></li>
                <li className="nav-item"><Link to="/owners" className="nav-link">FIND OWNERS</Link></li>
            </ul>
        </nav>
    );
}
export default Navbar;
