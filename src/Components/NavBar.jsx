// import React from 'react';
import Fox from './assets/Fox-Logo.png';
import './NavBar.css';

const NavItem = ({ children }) => (
  <a href="#" className="nav-item">
    {children}
  </a>
);

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <NavItem>User Profile</NavItem>
      <NavItem>The Task Burrow</NavItem>
      
      <img className="logo" src={Fox} alt="Fun Cartoon Fox Logo"></img>
      
      <NavItem>About Our Team</NavItem>
      <NavItem>Logout</NavItem>
    </nav>
  );
};

export default NavBar;