import { getProviders, signIn } from "next-auth/react";
import { getCsrfToken } from "next-auth/react";
import { useState } from "react";

export default function SignUp({ providers, csrfToken }) {
  const [apiResult, setApiResult] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const submitBtnClickHandler = async (e) => {
    e.preventDefault();
    const payload = {email, password, fullName, birthDate};
    const resultRes = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload),
    });
    const result = await resultRes.json();
    setApiResult(result);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {apiResult && apiResult.success == false && <div className="bg-red-100 border-2 border-red-200 p-2 m-2">{apiResult.message}</div>}
        {apiResult && apiResult.success == true && <div className="bg-green-100 border-2 border-green-200 p-2 m-2">{apiResult.message}</div>}
        <div className="border-2 border-black p-3 m-2 rounded-xl">
          <form>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div>
              <label>
                Eposta
                <input onChange={(e) => setEmail(e.target.value)} className="w-full my-1 p-1 rounded border-2" type="text" />
              </label>
            </div>
            <div>
              <label>
                Şifre
                <input onChange={(e) => setPass(e.target.value)} className="w-full my-1 p-1 rounded border-2" type="password" />
              </label>
            </div>
            <div>
              <label>
                Tam isim
                <input onChange={(e) => setFullName(e.target.value)} className="w-full my-1 p-1 rounded border-2" type="text" />
              </label>
            </div>
            <div>
              <label>
                Doğum tarihi
                <input onChange={(e) => setBirthDate(e.target.value)} className="w-full my-1 p-1 rounded border-2" type="date" />
              </label>
            </div>
            <button onClick={submitBtnClickHandler} className="bg-black block w-full text-white font-bold p-2 my-2 rounded">
              Kayıt ol
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();
  return {
    props: { providers, csrfToken },
  };
}
