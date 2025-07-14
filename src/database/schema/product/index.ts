import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    productName: { type: mongoose.SchemaTypes.String, required: true },
    categoryID: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
      required: true,
    },
    sku: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    tags: [{ type: mongoose.SchemaTypes.String, required: true }],
    amount: {
      type: mongoose.SchemaTypes.Number,
      required: true,
    },
    productView: { type: mongoose.SchemaTypes.Number, default: 0 },
    images: [
      { type: mongoose.SchemaTypes.String, required: true, default: "" },
    ],
    colorVariants: [
      {
        type: mongoose.SchemaTypes.String,
      },
    ],
    stock: {
      currentStock: { type: mongoose.SchemaTypes.Number, required: true },
      threshold: {
        type: mongoose.SchemaTypes.Number,
        required: true,
      },
      stockStatus: {
        type: mongoose.SchemaTypes.String,
        required: true,
        enums: ["in-stock", "out-of-stock", "pre-order"],
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
