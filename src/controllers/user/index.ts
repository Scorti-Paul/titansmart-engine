import { verify } from "jsonwebtoken";
import { UserModel } from "../../database/schema/user";
import {
  generatePassword,
  generateSalt,
  generateSignature,
  handleErrors,
  // sendMail,
} from "../../utils";
import mongoose from "mongoose";
// import { verifyEmail } from "../../utils/templates/htmls";

const createUser = async (req: any, res: any) => {
  try {
    const { firstName, lastName, avatar, email, password, role, phone } =
      req.body;

    const salt = generateSalt();
    const hashedPassword = generatePassword(password, salt);
    const user = new UserModel({
      email,
      password: hashedPassword,
      salt,
      role,
      firstName,
      lastName,
      phone,
      avatar,
    });
    user.save();

    res.status(200).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: "There was an error creating this user",
      error: handleErrors(error),
    });
  }
};

const signIn = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }
    const hashedPassword = generatePassword(password, user.salt as string);
    if (hashedPassword !== user.password) {
      throw new Error("Password is incorrect");
    }
    const token = generateSignature({
      id: user._id,
      avatar: user.avatar,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      isVerified: user.isVerified,
      phone: user.phone,
    });
    res.status(200).json({
      token,
      message: "Login success",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const updateUser = async (req: any, res: any) => {
  if (!req.body) {
    return res.status(400).json({ message: "Data to update cannot be empty" });
  }

  const { id, ...rest } = req.body;

  if (!id) {
    return res.status(400).json({ message: "id is required to update this data" });
  }

  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      rest,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "No user found with this id" });
    }

    return res.status(202).json({
      data: updatedUser,
      message: "User updated Successfully",
    });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({
      message: "There was an error updating user",
      error: error.message,
    });
  }
};

const getUsers = async (model: any, _: any, res: any) => {
  await model
    ?.find({})
    ?.populate("notifications")
    ?.select("-password -salt -__v")
    ?.then((data: any) => {
      res?.status(200)?.json({
        data,
      });
    });
};

const verifyToken = (req: any, res: any, next: any) => {
  const authorization = req.headers.authorization?.split(" ");
  const scheme = authorization?.[0].toLowerCase();
  const token = authorization?.[1];

  if (!scheme || scheme !== "bearer") {
    res.status(403).json({
      message: "Unauthorized, Invalid scheme",
    });
    throw new Error("Unauthorized, Invalid scheme");
  }

  if (!token) {
    res.status(403).json({
      message: "Unauthorized, No token provided!",
    });
    throw new Error("Unauthorized, No token provided!");
  }

  //
  verify(token, process.env.SECRET_KEY as string, (err: any, decoded: any) => {
    if (err) {
      res.status(401).json({
        message: "Unauthorized!, Invalid token",
      });
      throw new Error("Unauthorized!, Invalid token");
    }
    req.user = decoded;
    next();
  });
};

const confirmEmail = async (req: any, res: any) => {
  try {
    const { token } = req.params;
    const { email } = verify(token, process.env.APP_SECRET as string) as any;
    await UserModel.findOneAndUpdate({ email }, { verified: true });
    res?.redirect(`${process.env.APP_BACKOFFICE_URL}/login`);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export { createUser, signIn, verifyToken, confirmEmail, updateUser, getUsers };
