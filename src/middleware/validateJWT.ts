import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

const validateJWT = (req: any, res: any, next: any) => {
  const authorizationHeader = req.get("authorization");

  if (!authorizationHeader) {
    return res.status(403).json({ error: "Authorization header was not provided" });
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: "Bearer token not found" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "fdfknfkgngnejrngkenrk", async (err: any, payload: any) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res.status(403).json({ error: "Invalid token" });
    }

    if (!payload) {
      return res.status(403).json({ error: "Invalid token payload" });
    }

    try {
      const user = await userModel.findOne({ email: payload.email });
      
      if (!user) {
        return res.status(403).json({ error: "User not found" });
      }
      
      req.user = user;
      next();
    } catch (error) {
      console.error("Database error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
};

export default validateJWT;