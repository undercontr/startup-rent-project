import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
import { UserCarWithRelations } from "../../lib/types/prisma";
import Link from "next/link"

export default function MyCars({ userCars }) {
  
  return (
    <div className="container mx-auto py-2">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-bold">Araçlarım</h1>
        <Link href={"/account/add-car"}>
        <a className="bg-blue-500 rounded-md py-1 px-5 text-white font-bold hover:bg-blue-800 transition-colors duration-150">Araç Ekle</a></Link>
      </div>
        <hr className="my-4" />
      <div className="grid grid-cols-3 gap-3">
        {userCars.map((userCar: UserCarWithRelations, index: number) => (
          <div className="border-2 border-blue-500 rounded-xl p-2" key={index}>
            <h1 className="text-2xl text-blue-900 font-bold">{userCar.car.brand.name}</h1>
            <hr className="mb-2" />
            <p><b>Model: </b>{userCar.year}</p>
            <p><b>Günlük Tutar: </b>{Intl.NumberFormat("tr-TR", {currency: "TRY", style: "currency"}).format(userCar.dailyHireRate)}</p>
            <p><b>Şu anki KM: </b>{userCar.totalDistance.toLocaleString("tr-TR")}</p>
            <hr className="mb-2" />
            <p className="text-xs"><b>Model İsmi: </b>{userCar.car.name}</p>
            <p className="text-xs"><b>Paket: </b>{userCar.car.package}</p>
            <p className="text-xs"><b>Motor Hacmi: </b>{userCar.car.engineVolume}</p>
            <p className="text-xs"><b>Açıklama: </b>{userCar.car.description}</p>
            <p className="text-xs"><b>Yakıt Türü: </b>{userCar.car.fuelType.name}</p>

          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const client = new PrismaClient();

  const userCars = await client.userCar.findMany({
    where: { user: { email: { equals: session.user?.email } } },
    include: { car: { include: { brand: true, fuelType: true } } },
  });
  return {
    props: {
      userCars: userCars.map((car) => {
        return { ...car, dailyHireRate: car.dailyHireRate.toNumber() };
      }),
    },
  };
}
