import React from "react";
import { GoogleMap, InfoWindow, useJsApiLoader } from "@react-google-maps/api";

import { UserCarWithRelations } from "../../lib/types/prisma";
import Link from "next/link";
import ReservationDialog from "./ReservationDialog";

const containerStyle = {
  width: "100%",
  height: "700px",
};

const center = {
  lat: 41.0082376,
  lng: 28.9783589,
};

const options = { closeBoxURL: "", enableEventPropagation: true };

function CarMap({ mapChildren, onClickRent }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
  });

  const [isReserveClicked, setIsReserveClicked] = React.useState(false);
  const [map, setMap] = React.useState(null);

  const reservationClickHandler = (e) => {
    e.preventDefault();
    setIsReserveClicked(true);
  };

  // const onLoad = React.useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds(center);
  //   map.fitBounds(bounds);
  //   setMap(map);
  // }, []);

  // const onUnmount = React.useCallback(function callback(map) {
  //   setMap(null);
  // }, []);

  return isLoaded ? (
    <>
      <div className="m-3">
        <GoogleMap
          mapContainerStyle={containerStyle}
          clickableIcons={true}
          center={center}
          zoom={12}
          mapContainerClassName={"rounded-xl"}
          // onLoad={onLoad}
          // onUnmount={onUnmount}
        >
          {/* Child components, such as markers, info windows, etc. */}
          {mapChildren.map((userCar: UserCarWithRelations) => {
            const position = {
              lat: userCar.locationY,
              lng: userCar.locationX,
            };
            return (
              <InfoWindow key={userCar.carId + "" + userCar.userId} position={position} options={options}>
                <div className="">
                  <div className="">
                    <h1 className="text-md text-blue-900 font-bold">{`${userCar.car.brand.name} ${userCar.car.name} ${userCar.car.package} ${userCar.year}`}</h1>
                    <hr className="mb-2" />
                    <p>
                      <b>Şu anki KM: </b>
                      {userCar.totalDistance.toLocaleString("tr-TR")}
                    </p>
                    <hr className="my-1" />
                    <p className="text-xs">
                      <b>Motor Hacmi: </b>
                      {userCar.car.engineVolume}
                    </p>
                    <p className="text-xs">
                      <b>Yakıt Türü: </b>
                      {userCar.car.fuelType.name}
                    </p>
                    <hr className="my-1" />
                    <p className="text-xs">{userCar.car.description}</p>
                    <hr className="my-1" />
                    <div>
                      <span className="text-xs font-bold">Sahibi: </span>
                      <span>{userCar.user.email}</span>
                    </div>
                  </div>
                  <p className="font-bold text-lg my-1">
                    {Intl.NumberFormat("tr-TR", { currency: "TRY", style: "currency" }).format(userCar.dailyHireRate)}
                  </p>
                  <a
                    onClick={() => {
                      console.log("onCLickReservation fired")
                      onClickRent(userCar)
                    }}
                    className="bg-blue-500  hover:bg-blue-700 transition-all cursor-pointer rounded-md p-1 block text-center font-bold text-white"
                  >
                    Rezerve et
                  </a>
                </div>
              </InfoWindow>
            );
          })}
        </GoogleMap>
      </div>
    </>
  ) : (
    <></>
  );
}

export default React.memo(CarMap);
// export default CarMap;
