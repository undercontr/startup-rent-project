import { PrismaClient, User, UserCar } from "@prisma/client";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image"
import Link from "next/link";


const Profile = ({ user }: {user: User}) => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-4 py-3 gap-3">
        <div className="col-span-3 border-2 border-blue-500 rounded-xl p-5">
          <div className="flex justify-between items-center">
            <h1 className="text-5xl font-bold">Profilim</h1>
            <FontAwesomeIcon className="cursor-pointer hover:text-blue-500" icon={faEdit} />
          </div>
          <hr className="pb-3" />
            
          <div className="flex gap-5 items-center
          ">
            <div className="flex justify-center">
           {user.image ? <Image src={user.image} width={"100%"} height={"100%"} layout="intrinsic" alt="user image"/> : <button className="bg-black p-1 text-white font-bold">Resim Ekle</button>}
           </div>
           <div>
           <h1 className="text-xl font-bold">{user.name}</h1> 
           <p>
              Email: <span className="text-gray-400">{user.email}</span>
            </p>
            <p>
              Şifre:{" "}
              {user.password ? <span>***</span> : <button className="bg-black p-1 text-white font-bold">Şifre belirleyin</button>}
            </p>
           </div>
           
          </div>
        </div>
        <div className="border-2 border-blue-500 rounded-xl p-5">
          <h1 className="text-5xl font-bold">Hızlı Menü</h1>
          <hr />
          <div>
            <ul>
              <Link href={"my-cars"}><li className="cursor-pointer">Araçlarım</li></Link>
              <Link href={"add-car"}><li className="cursor-pointer">Araç Ekle</li></Link>
              <Link href={"sold"}><li className="cursor-pointer">Satışlarım</li></Link>
              <Link href={"bought"}><li className="cursor-pointer">Satınalımlarım</li></Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.auth = true;
export default Profile;

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  const client = new PrismaClient();
  
  const userSet = await client.user.findFirst({
    where: { email: session.user.email }
  });

  const user = {
    id: userSet.id,
    name: userSet.name,
    email: userSet.email,
    image: userSet.image,
    password: userSet.password ? true : false
  }

  return {
      props: {
          user
      }
  }
}