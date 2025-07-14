import {
  createTag,
  deleteTag,
  getTags,
  getTagById,
  updateTag,
} from "../../controllers/tag";
import { TagModel } from "../../database/schema/tag";

const express = require("express");

const router = express?.Router();

router.get("/api/tags", (req: any, res: any) =>
  getTags(TagModel, req, res)
);

router.get("/api/tag", (req: any, res: any) =>
  getTagById(TagModel, req, res)
);

router.put("/api/tag/:id", updateTag);
router.post("/api/tag/create", createTag);
router.delete("/api/tag/:id", deleteTag);

const tagRoutes = router;
export { tagRoutes };