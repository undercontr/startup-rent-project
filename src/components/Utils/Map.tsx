import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 41.0082376,
  lng: 28.9783589,
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAdoLyj21VhmagyYf7Y6fJZhTeVRbYOTBM",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className="m-3">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} mapContainerClassName={"rounded-xl"} onLoad={onLoad} onUnmount={onUnmount}>
        {/* Child components, such as markers, info windows, etc. */}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(Map);
