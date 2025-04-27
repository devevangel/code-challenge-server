import express from "express";
import * as ctrl from "../controllers/product.controller.js";

const router = express.Router();

router.route("/").get(ctrl.listProducts).post(ctrl.addProduct);

router
  .route("/:id")
  .get(ctrl.getProduct)
  .put(ctrl.updateProduct)
  .delete(ctrl.deleteProduct);

export default router;
