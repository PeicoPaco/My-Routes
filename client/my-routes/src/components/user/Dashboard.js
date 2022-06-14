import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import Home from './Home';
import Logout from './Logout';
import PropTypes from 'prop-types';




const Dashboard = ({setIsAuthenticated}) => {
  return (
    <section className='dashboard'>
       <Routes>
          <Route
            path="/register"
            element={<Register setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/"
            element={<Logout setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/" element={<Home />} />
      </Routes>
    </section>
  )
}

Dashboard.propTypes = {
  setIsAuthenticated: PropTypes.any
}

export default Dashboard;