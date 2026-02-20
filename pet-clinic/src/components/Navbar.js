import React from 'react';
import '../assets/style.css';
function Navbar(){
    return (
        <nav className="navbar custom-navbar">
            <img src="Logo.png" alt="Clinic Logo" className="navbar-logo" />
            <ul className="nav-ul">
                <li className="nav-item"><a href="#home" className="nav-link">HOME</a></li>
                <li className="nav-item"><a href="#locations" className="nav-link">LOCATIONS</a></li>
            </ul>
        </nav>   
    );
}
export default Navbar; 



