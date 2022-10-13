import { PAYMENT } from "@prisma/client"

export const paymentTypes = {
  mae: PAYMENT.MOM,
  pai: PAYMENT.DAD,
  gabriel: PAYMENT.GABRIEL,
}