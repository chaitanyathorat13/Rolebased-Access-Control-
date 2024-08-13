import { Router } from "express";
import { roleController, userController } from "../controllers/index.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { restrictTo } from "../middlewares/restrictTo.js";
import { authorize } from "../middlewares/authorize.js";
const router = Router();

router.use(isAuthenticated);

router.get(
  "/getUserDetails",
  userController.getUserDetails
);

router.get(
  "/getUserById/:userId",
  userController.getUserById
);

router.get(
  "/getProfile",
  userController.getUserDetails
);

router.get(
  "/getAllUser",
  authorize(["get_all_users"]),
  userController.getAllUser
);

router.post("/createRole", authorize("create_role"), roleController.createRole);

export default router;
