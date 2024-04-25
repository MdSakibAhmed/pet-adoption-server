import { Router } from "express";
import { userControllers } from "./user.controller";

const router = Router();

router.post('/register',userControllers.register)



const userRoutes = router;
export default userRoutes;