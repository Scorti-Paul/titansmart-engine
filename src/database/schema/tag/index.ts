import mongoose from "mongoose";

const TagSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      required: [true, "Tag name is required"],
      unique: [true, "Tag name must be unique"],
    },
    slug: {
      type: mongoose.SchemaTypes.String,
      required: [true, "Tag slug is required"],
      unique: [true, "Tag slug must be unique"],
    },
    description: {
      type: mongoose.SchemaTypes.String,
    },
    parentCategory: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
    },
    isActive: { type: mongoose.SchemaTypes.Boolean, default: true },
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
export const TagModel = mongoose.model("Tag", TagSchema);
