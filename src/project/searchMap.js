import React from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
//import { REACT_APP_GOOGLE_MAPS_KEY } from "../constants/constants";

const MapComponent = ({ selectedLocation }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAHDq8GwCrU2k7WBMmBoQ1CX9USym6wPUo",
  });
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  if (loadError) return "Error";
  if (!isLoaded) return "Maps";

  return (
    <div style={{ marginTop: "50px" }}>
      <GoogleMap
        mapContainerStyle={{
          height: "800px",
        }}
        center={selectedLocation}
        zoom={15}
        onLoad={onMapLoad}
      >
        <MarkerF
          position={selectedLocation}
          
        />
      </GoogleMap>
    </div>
  );
};

export default MapComponent;