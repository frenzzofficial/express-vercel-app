import { Router } from "express";
import { authGuard } from "./auth.guard";
import { logout, signin, signup } from "./auth.controller";

const authRoutes = Router();

authRoutes.get("/test", (_req, res) => {
  res.json({
    success: true,
    message: "Auth route is working",
    timestamp: new Date().toISOString(),
  });
});

authRoutes.get("/me", authGuard, (req, res) => {
  return res.status(200).json({
    success: true,

    user: req.user,
  });
});

authRoutes.post("/signup", signup);

authRoutes.post("/signin", signin);

authRoutes.post("/logout", logout);

export default authRoutes;
