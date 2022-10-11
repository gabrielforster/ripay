import type { NextPage } from "next";
import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";


const Home: NextPage = () => {
  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  const { data: session } = useSession();

  console.log(session);

  if (session) {
    return (
      <>
        <Head>
          <title>Ripay</title>
        </Head>
        <header className="flex justify-between p-2">
          <h3>Ripay</h3>

          <div className="flex">
            <img
              className="rounded-full h-10 w-10 mr-2"
              src={session.user?.image ? session.user.image : ""} 
            />
            
            <button 
              onClick={() => signOut()}
              className="text-gray-500 hover:text-gray-700 underline"
            >
              Sair!
            </button>
          </div>
        </header>

        <main className="grid place-items-center">
          <h2>Listagem das Rifas!</h2>          
        </main>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Login necessário!</title>
      </Head>

      <main className="grid min-h-screen place-items-center">
        <button onClick={() => signIn()} className="rounded bg-zinc-700 p-3">
          Realizar Login!
        </button>
      </main>
    </>
  );
};

export default Home;
