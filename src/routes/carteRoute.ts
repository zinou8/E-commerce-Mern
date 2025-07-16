import express from "express";
import { getActiveCardForUser } from "../services/carteService";
import validateJWT from "../middleware/validateJWT";

const router = express.Router();

router.get("/", validateJWT, async (req: any, res: any) => {
  try {
    // The validateJWT middleware ensures req.user exists
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    
    const userId = req.user._id;
    const cart = await getActiveCardForUser({ userId });
    
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router; 