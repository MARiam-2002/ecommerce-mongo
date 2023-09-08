import productModel from "../../../../DB/models/product.model.js";
import reviewModel from "../../../../DB/models/review.model.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";

export const addReview = asyncHandler(async (req, res, next) => {
  const { content, productId } = req.body;

  const review = await reviewModel.create({
    user: req.user._id,
    content,
  });

  if (!(await productModel.findById(productId)))
    return next(new Error("product not found!"));

  const product = await productModel.findByIdAndUpdate(productId, {
    $push: { reviews: { id: review._id } },
  });

  return res.json({ success: true, message: "review added successfully!" });
});
