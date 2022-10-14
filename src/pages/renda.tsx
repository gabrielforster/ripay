import { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import IncomeCard from "../components/IncomeCard";
import { trpc } from "../utils/trpc";

const RendaPage: NextPage = () => {
  const { data: session } = useSession();

  const { data: tickets } = trpc.useQuery(["tickets.get-all-tickets"]);

  const incomeSumary = tickets?.reduce((acc, income) => {

    if(income.payment === "MOM") acc.mom += income.ticketAmount * 10;
    if(income.payment === "DAD") acc.dad += income.ticketAmount * 10;
    if(income.payment === "GABRIEL") acc.gabriel += income.ticketAmount * 10;

    return acc
  }, {
    mom: 0,
    dad: 0,
    gabriel: 0
  });

  if (session) {
    return (
      <>
        <Head>
          <title>Ripay</title>
        </Head>

        <header className="flex items-center justify-between p-2">
          <nav className="w-1/4 flex justify-between">
            <Link href={'/'}>
              <a>Rifas</a>
            </Link>

            <Link href={'/renda'}>
              <a className="underline">Renda</a>
            </Link>
          </nav>

          <nav className="flex">
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

        <main className="text-sm md:text-xs w-9/12 flex flex-col flex-grow justify-center items-center mt-4 mx-auto">
          <IncomeCard name="Gabriel" income={incomeSumary?.gabriel as number}/>

          <IncomeCard name="Mãe" income={incomeSumary?.mom as number}/>

          <IncomeCard name="Pai" income={incomeSumary?.dad as number}/>
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

export default RendaPage;
