import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router();

router.post("/login",authControllers.login)
router.get("/profile",authControllers.getProfile)
router.put("/profile",authControllers.updateProfile)
const authRoutes = router;

export default authRoutes;