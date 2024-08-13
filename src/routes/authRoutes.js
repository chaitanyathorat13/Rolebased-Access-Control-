import { Router } from "express";
import { authController } from "../controllers/index.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { restrictTo } from "../middlewares/restrictTo.js";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", isAuthenticated, authController.logout);

export default router;
