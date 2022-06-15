import React, { useState, useMemo, useCallback, useRef } from 'react';
import { 
    GoogleMap, 
    Marker,
    DirectionsRenderer, 
} from "@react-google-maps/api";
import Places from './Places';
import Destinations from './Destinations';
import Directions from './Directions';



export default function Map() {
  const google = window.google;
  const [cost, setCost] = useState();
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [directions, setDirections] = useState();

  const mapRef = useRef();
  const center = useMemo(() => ({lat:43, lng: -80}), []);
  const options = useMemo(() => ({
    disableDefaultUI: true,
    clickableIcons: false,
  }), []);
  const onLoad = useCallback(map => (mapRef.current = map), []);
  

  const fetchDirections = (origin, mode)  => {
    let output;
    switch(mode) {
      case 1: output = google.maps.TravelMode.DRIVING;
              setCost(10)
              break;
      case 2: output = google.maps.TravelMode.WALKING;
              setCost(0)
              break;
      case 3: output = google.maps.TravelMode.TRANSIT;
              setCost(4);
              break;
      default: output = google.maps.TravelMode.DRIVING;
    }
    if (!destination || !origin) return;
    let service = new google.maps.DirectionsService()
    service.route(
    {
      origin: origin,
      destination: destination, 
      travelMode: output,
    },
    (result, status) => {
      if (status === 'OK' && result)
      setDirections(result);
    }
  )
  }
  
  return (
    <div className='user-page'>
      <div className='map-container'>
          <div className='input-container'>
              <h1>Where to go?</h1>
              <Places 
                setOrigin = {(position) => {
                setOrigin(position);
                mapRef.current.panTo(position)}} 
              ></Places>
              <Destinations
                setDestination = {(position) => {
                  setDestination(position);
                  mapRef.current.panTo(position);
                }}
                ></Destinations>
                <div className='button-container'>
                  <button onClick={() => {fetchDirections(origin, 1)}}>🚗</button>
                  <button onClick={() => {fetchDirections(origin, 2)}}>🚶‍♂️</button>
                  <button onClick={() => {fetchDirections(origin, 3)}}>🚋</button>
                </div>
          </div>
          <div className='map'>
              <GoogleMap 
                  zoom={10} 
                  center={center} 
                  mapContainerClassName="google-map-container"
                  options={options}
                  onLoad = {onLoad}      
              >
                {directions && <DirectionsRenderer directions = {directions} />}
                {origin && <Marker position={origin} /> }
                {destination && <Marker position={destination}/>}
              </GoogleMap>
          </div>
      </div>
      <div className="destinations-container">
        <h4>Trip Info</h4>
        <div className='information-headers'>
          <ul>
            <li><strong>Distance</strong></li>
            <li><strong>Time</strong></li>
            <li><strong>Cost</strong></li>
          </ul>
        </div>
        {directions && (
          <Directions leg={directions.routes[0].legs[0]} cost = {cost}/>
          )
        }
      </div>
    </div>
  )
}
  
