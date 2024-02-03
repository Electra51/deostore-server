import express from "express";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

import formidable from "express-formidable";
import {
  createPromoCodeController,
  deletePromocodeController,
  getPromocodeController,
  getSinglePromocodeController,
  promoCodeGetForUserController,
  promoCodeStatusController,
  promoCodeValidateController,
  updatePromoCodeStatusController,
  updatePromocodeController,
} from "../controllers/promoCodeController.js";
const router = express.Router();

//all routes
//product-create ; method POST
router.post(
  "/create-promocode",
  requireSignIn,
  isAdmin,
  formidable(),
  createPromoCodeController
);

//routes
router.put(
  "/update-promocode/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updatePromocodeController
);

//get products
router.get("/get-promocode", requireSignIn, isAdmin, getPromocodeController);

//single product
router.get(
  "/get-promocode/:pid",
  requireSignIn,
  isAdmin,
  getSinglePromocodeController
);

//delete rproduct
router.delete("/delete-product/:pid", deletePromocodeController);

router.put(
  "/update-promocode-status/:id",
  requireSignIn,
  isAdmin,
  promoCodeStatusController
);

//userpromo
router.get(
  "/get-promo-code-user",
  requireSignIn,

  promoCodeGetForUserController
);

router.post(
  "/apply-promo-code",
  requireSignIn,

  promoCodeValidateController
);
export default router;
