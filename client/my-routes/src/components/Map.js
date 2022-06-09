import React from 'react';
import { useState, useMemo, useCallback, useRef } from 'react';
import { 
    GoogleMap, 
    Marker,
    DirectionsRenderer, 
    Circle, 
    MarkerClusterer,
} from "@react-google-maps/api";
import Places from './Places';


export default function Map() {
  const [origin, setOrigin] = useState();
    const mapRef = useRef();
    const center = useMemo(() => ({lat:43, lng: -80}), []);
    const options = useMemo(() => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }), []);
    const onLoad = useCallback(map => (mapRef.current = map), []);

  return (
    <div className='map-container'>
        <div className='input-container'>
            <h1>Where to go?</h1>
            <Places setOrigin = {(position) => {
              setOrigin(position);
              mapRef.current.panTo(position);
            } } ></Places>
        </div>
        <div className='map'>
            <GoogleMap 
                zoom={10} 
                center={center} 
                mapContainerClassName="google-map-container"
                options={options}
                onLoad = {onLoad}
            >
              {origin && <Marker position={origin}/>}
            </GoogleMap>
        </div>
    </div>
  )
}
