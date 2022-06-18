import { PrismaClient } from "@prisma/client";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { AppContext } from "next/app";
import SoldCard from "../../components/PageElements/SoldCard";

export default function Sold({soldCars}) {
	console.log(soldCars)
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-bold my-3">Satışlarım</h1>
        <div>
          <label className="mr-2">Durum</label>
          <select className="p-2 rounded-md bg-slate-200">
            <option value="">Onay Bekleyen</option>
            <option value="">Onaylanan</option>
            <option value="">Reddedilen</option>
          </select>
        </div>
      </div>
      <hr />
      <div className="my-3 grid grid-cols-1 gap-2">
        {soldCars.map((e) => (
			<div key={e.id}>asd</div>
		))}

		<SoldCard />
		
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  const client = new PrismaClient();

  const soldCars = await client.sales.findMany({
    where: { userSeller: { email: session?.user.email } },
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
  console.log(soldCars)
  return {
    props: {
      soldCars: soldCars,
    },
  };
}
