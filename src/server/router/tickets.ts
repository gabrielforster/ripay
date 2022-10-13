import { createRouter } from "./context"
import { z } from "zod"

import { paymentTypes } from "../common/payment"

export const ticketsRouter = createRouter()
  .query("gett-all-tickets", {
    async resolve({ctx}){
      return await ctx.prisma.ticketSell.findMany() 
    }
  })
  .query("get-one-ticket", {
    input: z
      .object({
        id: z.string()
      }),
    async resolve({ctx, input}){
      return await ctx.prisma.ticketSell.findUnique({
        where: {
          id: input.id
        }
      })
    }
  })
  .mutation("create-ticket", {
    input: z
      .object({
        name: z.string(),
        phone: z.string(),
        cpf: z.string(),
        amount: z.number(),
        registered: z.boolean().nullish(),
        payed: z.boolean().nullish(),
        payment: z.string()

      }),
    async resolve({ctx, input}){
      
      const payment = paymentTypes[input.payment as keyof typeof paymentTypes]

      const createdTicket = await ctx.prisma.ticketSell.create({
        data: {
          name: input.name,
          cpf: input.cpf,
          phone: input.phone,
          ticketAmount: input.amount,
          registered: input.registered ?? false,
          payed: input.payed ?? false,
          payment,
        }
      })

      return createdTicket
    }
  })
  .mutation("update-ticket", {
    input: z
      .object({
        id: z.string(),
        name: z.string().nullish(),
        phone: z.string().nullish(),
        cpf: z.string().nullish(),
        amount: z.number().nullish(),
        registered: z.boolean().nullish(),
        payed: z.boolean().nullish(),
        payment: z.string().nullish()
      }),
    async resolve({ctx, input}){
      const payment = paymentTypes[input.payment as keyof typeof paymentTypes]

      const toBeUpdated = await ctx.prisma.ticketSell.findUnique({
        where: {
          id: input.id
        }
      })

      const updatedTicket = await ctx.prisma.ticketSell.update({
        where: {
          id: input.id
        },
        data: {
          name: input.name ?? toBeUpdated?.name,
          cpf: input.cpf ?? toBeUpdated?.cpf,
          phone: input.phone ?? toBeUpdated?.phone,
          ticketAmount: input.amount ?? toBeUpdated?.ticketAmount,
          registered: input.registered ?? false,
          payed: input.payed ?? false,
          payment,
        }
      })

      return updatedTicket
    }
  })
  .mutation("delete-ticket", {
    input: z
      .object({
        id: z.string()
      }),
    async resolve({ctx, input}){
      const deletedTicket = await ctx.prisma.ticketSell.delete({
        where: {
          id: input.id
        }
      })

      return deletedTicket
    }
  })
