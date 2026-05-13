import { Router } from "express";

import { logout, signin, signup } from "./auth.controller";

const authRoutes = Router();

authRoutes.post("/signup", signup);

authRoutes.post("/signin", signin);

authRoutes.post("/logout", logout);

export default authRoutes;
