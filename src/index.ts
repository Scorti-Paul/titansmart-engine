import bodyParser from "body-parser";
import { connectDB } from "./database";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

import { categoryRoutes } from "./routes/category";
import { tagRoutes } from "./routes/tag";
import { userRoutes } from "./routes/user";
import { productRoutes } from "./routes/product";
import { shippingRoutes } from "./routes/shipping";
import { orderRoutes } from "./routes/order";
import { paymentRoutes } from "./routes/payment";
import { notificationRoutes } from "./routes/notification";

const app = express();
const PORT = process.env.PORT || 3500;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("tiny"));
app.use(cors());

//routes
app.get("/api", (_: any, res: any) => {
  res.send("Welcome");
});

app.use(categoryRoutes);
app.use(tagRoutes);
app.use(userRoutes);
app.use(productRoutes);
app.use(shippingRoutes);
app.use(orderRoutes);
app.use(paymentRoutes);
app.use(notificationRoutes);

app.listen(PORT, () => {
  console.log(`...server running on port ${PORT}`);
});

const main = () => {
  connectDB();
};

main();