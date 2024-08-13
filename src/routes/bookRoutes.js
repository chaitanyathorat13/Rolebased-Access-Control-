import express from "express";
import { restrictTo } from "../middlewares/restrictTo.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import {
  addNewBookController,
  deleteBookController,
} from "../controllers/bookController.js";
import { bookController } from "../controllers/index.js";
import { authorize } from "../middlewares/authorize.js";

const router = express.Router();

router.get("/getBookById/:bookId", bookController.getBookById);
router.get("/getAllBooks", bookController.getAllBooks);

router.use(isAuthenticated);
router.post("/addNewBook", authorize(["manage_books"]), addNewBookController);
router.post("/deleteBook", authorize(["manage_books"]), deleteBookController);

export default router;
