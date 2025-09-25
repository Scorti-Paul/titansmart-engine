import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    productName: { type: mongoose.SchemaTypes.String, required: true },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
      required: true,
    },
    sku: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    tags: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Tag", required: true }],
    amount: {
      type: mongoose.SchemaTypes.Number,
      required: true,
    },
    productView: { type: mongoose.SchemaTypes.Number, default: 0 },
    images: [
      { type: mongoose.SchemaTypes.String, required: [true, "Image is required"], default: "" },
    ],
    colorVariants: [
      {
        type: mongoose.SchemaTypes.String,
      },
    ],
    stock: {
      currentStock: { type: mongoose.SchemaTypes.Number, required: [true, "Current stock is required"] },
      threshold: {
        type: mongoose.SchemaTypes.Number,
        required: [true, "Threshold is required"],
      },
      stockStatus: {
        type: mongoose.SchemaTypes.String,
        required: [true, "Stock status is required"],
        enum: ["in-stock", "out-of-stock", "pre-order"],
        default: "in-stock",
      },
    },
    description: { type: mongoose.SchemaTypes.String },
    status: {
      type: mongoose.SchemaTypes.String,
      enums: ["active", "draft", "archived"],
      default: "active",
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
export const ProductModel = mongoose.model("Product", ProductSchema);
