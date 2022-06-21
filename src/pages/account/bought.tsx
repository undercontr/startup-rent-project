import { PrismaClient } from "@prisma/client";
import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import BoughtCard from "../../components/PageElements/BoughtCard";
import SoldCard from "../../components/PageElements/SoldCard";
import { getUserBoughtCars } from "../../lib/helper/restRepository";
import { CarFilterType } from "../../lib/types/restTypes";

export default function Bought({ boughtCarsProp }) {
  const {data} = useSession()
  const [boughtCars, setBoughtCars] = useState(boughtCarsProp);
  const [filter, setFilter] = useState<CarFilterType>("requiredAction");

  const filterChangeHandler = async (e) => {
    setFilter(e.target.value)
    const boughtCars = await getUserBoughtCars(data?.user.email, e.target.value)
      if (boughtCars.success) {
        setBoughtCars(boughtCars.data)
      }
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-bold my-3">Kiraladıklarım</h1>
        <div>
          <label className="mr-2">Durum</label>
          <select onChange={filterChangeHandler} defaultValue={`requiredAction`} className="p-2 rounded-md bg-slate-200">
            <option value="requiredAction">Onay Bekleyen</option>
            <option value="approved">Onaylanan</option>
            <option value="rejected">Reddedilen</option>
            <option value="completed">Tamamlanan</option>
            <option value="all">Tümü</option>
          </select>
        </div>
      </div>
      <hr />
      <div className="my-3 grid grid-cols-1 gap-2">
        {boughtCars.map((e) => (
          <BoughtCard
            key={e.id}
            salesData={e}
          />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  const client = new PrismaClient();

  const boughtCars = await client.sales.findMany({
    where: { userBuyer: { email: session?.user.email }, isApproved: null, isFinished: false },
    include: {
      userSeller: true,
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
      boughtCarsProp: JSON.parse(JSON.stringify(boughtCars)),
    },
  };
}
