import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import './Navigation.css';

function Navigation() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="navigation">
      <div 
        style={{ 
          marginLeft: "calc(max(20px, 100vw - 1360px))",
          marginRight: "calc(max(20px, 100vw - 1360px))"
        }}
      >
        <nav className="navbar navbar-expand">
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link-custom" to="/">
                  TFToolbox
                </NavLink>
              </li>
            </ul>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: "300px" }}>
            <div>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Puzzles
                  </NavLink>
                </li>
              </ul>
            </div>
            <div>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">
                    About
                  </NavLink>
                </li>
              </ul>
            </div>
            <div>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact">
                    Contact Us
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navigation;
