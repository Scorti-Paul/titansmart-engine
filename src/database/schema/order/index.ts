import {Schema, SchemaTypes, model} from "mongoose";

const OrderSchema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    orderNumber: {
      type: SchemaTypes.String,
      required: [true, "Order number is required"],
      unique: [true, "Order number must be unique"],
    },
    products: [
      {
        product: {
          type: SchemaTypes.ObjectId,
          ref: "Product",
          required: [true, "Product is required"],
          unique: true,
        },
        quantity: {
          type: SchemaTypes.Number,
          required: [true, "Quantity is required"],
        },
        unitPrice: {
          type: SchemaTypes.Number,
          required: [true, "Unit price is required"],
        },
      },
    ],
    shippingInfo: {
      shipping: {
        type: SchemaTypes.ObjectId,
        ref: "Shipping",
        required: [true, "Shipping information is required"],
      },
      deliveryCost: {
        type: SchemaTypes.Number,
        required: [true, "Delivery cost is required"],
      },
      trackingNumber: { type: SchemaTypes.String, required: [true, "Tracking number is required"] },
      carrier: { type: SchemaTypes.String, required: [true, "Carrier is required"] },
      estimatedDelivery: {
        type: SchemaTypes.Date,
      },
      deliveredAt: { type: SchemaTypes.Date, required: false },
      shippingStatus: {
        type: SchemaTypes.String,
        enums: ["pending", "shipped", "in-transit", "delivered", "cancelled"],
        default: "pending",
      },
    },
    status: {
      type: SchemaTypes.String,
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
      type: SchemaTypes.ObjectId,
      ref: "Payment",
      required: false,
    },
    totalAmount: {
      type: SchemaTypes.Number,
      required: [true, "Total amount is required"],
    },
    description: { type: SchemaTypes.String },
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

export const OrderModel = model("Order", OrderSchema);
