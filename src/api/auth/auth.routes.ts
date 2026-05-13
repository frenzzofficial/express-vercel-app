import { Router } from "express";

// import {  signup } from "./auth.controller";

const authRoutes = Router();

authRoutes.get("/test", (_req, res) => {
  res.json({
    success: true,
    message: "Auth route is working",
    timestamp: new Date().toISOString(),
  });
});

// authRoutes.post("/signup", signup);

// authRoutes.post("/signin", signin);

// authRoutes.post("/logout", logout);

export default authRoutes;
