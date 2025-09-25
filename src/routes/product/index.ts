import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductById,
  updateProduct,
  searchProducts
} from "../../controllers/product";

const express = require("express");
const router = express?.Router();

router.get("/api/products", getProducts);
router.get("/api/product/:id", getProductById);
router.get("/api/product/search/:key", searchProducts);
router.put("/api/product", updateProduct);
router.post("/api/product/create", createProduct);
router.delete("/api/product/:id", deleteProduct);

const productRoutes = router;
export { productRoutes };
