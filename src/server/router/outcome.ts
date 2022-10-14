import { createRouter } from "./context";
import { z } from "zod";

import { paymentTypes } from "../common/payment";

export const outcomeRouter = createRouter()
  .query("get-all-outcomes", {
    async resolve({ ctx }) {
      return await ctx.prisma.outcome.findMany();
    }
  })
  .query("get-one-outcome", {
    input: z.object({
      id: z.string()
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.outcome.findUnique({
        where: {
          id: input.id
        }
      });
    }
  })
  .mutation("create-outcome", {
    input: z.object({
      description: z.string(),
      cost: z.number(),
      payment: z.string()
    }),
    async resolve({ ctx, input }) {
      const payment = paymentTypes[input.payment as keyof typeof paymentTypes];

      const createdOutcome = await ctx.prisma.outcome.create({
        data: {
          description: input.description,
          cost: input.cost,
          payment
        }
      });

      return createdOutcome;
    }
  })
  .mutation("update-outcome", {
    input: z.object({
      id: z.string(),
      description: z.string().nullish(),
      cost: z.number().nullish(),
      payment: z.string().nullish()
    }),
    async resolve({ ctx, input }) {
      
      const toBeUpdated = await ctx.prisma.outcome.findUnique({ where: { id: input.id }});
      
      const description = input.description ?? toBeUpdated?.description;
      const cost = input.cost ?? toBeUpdated?.cost;
      const payment = paymentTypes[input.payment as keyof typeof paymentTypes] ?? toBeUpdated?.payment;

      const updatedOutcome = await ctx.prisma.outcome.update({
        where: {
          id: input.id
        },
        data: {
          description,
          cost,
          payment
        }
      });

      return updatedOutcome;
    }
  })
  .mutation("delete-outcome", {
    input: z.object({
      id: z.string()
    }),
    async resolve({ ctx, input }) {
      const deletedOutcome = await ctx.prisma.outcome.delete({
        where: {
          id: input.id
        }
      });

      return deletedOutcome;
    }
  });