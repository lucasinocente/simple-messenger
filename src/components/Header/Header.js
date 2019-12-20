import React from 'react';
import './Header.scss';

const Header = ({ children, visitorEmail }) => (
  <nav className="navbar is-info">
    <div className="container">
      <div className="navbar-brand">
        <span className="navbar-item navbar-item-single">
          <strong>
            {
              visitorEmail ?
                (
                  <>
                    <a href="/messages">SM / </a> 
                    {visitorEmail}
                  </>
                )
              : 
                'Simple Messenger'
            }  
          </strong>
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