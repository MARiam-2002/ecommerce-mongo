import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import * as productController from "../product/controller/product.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { fileUpload, filterObject } from "../../utils/multer.js";
import * as validators from "./product.validation.js";
import { isValidation } from "../../middleware/validation.middleware.js";
const router = Router({ mergeParams: true });

router.post(
  "/createProduct",
  isAuthenticated,
  isAuthorized("admin"),
  fileUpload(filterObject.image).fields([
    { name: "subImages", maxCount: 3 },
    { name: "defaultImage", maxCount: 1 },
  ]),
  isValidation(validators.createProduct),
  productController.createProduct
);
router.delete(
  "/deleteProduct/:productId",
  isAuthenticated,
  isAuthorized("admin"),
  isValidation(validators.productId),
  productController.deleteProduct
);

router.get("/", productController.getallProduct);
router.get(
  "/single/:productId",
  isValidation(validators.productId),
  productController.getProduct
);

export default router;
