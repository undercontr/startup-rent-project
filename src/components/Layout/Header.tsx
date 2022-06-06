import { useSession, signIn, signOut } from "next-auth/react";
import logo from "../../../public/logo-white.png"
import Link from "next/link";
import Image from "next/image";
const Header = (props) => {
  const { data: session, status } = useSession();
  return (
    <div className="bg-black">
      <div className="container mx-auto">
        <div className="flex justify-between items-stretch">
          <div className="bg-blue-700 p-3 cursor-pointer">
            <Link href={"/"} >
              <Image src={logo} alt="logo" width={120} height={35} objectFit="contain"/>
            </Link>
          </div>

          <div className="flex justify-between items-center gap-10">
           
            {status == "authenticated" ? (
              <div className="flex gap-1">
                <button onClick={() => signOut({redirect: true, callbackUrl: "/"})} className="bg-blue-500 text-sm text-white font-bold rounded px-2 py-1">Oturum Kapat</button>
                <Link href={"/account"}>
                  {session.user?.image ? (
                    <Image src={session.user?.image} className="rounded-full cursor-pointer" alt="user" width={35} height={25} />
                  ) : (
                    <a className="bg-blue-500 text-sm text-white font-bold rounded px-2 py-1">Hesabım</a>
                  )}
                </Link>
              </div>
            ) : (
              <div className="flex gap-1">
                {/* <Link href={"/auth/signin"}>
                  <a className="bg-black text-white font-bold rounded px-2 py-1">
                    SignIn
                  </a>
                </Link> */}
                <button onClick={() => signIn()} className="bg-blue-500 text-sm text-white font-bold rounded px-1 py-1">
                  Oturum Aç
                </button>
                <Link href={"/auth/signup"}>
                  <a className="bg-blue-500 text-sm text-white font-bold rounded px-1 py-1">Kayıt Ol</a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
