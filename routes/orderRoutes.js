import express from "express";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  OrderPlaceController,
  getAllOrdersController,
  getOrdersController,
} from "../controllers/orderController.js";

const router = express.Router();

//order payments
router.post("/order-place", requireSignIn, OrderPlaceController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

export default router;
