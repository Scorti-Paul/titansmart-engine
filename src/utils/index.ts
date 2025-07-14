import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const handleErrors = (errors: any) => {
  return Object?.values(errors)?.[0];
};

const generateSignature = (payload: any) => {
  return jwt.sign(payload, process.env.SECRET_KEY as string, {expiresIn: "30d"});
};

const generateSalt = () => {
  return bcrypt.genSaltSync();
};

const generatePassword = (password: string, salt: string) => {
  return bcrypt.hashSync(password, salt);
};

export { generateSignature, generateSalt, generatePassword, handleErrors };