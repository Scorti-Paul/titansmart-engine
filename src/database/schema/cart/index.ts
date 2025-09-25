import { model, Schema, SchemaTypes } from "mongoose";

const CartSchema = new Schema(
  {
    user: { type: SchemaTypes.ObjectId, Ref: "User" },
    products: [
      {
        cartItem: {
          type: SchemaTypes.ObjectId,
          Ref: "Product",
        },
        quantity: { type: SchemaTypes.Number, default: 1 },
      },
    ],
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

export const CartModel = model("Cart", CartSchema);
