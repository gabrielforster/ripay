interface IncomeCardProps {
  income: number;
  name: string;
}

export default function IncomeCard(props: IncomeCardProps) {
  return (
    <>
      <div className="flex h-32 w-full flex-col items-center justify-center rounded-lg bg-zinc-800 shadow-md mt-2">
        <h1 className="text-2xl font-bold">Quantia com {props.name}</h1>
        <h1 className="text-2xl font-bold">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(props.income)}
        </h1>
      </div>
    </>
  );
}
