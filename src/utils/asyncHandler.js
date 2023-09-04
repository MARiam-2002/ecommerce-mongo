export const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => {
      return next(error);
    });
  };
};

export const globalErrorHandling = (error, req, res, next) => {
  return res.json({
    message: "G error",
    msgError: error.message,
    stack: error.stack,
  });
};
