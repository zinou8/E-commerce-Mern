import dotenv from "dotenv"

import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import carteRoute from "./routes/carteRoute"
import { seedInitialProducts } from "./services/productService";
import cors from "cors"

dotenv.config()

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors())

// Connect to MongoDB first, then register routes
mongoose
  .connect(process.env.DATABASE_URL || '') 
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
    app.use("/cart", carteRoute)
    
    // Start server after everything is set up
    app.listen(port, () => {
      console.log(`Server is running at: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB!", err);
    process.exit(1);
  });