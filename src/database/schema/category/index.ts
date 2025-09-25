import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      required: [true, "Category name is required"],
      unique: [true, "Category name must be unique"],
    },
    slug: {
      type: mongoose.SchemaTypes.String,
      required: [true, "Category slug is required"],
      unique: [true, "Category slug must be unique"],
    },
    description: {
      type: mongoose.SchemaTypes.String,
    },
    isActive: { type: mongoose.SchemaTypes.Boolean, default: true }
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

export const CategoryModel = mongoose.model("Category", CategorySchema);