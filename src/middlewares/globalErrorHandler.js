import AppError from "../utils/appError.js";

const globalErrorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      type: "ValidationError",
      details: error.errors,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: error.success,
      message: error.message,
      errors: error.errors, 
    });
  }

  console.error(error);
  return res.status(500).json({
    success: false,
    message: "Something went wrong...",
    errors: [error.message],
  });
};

export default globalErrorHandler;

