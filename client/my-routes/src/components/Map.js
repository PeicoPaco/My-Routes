import { useState, useMemo, useCallback, useRef } from 'react';
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
  

  const fetchDirections = (origin)  => {
    if (!destination) return;
    if (!origin) return;
    let service = new google.maps.DirectionsService()
    service.route(
    {
      origin: origin,
      destination: destination, 
      travelMode: google.maps.TravelMode.DRIVING,
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
                <button onClick={() => {fetchDirections(origin)}}>Find Route</button>
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
      <div>
      {directions &&
      <Directions leg={directions.routes[0].legs[0]}/>
      }
      </div>
    </div>
  )
}
  
