import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    paymentType: {
      type: mongoose.SchemaTypes.String,
      required: [true, "Payment type is required"],
      enums: ["customer_order", "vendor_payout", "refund"],
    },
    orderID: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Order",
      required: [true, "Order ID is required"],
    },
    userID: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    amount: {
      type: mongoose.SchemaTypes.Number,
      required: [true, "Amount is required"],
    },
    paymentStatus: {
      type: mongoose.SchemaTypes.String,
      required: [true, "Payment status is required"],
      enums: ["part_payment", "completed", "failed"],
      default: "part_payment",
    },
    paymentMethod: {
      type: mongoose.SchemaTypes.String,
      required: [true, "Payment method is required"],
      enum: ["pay_stack", "bank_transfer", "cash"],
    },
    transactionID: {
      type: mongoose.SchemaTypes.String,
      required: [true, "Transaction ID is required"],
    },
    remark: { type: mongoose.SchemaTypes.String },
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

export const PaymentModel = mongoose.model("Payment", PaymentSchema);
