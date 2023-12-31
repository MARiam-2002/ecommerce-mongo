import { Router } from "express";
import * as Validators from "./auth.validation.js";
import { isValidation } from "../../middleware/validation.middleware.js";
import * as userController from "./controller/auth.js";
const router = Router();

router.post(
  "/register",
  isValidation(Validators.registerSchema),
  userController.register
);

router.get(
  "/confirmEmail/:activationCode",
  isValidation(Validators.activateSchema),
  userController.activationAccount
);

router.post("/login", isValidation(Validators.login), userController.login);

//send forget password

router.patch(
  "/forgetCode",
  isValidation(Validators.forgetCode),
  userController.sendForgetCode
);
router.patch(
  "/resetPassword",
  isValidation(Validators.resetPassword),
  userController.resetPasswordByCode
);
export default router;
