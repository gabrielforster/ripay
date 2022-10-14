import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";
import { PlusCircle } from "phosphor-react";

import Dashboard from "../components/Dashboard";
import TicketModal from "../components/TicketModal";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: session } = useSession();

  const [modelState, setModalState] = useState<boolean>(false);

  function handleChangeModal() {
    setModalState(!modelState);
  }

  if (session) {
    return (
      <>
        <Head>
          <title>Ripay</title>
        </Head>

        <header className="flex items-center justify-between p-2">
          <nav className="w-1/4 flex justify-between">
            <Link href={"/"}>
              <a className="underline">Rifas</a>
            </Link>
            <Link href={"/renda"}>
              <a>Renda</a>
            </Link>
          </nav>

          <nav className="flex">
            <div className="flex items-center">
              <button className="mr-2" onClick={() => handleChangeModal()}>
                <PlusCircle size={32} color="white" />
              </button>
            </div>

            <div className="flex">
              <img
                src={session.user?.image as string}
                alt="Foto de perfil"
                className="mr-2 h-10 w-10 rounded-full"
              />

              <button
                onClick={() => signOut()}
                className="text-gray-500 underline hover:text-gray-700"
              >
                Sair!
              </button>
            </div>
          </nav>
        </header>

        <main className="grid w-full place-items-center">
          <TicketModal isOpen={modelState} closeModal={handleChangeModal} />

          <Dashboard />
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
