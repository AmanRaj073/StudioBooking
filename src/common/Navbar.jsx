import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const navigate = useNavigate()

  const handleNavToggle = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-light px-3">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Your Logo
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleNavToggle}
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div 
          className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} 
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto me-3 mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                exact="true"
                to="/"
                style={({ isActive }) => ({
                  fontWeight: isActive ? '600' : '400',
                  color: isActive ? '#0d6efd' : '#212529',
                  borderBottom: isActive ? '2px solid #0d6efd' : 'none'
                })}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                to="/studio"
                style={({ isActive }) => ({
                  fontWeight: isActive ? '600' : '400',
                  color: isActive ? '#0d6efd' : '#212529',
                  borderBottom: isActive ? '2px solid #0d6efd' : 'none'
                })}
              >
                Studio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                to="/booking"
                style={({ isActive }) => ({
                  fontWeight: isActive ? '600' : '400',
                  color: isActive ? '#0d6efd' : '#212529',
                  borderBottom: isActive ? '2px solid #0d6efd' : 'none'
                })}
              >
                Booking
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                to="/contact-us"
                style={({ isActive }) => ({
                  fontWeight: isActive ? '600' : '400',
                  color: isActive ? '#0d6efd' : '#212529',
                  borderBottom: isActive ? '2px solid #0d6efd' : 'none'
                })}
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
          
          <div className="d-flex align-items-center">
            
            <button
              type="button"
              className="btn btn-primary rounded-pill px-3 me-3"
              onClick={()=>navigate('/booking')}
            >
              Book Now
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="22"
              width="20.25"
              viewBox="0 0 448 512"
              onClick={()=>navigate("/profile")}
              style={{cursor:"pointer"}}
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;