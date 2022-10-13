import { TicketSell } from "@prisma/client";
import { Accordion, Panel } from "baseui/accordion";

interface TicketCardProps {
  ticket: TicketSell;
}

export default function TicketCard({ ticket }: TicketCardProps) {
  return (
    <>
      <Accordion accordion>
        <Panel title={`Rifa vendida para ${ticket.name}`}>
          <section>
            <p>
              <span className="mr-1 text-gray-300">CPF:</span>
              {ticket.cpf}
            </p>

            <p>
              <span className="mr-1 text-gray-300">Telefone:</span>
              {ticket.phone}
            </p>

            <p>
              <span className="mr-1 text-gray-300">Quantidade:</span>
              {ticket.ticketAmount}
            </p>

            <p>
              <span className="mr-1 text-gray-300">Valor:</span>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(ticket.ticketAmount * 10)}
            </p>

            <p>
              <span className="mr-1 text-gray-300">Data:</span>
              {new Intl.DateTimeFormat("pt-BR", {
                dateStyle: "short",
              }).format(new Date(ticket.createdAt))}
            </p>
          </section>
        </Panel>
      </Accordion>
    </>
  );
}
