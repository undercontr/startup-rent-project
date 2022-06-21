import { PrismaClient } from "@prisma/client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { CarWithRelations } from "../../lib/types/prisma";
import LocationCombobox from "../../components/Utils/LocationCombobox";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function AddCar(props) {
  const { data } = useSession();

  const [validationMessage, setValidationMessage] = useState<string>("");
  const [validationStatus, setValidationStatus] = useState<boolean>(false);

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [successStatus, setSuccessStatus] = useState<boolean>(false);

  const [brandId, setBrandId] = useState<string>("0");
  const [cars, setCars] = useState<CarWithRelations[]>([]);
  const [car, setCar] = useState<CarWithRelations>();
  const [distanceValue, setDistanceValue] = useState<string>("0");
  const [dailyHireRate, setDailyHireRate] = useState<string>("0");
  const [yearValue, setYearValue] = useState<string>(new Date().getFullYear().toString());
  const [location, setLocation] = useState<{ lat: Number; lng: Number }>({ lat: 0, lng: 0 });

  const submitHandler = async () => {
    let notValid = [];

    if (Number(brandId) == 0) notValid.push("Marka");
    if (car == undefined) notValid.push("Araç");
    if (Number(distanceValue) == 0) notValid.push("Şu anki KM");
    if (Number(yearValue) == 0) notValid.push("Yıl");
    if (Number(dailyHireRate) == 0) notValid.push("Günlük Kira Tutarı");
    if (Number(location.lng) == 0) notValid.push("Aracın Yeri");

    if (notValid.length > 0) {
      setValidationStatus(false);
      setValidationMessage(`<b>${notValid.join(", ")}</b> alanlarını kontrol ediniz.`);
      return;
    } else {
      setValidationStatus(true);
      const sendData = {
        user: data.user?.email,
        brandId: Number(brandId),
        carId: Number(car.id),
        totalDistance: Number(distanceValue),
        year: Number(yearValue),
        dailyHireRate: Number(dailyHireRate),
        locationX: Number(location.lng),
        locationY: Number(location.lat),
      };

      axios.post("/api/addcar", sendData).then(json => {
        setSuccessMessage(json.data.message);
        setSuccessStatus(json.data.success);
      })
    }
  };

  const isCarExists = () => car != undefined && Object.keys(car).length > 0;

  const brandChangeHandler = (e) => {
    setCar(null);
    setBrandId(e.target.value);
  };

  const carChangeHandler = (e) => {
    const selectedCar = cars.find((ex) => ex.id == e.target.value);
    setCar(selectedCar);
  };

  const totalDistanceChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const result = e.target.value.replace(/\D/g, "");
    setDistanceValue(result);
  };

  const dailyHireRateChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const result = e.target.value.replace(/\D/g, "");
    setDailyHireRate(result);
  };

  const yearChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const result = e.target.value.replace(/\D/g, "");
    const currentYear = new Date().getFullYear();

    if (Number(result) > currentYear) {
      setYearValue(currentYear.toString());
    } else {
      setYearValue(result);
    }
  };

  useEffect(() => {

    const body = {
      where: {
        brandId: Number(brandId),
      },
      include: {
        fuelType: true,
        brand: true,
      },
    };

      axios.post("/api/getcars", body).then(json => {
        setCars(json.data.data);
      }).catch((error) => {
        console.error("error", error)
      })

  }, [brandId]);

  return (
    <div className="py-3 container mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-bold">Araç Ekle</h1>
        <button
          onClick={submitHandler}
          className="bg-blue-500 rounded-md py-1 px-5 text-white font-bold hover:bg-blue-800 transition-colors duration-150"
        >
          Ekle
        </button>
      </div>
      {validationMessage.length > 0 ? (
        <div
          dangerouslySetInnerHTML={{ __html: validationMessage }}
          className={`text-center border-2 ${validationStatus? "bg-green-300 border-green-500" : "bg-red-300 border-red-500"} py-2 my-2 rounded-xl`}
        />
      ) : null}
      {successMessage.length > 0 ? (
        <div
          dangerouslySetInnerHTML={{ __html: successMessage }}
          className={`text-center border-2 ${successStatus ? "bg-green-300 border-green-500" : "bg-red-300 border-red-500 "} py-2 my-2 rounded-xl`}
        />
      ) : null}
      
      <div className="my-3 p-4 rounded-xl border-2 border-blue-500">
        <div className="grid grid-cols-8 gap-4 items-center">
          <div
            className={`border-2 border-blue-500 col-span-2 h-full w-full justify-center items-center ${
              !isCarExists() ? "flex" : ""
            } bg-blue-100 rounded-lg p-2`}
          >
            {isCarExists() ? (
              <div>
                <p className="text-xs">
                  <strong>Açıklama: </strong>
                  {car.description}
                </p>
                <p className="text-xs">
                  <strong>Paket: </strong>
                  {car.package}
                </p>
                <p className="text-xs">
                  <strong>Motor Hacmi: </strong>
                  {car.engineVolume}
                </p>
                <p className="text-xs">
                  <strong>Yakıt: </strong>
                  {car.fuelType.name}
                </p>
                <p className="text-xs">
                  <strong>Marka: </strong>
                  {car.brand.name}
                </p>
              </div>
            ) : (
              <p className="text-xl font-bold">Bir araç seçin...</p>
            )}
          </div>
          <div>
            <div>
              <label className="block" htmlFor="">
                Marka
              </label>
              <select onChange={brandChangeHandler} className="w-full border-2 py-1 px-3 border-blue-500 rounded-md" required>
                <option value="0">Seçiniz</option>
                {props.brands.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block" htmlFor="">
                Araç
              </label>
              <select onChange={carChangeHandler} className="w-full border-2 py-1 px-3 border-blue-500 rounded-md">
                <option value="0">Seçiniz</option>
                {cars?.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <div>
              <label className="block" htmlFor="">
                Şu anki KM
              </label>
              <input
                onChange={totalDistanceChangeHandler}
                value={distanceValue}
                className="w-full border-2 py-[2px] px-3 border-blue-500 rounded-md"
              />
            </div>
            <div>
              <label className="block" htmlFor="">
                Yıl
              </label>
              <input
                onChange={yearChangeHandler}
                value={yearValue}
                className="w-full border-2 py-[2px] px-3 border-blue-500 rounded-md"
              />
            </div>
          </div>
          <div className="col-span-2">
            <div>
              <label className="block" htmlFor="">
                Aracın Yeri
              </label>
              <LocationCombobox onLocationSelect={setLocation} />
            </div>
            <div>
              <label className="block" htmlFor="">
                Günlük Kira Tutarı (₺)
              </label>
              <input onChange={dailyHireRateChangeHandler} className="w-full border-2 py-[2px] px-3 border-blue-500 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AddCar.auth = true;

export async function getServerSideProps(ctx) {
  const client = new PrismaClient();

  return {
    props: {
      brands: await client.carBrand.findMany(),
    },
  };
}
