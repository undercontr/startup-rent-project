import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import CarMap from "../components/Utils/CarMap";
import InfoModal from "../components/Utils/InfoModal";
import ReservationDialog from "../components/Utils/ReservationDialog";
import { getUserByEmail } from "../lib/db/repo";
import { getUserCarsIndex } from "../lib/helper/restRepository";

const Home = (props) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isRentBtnClick, setIsRentBtnClick] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [reservationData, setReservationData] = React.useState({});
  const [pins, setPins] = React.useState(props.pins);

  const rentClickHandler = (userCar) => {
    setIsOpen(true);
    setReservationData(userCar);
  };

  const reservationClickHandler = async (inputData, setRentPeriod) => {
    setIsRentBtnClick(true);
    const payload = {
      userBuyerId: props.user.id,
      userSellerId: reservationData.user.id,
      userCarId: reservationData.id,
      ...inputData,
    };

    axios
      .post("/api/rentcar", payload)
      .then((json) => {
        closeModal();
        setIsModalOpen(true);
        setRentPeriod(0);

        getUserCarsIndex(props.user.email).then((pinsData) => {
          setPins(pinsData);
        });
      })
      .catch((error) => {
        console.error(error.response.data);
        setIsRentBtnClick(false);
      });
  };

  const closeModal = () => {
    setIsRentBtnClick(false);
    setIsOpen(false);
  };

  return (
    <div>
      <Head>
        <title>Araç Kirala - CarRent</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
        <h1 className="text-red-500 font-serif text-5xl p-5 text-center"> Bir araç seçin...</h1>
        <CarMap mapChildren={pins} onClickRent={rentClickHandler} />
      </div>
      <ReservationDialog
        isLoading={isRentBtnClick}
        onClickReservation={reservationClickHandler}
        closeModal={closeModal}
        isOpen={isOpen}
        reservationData={reservationData}
      />
      <InfoModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        title="Başarılı!"
        content="Kiralama işleminiz araç sahibine iletildi. Onay sürecinden sonra işleminiz başarılı ile tamamlanacaktır"
        btnText="Kapat"
      />
    </div>
  );
};

export default Home;
Home.auth = true;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const client = new PrismaClient();
  const userCars = await client.userCar.findMany({
    include: { car: { include: { brand: true, fuelType: true } }, user: true },
    where: { isOccupied: false },
  });

  const pins = userCars
    .filter((e) => e.user.email !== session?.user?.email)
    .map(({ user: { password, ...user }, ...e }) => ({
      ...e,
      user: user,
    }));

  const userQueryResult = await getUserByEmail(session?.user?.email);

  return {
    props: {
      pins: pins,
      user: userQueryResult.success && userQueryResult.user,
    },
  };
}
