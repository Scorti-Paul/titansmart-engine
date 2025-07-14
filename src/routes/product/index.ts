import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductById,
  updateProduct,
} from "../../controllers/product";
import { ProductModel } from "../../database/schema/product";

const express = require("express");

const router = express?.Router();

router.get("/api/products", (req: any, res: any) =>
  getProducts(ProductModel, req, res)
);

router.get("/api/product", (req: any, res: any) =>
  getProductById(ProductModel, req, res)
);

router.put("/api/product/:id", updateProduct);
router.post("/api/product/create", createProduct);
router.delete("/api/product/:id", deleteProduct);

const productRoutes = router;
export { productRoutes };
