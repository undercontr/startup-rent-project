import { getProviders, signIn } from "next-auth/react";
import { getCsrfToken } from "next-auth/react";
import Image from "next/image";

export default function SignIn({ csrfToken }) {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="border-2 border-black p-3 m-2 rounded-xl">
          <form method="post" action="/api/auth/callback/credentials">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div>
              <label>
                Eposta
                <input className="w-full my-1 p-1 rounded-xl border-2" name="email" type="text" />
              </label>
            </div>
            <div>
              <label>
                Şifre
                <input className="w-full my-1 p-1 rounded-xl border-2" name="password" type="password" />
              </label>
            </div>
            <button type="submit" className="bg-black block w-full text-white font-bold p-2 my-4 rounded-xl">
              Oturum aç
            </button>
          </form>
          <div className="flex items-center justify-center text-center p-2 bg-black  my-1 rounded-xl gap-3">
            <Image src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width={15} height={15} alt="google" />
            <button className="text-white font-bold" onClick={() => signIn("google", { redirect: false })}>
              ile oturum aç
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
