import express from "express";
import {
  addItemToCart,
  getActiveCartForUser,
  updateItemInCart,
  deleteItemIncart,
  clearCart,
  checkout,
} from "../services/carteService";
import validateJWT from "../middleware/validateJWT";

const router = express.Router();

router.get("/", validateJWT, async (req: any, res: any) => {
  try {
    // The validateJWT middleware ensures req.user exists
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const userId = req.user._id;
    const cart = await getActiveCartForUser({ userId, populateProduct: true });

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/", validateJWT, async (req: any, res: any) => {
  const userId = req?.user?._id;
  const response = await clearCart({ userId });
  res.status(response.statusCode).send(response.data);
});

router.post("/items", validateJWT, async (req: any, res: any) => {
  const userId = req?.user?._id;
  const { productId, quantity } = req.body;
  const response = await addItemToCart({ userId, productId, quantity });
  res.status(response.statusCode).send(response.data);
});

router.put("/items", validateJWT, async (req: any, res: any) => {
  const userId = req?.user?._id;
  const { productId, quantity } = req.body;
  const response = await updateItemInCart({ userId, productId, quantity });
  res.status(response.statusCode).send(response.data);
});

router.delete("/items/:productId", validateJWT, async (req: any, res: any) => {
  const userId = req?.user?._id;
  const { productId } = req.params;
  const response = await deleteItemIncart({ userId, productId });
  res.status(response.statusCode).send(response.data);
});

router.post("/checkout", validateJWT, async (req: any, res: any) => {
  const userId = req?.user?._id;
  const { address } = req.body;
  const response = await checkout({ userId, address });
  res.status(response.statusCode).send(response.data);
});

export default router;
