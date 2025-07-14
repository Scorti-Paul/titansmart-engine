import {
  createPayment,
  deletePayment,
  getPayments,
  getPaymentById,
  updatePayment,
} from "../../controllers/payment";
import { PaymentModel } from "../../database/schema/payment";

const express = require("express");

const router = express?.Router();

router.get("/api/payments", (req: any, res: any) =>
  getPayments(PaymentModel, req, res)
);

router.get("/api/payment", (req: any, res: any) =>
  getPaymentById(PaymentModel, req, res)
);

router.put("/api/payment/:id", updatePayment);
router.post("/api/payment/create", createPayment);
router.delete("/api/payment/:id", deletePayment);

const paymentRoutes = router;
export { paymentRoutes };
