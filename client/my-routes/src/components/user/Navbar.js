import React from "react";
import { Link } from 'react-router-dom';
import Logout from './Logout';
import PropTypes from 'prop-types'


const Navbar = ({ isAuthenticated }) => {
  return (
      <nav>
        <ul>
          <li>
            <Link to="/">
              <span role="img" aria-label="home">
                🚌
              </span>
              &nbsp;My Routes
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Logout/>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
              <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    );
  };

  Navbar.propTypes = {
    isAuthenticated: PropTypes.any
  } 
    
export default Navbar;
    