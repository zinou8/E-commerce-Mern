import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import { seedInitialProducts } from "./services/productService";

const app = express();
const port = 3001;

app.use(express.json());

// Register routes first

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(async () => {
    console.log("Mongo connected");
  })
  .catch((err) => console.log("Failed to connect!", err));

seedInitialProducts()
app.use("/user", userRoute);
app.use("/product", productRoute);

app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});
