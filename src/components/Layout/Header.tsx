import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
const Header = (props) => {
  const { data: session, status } = useSession();
  return (
    <div className="p-5 bg-slate-300">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <Link href={"/"}>Logo</Link>
          </div>

          <div className="flex justify-between items-center gap-10">
            <div>
              <Link href={"/auth/signup"}>
                <a className="text-slate-700 font-bold px-2 py-1">Kirala</a>
              </Link>
              <Link href={"/auth/signup"}>
                <a className="text-slate-700 font-bold px-2 py-1">Araçlar</a>
              </Link>
            </div>
            {status == "authenticated" ? (
              <div className="flex gap-1">
                <Link href={"/api/auth/signout"}>
                  <a className="bg-black text-sm text-white font-bold rounded px-2 py-1">Oturum Kapat</a>
                </Link>
                <Link href={"/account"}>
                  {session.user.image ? (
                    <Image src={session.user.image} className="rounded-full cursor-pointer" alt="user" width={35} height={25} />
                  ) : (
                    <a className="bg-black text-sm text-white font-bold rounded px-2 py-1">Hesabım</a>
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
                <button onClick={() => signIn()} className="bg-black text-sm text-white font-bold rounded-lg px-1 py-1">
                  Oturum Aç
                </button>
                <Link href={"/auth/signup"}>
                  <a className="bg-black text-sm text-white font-bold rounded-lg px-1 py-1">Kayıt Ol</a>
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
