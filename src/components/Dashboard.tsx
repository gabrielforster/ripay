import { trpc } from "../utils/trpc"
import TicketCard from "./TicketCard";

export default function Dashboard(){
  
  const {data: tickets, isLoading} = trpc.useQuery(["tickets.get-all-tickets"]);
  
  if(isLoading){
    return <div>Carregando rifas...</div>
  }

  if(!tickets){
    return <div>Nenhuma rifa encontrada!</div>
  }

  return (
    <>
      <section className="flex w-full">
        <div className="flex flex-col items-center justify-center min-w-full max-w-2xl p-2 mx-auto space-y-4">
          <h1 className="text-2xl font-bold">Rifas</h1>

          <div className="w-full">
            {/* TRASH SORT HERE FIX THAT */}
            {tickets.sort((a, b) => Number(- (Number(a.createdAt) - Number(b.createdAt)))).map((ticket) => (
              <div key={ticket.id}>
                <TicketCard ticket={ticket}/>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}