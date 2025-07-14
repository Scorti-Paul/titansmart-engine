import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: mongoose.SchemaTypes.String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: mongoose.SchemaTypes.String,
      required: [true, "Last name is required"],
    },
    email: {
      type: mongoose.SchemaTypes.String,
      required: [true, "Email is required"],
      unique: [true, "Email must be unique"],
    },
    phone: {
      type: mongoose.SchemaTypes.String,
      required: [true, "Phone number is required"],
    },
    password: {
      type: mongoose.SchemaTypes.String,
      required: [true, "Password is required"],
    },
    role: {
      type: mongoose.SchemaTypes.String,
      required: [true, "Role is required"],
      enums: ["customer", "admin"],
    },
    avatar: { type: mongoose.SchemaTypes.String, required: false, default: "" },
    notifications: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Notification",
      },
    ],
    isVerified: { type: mongoose.SchemaTypes.Boolean, default: false },
    status: {
      type: mongoose.SchemaTypes.String,
      enums: ["active", "inactive"],
      default: "active",
    },
    salt: { type: mongoose.SchemaTypes.String, required: true },
  },
  {
    toJSON: {
      transform(_: any, data: any) {
        delete data.password;
        delete data.salt;
        delete data.__v;
      },
    },
    timestamps: true,
  }
);
export const UserModel = mongoose.model("User", UserSchema);
