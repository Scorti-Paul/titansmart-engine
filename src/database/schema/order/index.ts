import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    orderNumber: {
      type: mongoose.SchemaTypes.String,
      required: [true, "Order number is required"],
      unique: [true, "Order number must be unique"],
    },
    products: [
      {
        productID: {
          type: mongoose.SchemaTypes.String,
          required: [true, "Product ID is required"],
          unique: true,
        },
        quantity: {
          type: mongoose.SchemaTypes.Number,
          required: [true, "Quantity is required"],
        },
        unitPrice: {
          type: mongoose.SchemaTypes.Number,
          required: [true, "Unit price is required"],
        },
      },
    ],
    shippingInfo: {
      shipping: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Shipping",
        required: [true, "Shipping information is required"],
      },
      deliveryCost: {
        type: mongoose.SchemaTypes.Number,
        required: [true, "Delivery cost is required"],
      },
      trackingNumber: { type: mongoose.SchemaTypes.String, required: [true, "Tracking number is required"] },
      carrier: { type: mongoose.SchemaTypes.String, required: [true, "Carrier is required"] },
      estimatedDelivery: {
        type: mongoose.SchemaTypes.Date,
      },
      deliveredAt: { type: mongoose.SchemaTypes.Date, required: false },
      shippingStatus: {
        type: mongoose.SchemaTypes.String,
        enums: ["pending", "shipped", "in-transit", "delivered", "cancelled"],
        default: "pending",
      },
    },
    status: {
      type: mongoose.SchemaTypes.String,
      required: [true, "Order status is required"],
      enums: [
        "pending",
        "processing",
        "approved",
        "shipped",
        "cancelled",
        "delivered",
      ],
    },
    paymentID: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Payment",
      required: false,
    },
    totalAmount: {
      type: mongoose.SchemaTypes.Number,
      required: [true, "Total amount is required"],
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

export const OrderModel = mongoose.model("Order", OrderSchema);
