import {
  createShipping,
  deleteShipping,
  getShippings,
  getShippingById,
  updateShipping,
} from "../../controllers/shipping";
import { ShippingModel } from "../../database/schema/shipping";

const express = require("express");

const router = express?.Router();

router.get("/api/shippings", (req: any, res: any) =>
  getShippings(ShippingModel, req, res)
);

router.get("/api/shipping", (req: any, res: any) =>
  getShippingById(ShippingModel, req, res)
);

router.put("/api/shipping/:id", updateShipping);
router.post("/api/shipping/create", createShipping);
router.delete("/api/shipping/:id", deleteShipping);

const shippingRoutes = router;
export { shippingRoutes };
