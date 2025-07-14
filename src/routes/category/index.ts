import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../../controllers/category";
import { CategoryModel } from "../../database/schema/category";

const express = require("express");

const router = express?.Router();

router.get("/api/categories", (req: any, res: any) =>
  getCategories(CategoryModel, req, res)
);

router.get("/api/category", (req: any, res: any) =>
  getCategoryById(CategoryModel, req, res)
);

router.put("/api/category/:id", updateCategory);
router.post("/api/category/create", createCategory);
router.delete("/api/category/:id", deleteCategory);

const categoryRoutes = router;
export { categoryRoutes };
