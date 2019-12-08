import React from 'react';
import './Header.scss';

const Header = ({ children }) => (
  <nav className="navbar is-info">
    <div className="container">
      <div className="navbar-brand">
        <span className="navbar-item navbar-item-single">
          Simple Messenger
        </span>
      </div>
      { children }
    </div>
  </nav>
);

export default Header;