import express, { request } from "express";
import { getMyorders, login, register } from "../services/userService";
import validateJWT from "../middleware/validateJWT";

const router = express.Router();

router.post("/register", async (request, response) => {
  const { firstName, lastName, email, password } = request.body;
  const { statusCode, data } = await register({
    firstName,
    lastName,
    email,
    password,
  });
  response.status(statusCode).json(data);
});

router.post("/login", async (request, response) => {
  const { email, password } = request.body;
  const { statusCode, data } = await login({ email, password });
  response.status(statusCode).json(data);
});

router.get("/my-orders", validateJWT, async (req: any, res: any) => {
  try {
    // The validateJWT middleware ensures req.user exists
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const userId = req.user._id;
    const {statusCode , data} = await getMyorders({ userId });

    res.status(statusCode).json(data);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
