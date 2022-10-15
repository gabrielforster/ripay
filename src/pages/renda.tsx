import { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { PlusCircle } from "phosphor-react";
import { useState } from "react";

import IncomeCard from "../components/SummaryCard";
import { SpentModal } from "../components/SpentModal";
import { trpc } from "../utils/trpc";

const RendaPage: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: session } = useSession();

  const { data: tickets } = trpc.useQuery(["tickets.get-all-tickets"]);
  const { data: outcomes } = trpc.useQuery(["outcome.get-all-outcomes"]);

  const incomeSumary = tickets?.reduce(
    (acc, income) => {
      if (income.payment === "MOM") acc.mom += income.ticketAmount * 10;
      if (income.payment === "DAD") acc.dad += income.ticketAmount * 10;
      if (income.payment === "GABRIEL") acc.gabriel += income.ticketAmount * 10;

      return acc;
    },
    { mom: 0, dad: 0, gabriel: 0 }
  );

  const outcomeSumary = outcomes?.reduce(
    (acc, outcome) => {
      if (outcome.payment === "MOM") acc.mom += Number(outcome.cost);
      if (outcome.payment === "DAD") acc.dad += Number(outcome.cost);
      if (outcome.payment === "GABRIEL") acc.gabriel += Number(outcome.cost);

      return acc;
    },
    { mom: 0, dad: 0, gabriel: 0 }
  );

  function handleChangeModal() {
    setIsModalOpen(!isModalOpen);
  }

  if (session) {
    return (
      <>
        <Head>
          <title>Ripay</title>
        </Head>

        <header className="flex items-center justify-between p-2">
          <nav className="flex w-1/4 justify-between md:w-[5%]">
            <Link href={"/"}>
              <a>Rifas</a>
            </Link>

            <Link href={"/renda"}>
              <a className="underline">Renda</a>
            </Link>
          </nav>

          <div className="flex items-center">
            <button
              className="mr-2 flex items-center rounded border border-zinc-700 bg-zinc-800 p-1"
              onClick={() => handleChangeModal()}
            >
              <span>Novo gasto!</span>
              <PlusCircle size={24} color="white" />
            </button>
          </div>

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

        <SpentModal isOpen={isModalOpen} closeModal={handleChangeModal} />

        <main className="mx-auto mt-4 flex w-9/12 flex-grow flex-col items-center justify-center text-sm md:text-xs">
          <>
            <IncomeCard
              name="Gabriel"
              income={incomeSumary?.gabriel as number}
              outcome={outcomeSumary?.gabriel as number}
            />

            <IncomeCard
              name="Mãe"
              income={incomeSumary?.mom as number}
              outcome={outcomeSumary?.mom as number}
            />

            <IncomeCard
              name="Pai"
              income={incomeSumary?.dad as number}
              outcome={outcomeSumary?.dad as number}
            />
          </>

          <section className="mt-4 flex w-2/3 flex-col items-center justify-center">
            <h1 className="text-2xl">Saídas</h1>

            {/* BAD LIST HERE FIX LATTER */}
            <ul className="flex w-full flex-col items-center justify-center text-sm">
              {outcomes?.map((outcome) => (
                <li key={outcome.id} className="flex justify-between">
                  <span>{outcome.description}</span>
                  <span className="ml-2">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(outcome.cost))}
                  </span>
                </li>
              ))}
            </ul>
          </section>
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
