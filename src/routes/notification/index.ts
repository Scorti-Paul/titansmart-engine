import {
  createNotification,
  deleteNotification,
  getNotifications,
  getNotificationById,
  updateNotification,
} from "../../controllers/notification";
import { NotificationModel } from "../../database/schema/notification";

const express = require("express");

const router = express?.Router();

router.get("/api/notifications", (req: any, res: any) =>
  getNotifications(NotificationModel, req, res)
);

router.get("/api/notification", (req: any, res: any) =>
  getNotificationById(NotificationModel, req, res)
);

router.put("/api/notification/:id", updateNotification);
router.post("/api/notification/create", createNotification);
router.delete("/api/notification/:id", deleteNotification);

const notificationRoutes = router;
export { notificationRoutes };
