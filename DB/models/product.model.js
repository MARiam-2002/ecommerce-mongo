import mongoose, { Schema, Types, model } from "mongoose";

const productSchema = new Schema(
  {
    reviews: [{ id: { type: Types.ObjectId, ref: "Review" } }],
    name: {
      type: String,
      min: 2,
      max: 20,
      required: true,
    },
    description: String,
    image: [
      {
        url: { type: String, required: true },
        id: { type: String, required: true },
      },
    ],
    defaultImage: {
      url: { type: String, required: true },
      id: { type: String, required: true },
    },
    availableItems: {
      type: Number,
      min: 1,
      required: true,
    },
    soldItems: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      min: 1,
      required: true,
    },
    discount: {
      type: Number,
      min: 1,
      max: 100,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
    brand: {
      type: Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    cloudFolder: { type: String, unique: true },
  },
  { timestamps: true, strictQuery: true, toJSON: { virtuals: true } }
);

productSchema.virtual("finalPrice").get(function () {
  if (this.price) {
    return Number.parseFloat(
      this.price - (this.price * this.discount || 0) / 100
    ).toFixed(2);
  }
});

productSchema.query.pagination = function (page) {
  page = !page || page < 1 || isNaN(page) ? 1 : page;
  const limit = 2;
  const skip = limit * (page - 1);
  return this.skip(skip).limit(limit);
};
productSchema.query.customSelect = function (fields) {
  if (!fields) return this;
  const modelKeys = Object.keys(productModel.schema.paths);
  const queryKeys = fields.split(" ");
  const matchKeys = queryKeys.filter((key) => modelKeys.includes(key));
  return this.select(matchKeys);
};

productSchema.methods.inStock = function (requiredQuantity) {
  return this.availableItems >= requiredQuantity ? true : false;
};

const productModel =
  mongoose.models.productModel || model("Product", productSchema);
export default productModel;
