import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    paymentType: {
      type: mongoose.SchemaTypes.String,
      required: [true, "Payment type is required"],
      enums: ["Customer order", "Vendor payout", "Refund"],
    },
    order: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Order",
      required: [true, "Order ID is required"],
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    amount: {
      type: mongoose.SchemaTypes.Number,
      required: [true, "Amount is required"],
    },
    amountPaid: {
      type: mongoose.SchemaTypes.Number,
      required: [true, "Amount paid is required"],
    },
    paymentStatus: {
      type: mongoose.SchemaTypes.String,
      required: [true, "Payment status is required"],
      enums: ["Part payment", "Completed", "Failed"],
      default: "Part payment",
    },
    paymentMethod: {
      type: mongoose.SchemaTypes.String,
      required: [true, "Payment method is required"],
      enum: ["Paystack", "Bank transfer", "Cash"],
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
