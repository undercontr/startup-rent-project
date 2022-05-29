import { useSession } from "next-auth/react";
import Link from "next/link";

const Account = (props) => {
  const { data: session, status } = useSession();
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center py-5">
        <h1 className=" text-3xl">{session?.user.name}, hoşgeldiniz!</h1>
        <Link href={"/account/profile"}>
          <button className="bg-blue-500 hover:bg-blue-800 px-3 py-1 rounded-lg font-bold text-white">Hesabımı Düzenle</button>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Link href={"/account/my-cars"}>
          <button className="bg-blue-500 hover:bg-blue-800 text-white font-bold rounded-xl text-3xl p-10 transition-all duration-75">
            Araçlarım
          </button>
        </Link>
        <Link href={"/account/add-car"}>
          <button className="bg-blue-500 hover:bg-blue-800 text-white font-bold rounded-xl text-3xl p-10 transition-all duration-75">
            Araç Ekle
          </button>
        </Link>
        <Link href={"/account/bought"}>
          <button className="bg-blue-500 hover:bg-blue-800 text-white font-bold rounded-xl text-3xl p-10 transition-all duration-75">
            Kiraladıklarım (Satın alımlarım)
          </button>
        </Link>
        <Link href={"/account/sold"}>
          <button className="bg-blue-500 hover:bg-blue-800 text-white font-bold rounded-xl text-3xl p-10 transition-all duration-75">
            Kiralananlar (Satışlarım)
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Account;

Account.auth = true;
