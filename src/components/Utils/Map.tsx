import React from "react";
import { GoogleMap, InfoBox, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "700px",
};

const center = {
  lat: 41.0082376,
  lng: 28.9783589,
};

function Map({googleMap, mapChildren}) {

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
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
      <GoogleMap mapContainerStyle={containerStyle} clickableIcons={true} center={center} zoom={12} mapContainerClassName={"rounded-xl"} onLoad={onLoad} onUnmount={onUnmount} {...googleMap} >
        {/* Child components, such as markers, info windows, etc. */}
        {/* {mapChildren?.forEach(element => {
          element
        })} */}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(Map);
