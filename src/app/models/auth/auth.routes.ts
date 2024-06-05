import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router();

router.post("/login",authControllers.login)
router.get("/profile",authControllers.getProfile)
router.patch("/profile",authControllers.updateProfile)
router.patch("/change-password",authControllers.changePassword)


const authRoutes = router;

export default authRoutes;