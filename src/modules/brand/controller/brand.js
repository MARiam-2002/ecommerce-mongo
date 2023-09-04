import slugify from "slugify";
import brandModel from "../../../../DB/models/brand.model.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import cloudinary from "../../../utils/cloud.js";
export const createBrand = async (req, res, next) => {
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: `${process.env.FOLDER_CLOUDINARY}/brand`,
    }
  );

  const brand = await brandModel.create({
    name: req.body.name,
    createdBy: req.user._id,
    image: {
      id: public_id,
      url: secure_url,
    },
    slug: slugify(req.body.name),
  });

  return res.status(201).json({ success: true, results: brand });
};

export const updateBrand = asyncHandler(async (req, res, next) => {
  const brand = await brandModel.findById(req.params.brandId);
  if (!brand) {
    return next(new Error("brand not found!"));
  }
  if (req.user._id.toString() !== brand.createdBy.toString()) {
    return next(new Error("You not authorized!"));
  }
  brand.name = req.body.name ? req.body.name : brand.name;
  brand.slug = req.body.name ? slugify(req.body.name) : brand.slug;

  if (req.file) {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file.path,
      {
        public_id: brand.image.id,
      }
    );
    brand.image.url = secure_url;
  }

  await brand.save();
  return res.json({ success: true, message: "brand updated successfully!" });
});

export const deleteBrand = asyncHandler(async (req, res, next) => {
  const brand = await brandModel.findById(req.params.brandId);
  if (!brand) {
    return next(new Error("invalid brandId!"));
  }
  if (req.user._id.toString() !== brand.createdBy.toString()) {
    return next(new Error("You not authorized!"));
  }
  const result = await cloudinary.uploader.destroy(brand.image.id);
  console.log(result);
  await brandModel.findByIdAndDelete(req.params.brandId);
  return res.json({ success: true, message: "brand delete" });
});

export const getAllBrand = asyncHandler(async (req, res, next) => {
  const brands = await brandModel.find();
  return res.json({ success: true, results: brands });
});
