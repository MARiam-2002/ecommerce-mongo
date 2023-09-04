import multer, { diskStorage } from "multer";

export const filterObject = {
  image: ["image/png", "image/jpg"],
  pdf: ["application/pdf"],
  video: ["video/mp4"],
};
export const fileUpload = (filterArray) => {
  const fileFilter = (req, file, cb) => {
    console.log({file})
    if (!filterArray.includes(file.mimetype)) {
      return cb(new Error("invalid file formate"), false);
    }
    return cb(null, true);
  };

  return multer({ storage: diskStorage({}), fileFilter });
};
