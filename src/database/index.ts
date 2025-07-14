import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`...db connected successfully`);
  } catch (error) {
    console.log(`There was an error connecting to database ${error}`);
  }
};

export { connectDB };