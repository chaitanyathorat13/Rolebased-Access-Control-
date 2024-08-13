import { Router } from "express";
import authRoutes from "./authRoutes.js";
import bookRoutes from "./bookRoutes.js";
import transactionRoutes from "./transactionRoutes.js";
import userRoutes from "./userRoutes.js";
import permissionRoutes from "./permissionRoutes.js";
import roleRoutes from "./roleRoutes.js"

const router = Router();

router.use("/auth", authRoutes);
router.use("/books", bookRoutes);
router.use("/transactions", transactionRoutes);
router.use("/users", userRoutes);
router.use("/permissions", permissionRoutes);
router.use("/roles" ,  roleRoutes)
export default router;
