import { useLoadScript } from "@react-google-maps/api"
import Map from "./components/Map"

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  })
  
  if (!isLoaded) return <div>Loading...</div>
  return (
    <div className="App">
      <Map></Map>
    </div>
  );
}

export default App;
