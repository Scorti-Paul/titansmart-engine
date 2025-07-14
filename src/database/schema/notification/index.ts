import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    type: {
      type: mongoose.SchemaTypes.String,
      required: [true, "Type is required"],
      enums: ["order", "promo", "system", "alert", "general"],
      default: "general",
    },
    message: {
      type: mongoose.SchemaTypes.String,
      required: [true, "Message is required"],
    },
    isRead: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      transform(_: any, data: any) {
        delete data.__v;
      },
    },
    timestamps: true,
  }
);
export const NotificationModel = mongoose.model(
  "Notification",
  NotificationSchema
);
