import mongoose from "mongoose";

const ShippingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    region: {
      type: mongoose.SchemaTypes.String,
      required: [true, "Region is required"],
    },
    address: {
      type: mongoose.SchemaTypes.String,
      required: [true, "Address is required"],
    },
    digitalAddress: {
      type: mongoose.SchemaTypes.String,
      required: [true, "Digital address is required"],
    },
    closestMark: {
      type: mongoose.SchemaTypes.String,
    },
    description: { type: mongoose.SchemaTypes.String },
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

export const ShippingModel = mongoose.model("Shipping", ShippingSchema);
