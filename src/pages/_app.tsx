import { SessionProvider, signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import "../styles/globals.css";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Auth>
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </SessionProvider>
  );
}

function Auth({ children }) {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;

  useEffect(() => {
    if (status == "loading") return; // Do nothing while loading
    if (!isUser) signIn(); // If not authenticated, force log in
  }, [isUser, status]);

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div className="absolute w-full h-full bg-black flex justify-center items-center">
    <h1 className="text-5xl font-bold text-white">Loading...</h1>
  </div>;
}
