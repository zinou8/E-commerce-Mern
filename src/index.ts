import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import { seedInitialProducts } from "./services/productService";

const app = express();
const port = 3001;

app.use(express.json());

// Connect to MongoDB first, then register routes
mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(async () => {
    console.log("Mongo connected");
    
    // Seed initial products after connection
    try {
      await seedInitialProducts();
      console.log("Initial products seeded");
    } catch (error) {
      console.log("Error seeding products:", error);
    }
    
    // Register routes after successful DB connection
    app.use("/user", userRoute);
    app.use("/product", productRoute);
    
    // Start server after everything is set up
    app.listen(port, () => {
      console.log(`Server is running at: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB!", err);
    process.exit(1);
  });