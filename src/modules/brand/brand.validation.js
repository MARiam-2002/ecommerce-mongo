import joi from "joi";
import { isValidObjectId } from "../../middleware/validation.middleware.js";

export const createBrand = joi
  .object({
    name: joi.string().min(4).max(15).required(),
  })
  .required();

export const updateBrand = joi
  .object({
    name: joi.string().min(4).max(15),
    brandId: joi.string().custom(isValidObjectId).required(),
  })
  .required();

export const deleteBrand = joi
  .object({
    brandId: joi.string().custom(isValidObjectId).required(),
  })
  .required();
