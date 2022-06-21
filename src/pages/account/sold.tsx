import { PrismaClient } from "@prisma/client";
import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SoldCard from "../../components/PageElements/SoldCard";
import InfoModal from "../../components/Utils/InfoModal";
import { getUserSoldCars, processCarReturn, processRentRequestApiCall } from "../../lib/helper/restRepository";
import { CarFilterType } from "../../lib/types/restTypes";

export default function Sold({ soldCarsProp }) {
  const {data} = useSession()
  const [soldCars, setSoldCars] = useState(soldCarsProp);
  const [filter, setFilter] = useState<CarFilterType>("requiredAction");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState({status: "fail", message: ""});

  const confirmClickHandler = async (salesData) => {
    const apiResult = await processRentRequestApiCall(salesData.id, true);
    
    if (apiResult.success) {
      setModalStatus({message: apiResult.message, status: "success"})
      const soldCars = await getUserSoldCars(data?.user.email, filter)
      setModalOpen(true)
      if (soldCars.success) {
        setSoldCars(soldCars.data)
      }
    } else {
      setModalStatus({message: apiResult.message, status: "fail"})
    }


  };

  const cancelClickHandler = async (salesData) => {
    const apiResult = await processRentRequestApiCall(salesData.id, false)

    if (apiResult.success) {
      setModalStatus({message: apiResult.message, status: "success"})
      const soldCars = await getUserSoldCars(data?.user.email, filter)
      setModalOpen(true)
      if (soldCars.success) {
        setSoldCars(soldCars.data)
      }
    } else {
      setModalStatus({message: apiResult.message, status: "fail"})
    }
  };

  const carReturnClickHandler = async (salesData) => {
    const apiResult = await processCarReturn(salesData.id)

    if (apiResult.success) {
      setModalStatus({message: "Aracı teslim aldığınızı başarıyla bildirdiniz.", status: "success"})
      setModalOpen(true)
      const soldCars = await getUserSoldCars(data?.user.email, filter)
      if (soldCars.success) {
        setSoldCars(soldCars.data)
      }
    } else {
      setModalStatus({message: apiResult.message, status: "fail"})
    }
  };

  const closeModal = () => {
    setModalOpen(false)
  }
  
  const filterChangeHandler = async (e) => {
    setFilter(e.target.value)
    const soldCars = await getUserSoldCars(data?.user.email, e.target.value)
      if (soldCars.success) {
        setSoldCars(soldCars.data)
      }
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-bold my-3">Satışlarım</h1>
        <div>
          <label className="mr-2">Durum</label>
          <select onChange={filterChangeHandler} defaultValue={`requiredAction`} className="p-2 rounded-md bg-slate-200">
            <option value="requiredAction" selected>Onay Bekleyen</option>
            <option value="approved">Onaylanan</option>
            <option value="rejected">Reddedilen</option>
            <option value="completed">Tamamlanan</option>
            <option value="all">Tümü</option>
          </select>
        </div>
      </div>
      <hr />
      <div className="my-3 grid grid-cols-1 gap-2">
        {soldCars.map((e) => (
          <SoldCard
            key={e.id}
            salesData={e}
            onClickConfirm={confirmClickHandler}
            onClickCancel={cancelClickHandler}
            onClickCarReturn={carReturnClickHandler}
          />
        ))}
      </div>
      <InfoModal isOpen={modalOpen} closeModal={closeModal} btnText={"Tamam"} content={modalStatus.message}/>
    </div>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  const client = new PrismaClient();

  const soldCars = await client.sales.findMany({
    where: { userSeller: { email: session?.user.email }, isApproved: null, isFinished: false },
    include: {
      userBuyer: true,
      userCar: {
        include: {
          car: {
            include: {
              brand: true,
              fuelType: true,
            },
          },
        },
      },
    },
  });

  return {
    props: {
      soldCarsProp: JSON.parse(JSON.stringify(soldCars)),
    },
  };
}
