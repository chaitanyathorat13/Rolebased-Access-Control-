import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { restrictTo } from "../middlewares/restrictTo.js";
import { transactionController } from "../controllers/index.js";
import { authorize } from "../middlewares/authorize.js";

const router = express.Router();

router.use(isAuthenticated);
// router.use(restrictTo("ADMIN"));

router.post("/borrowBook",authorize(["issue_books"]),transactionController.borrowBook);
router.post("/returnBook",authorize(["return_books"]),transactionController.returnBook);

export default router;
