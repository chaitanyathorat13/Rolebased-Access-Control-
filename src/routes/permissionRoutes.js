import express from "express";
import {
  addPermission,
  getPermissions,
} from "../controllers/permissionController.js";
import { authorize } from "../middlewares/authorize.js";

const router = express.Router();

// Only Admins should have access to these routes
router.post("/add", authorize(["manage_permissions"]),addPermission);
router.get("/", authorize(["view_permissions"]), getPermissions);

export default router;

// authorize(["manage_permissions"]),