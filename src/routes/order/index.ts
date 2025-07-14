import {
  createOrder,
  // deleteOrder,
  // getOrders,
  // getOrderById,
  updateOrder,
  // patchOrder,
} from "../../controllers/order";
// import { OrderModel } from "../../database/schema/order";

const express = require("express");

const router = express?.Router();

// router.get("/api/orders", (req: any, res: any) =>
//   getOrders(OrderModel, req, res)
// );

// router.get("/api/order", (req: any, res: any) =>
//   getOrderById(OrderModel, req, res)
// );

router.put("/api/order/:id", updateOrder);
router.post("/api/order/create", createOrder);
// router.delete("/api/order/:id", deleteOrder);

const orderRoutes = router;
export { orderRoutes };
