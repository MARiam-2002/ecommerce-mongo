import { Router } from "express";
import * as brandController from "./controller/brand.js";
import { isValidation } from "../../middleware/validation.middleware.js";
import * as validators from "./brand.validation.js";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";

import { fileUpload, filterObject } from "../../utils/multer.js";

const router = Router();

router.post(
  "/createBrand",
  isAuthenticated,
  isAuthorized("admin"),
  fileUpload(filterObject.image).single("brand"),
  isValidation(validators.createBrand),
  brandController.createBrand
);

router.patch(
  "/update/:brandId",
  isAuthenticated,
  isAuthorized("admin"),
  fileUpload(filterObject.image).single("brand"),
  isValidation(validators.updateBrand),
  brandController.updateBrand
);

router.delete(
  "/delete/:brandId",
  isAuthenticated,
  isAuthorized("admin"),
  isValidation(validators.deleteBrand),
  brandController.deleteBrand
);

router.get("/getAllBrand", brandController.getAllBrand);

export default router;
