import React from 'react';
import './Header.scss';

const Header = ({ children }) => (
  <nav className="navbar is-info">
    <div className="container">
      <div className="navbar-brand">
        <span className="navbar-item navbar-item-single">
          Simple Messenger
        </span>
        <span 
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false" 
          data-target=""
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </span>
      </div>
      { children }
    </div>
  </nav>
);

export default Header;