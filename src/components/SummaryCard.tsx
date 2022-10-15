interface IncomeCardProps {
  income: number;
  outcome: number;
  name: string;
}

export default function SummaryCard(props: IncomeCardProps) {
  return (
    <>
      <div className="mt-2 flex h-32 w-full flex-col items-center justify-center rounded-lg bg-zinc-800 shadow-md md:w-1/3">
        <h1 className="text-xl md:text-2xl font-bold">Saldo {props.name + " "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(props.income - props.outcome)}
        </h1>

        <div className="flex flex-col items-center text-base  md:text-lg font-bold">
          <h2>
            Entradas:{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(props.income)}
          </h2>
          <h2>
            Saídas:{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(props.outcome)}
          </h2>
        </div>
      </div>
    </>
  );
}
