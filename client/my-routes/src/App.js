import React, {useState } from "react";
import { useLoadScript } from "@react-google-maps/api"
import { BrowserRouter as Router } from "react-router-dom";
import auth from './utils/auth';
import Navbar from "./components/user/Navbar";
import Dashboard from "./components/user/Dashboard";
import './App.css'

function App() {
  const initialState = auth.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  })
  
  if (!isLoaded) return <div>Loading...</div>
  return (
    <main className="App">
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <Dashboard setIsAuthenticated={setIsAuthenticated} />
    </Router>
  </main>
  );
}

export default App;
