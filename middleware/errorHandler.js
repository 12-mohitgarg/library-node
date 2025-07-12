import mongoose from "mongoose";
import  ApiError from "../handlers/apiErrorHandler.js";

// const errorHandler = (err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.statusCode || 500).json({
//     success: false,
//     message: err.message || "Internal Server Error",
//   });
// };

const errorHandler = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || error instanceof mongoose.Error ? 400 : 500

    const message = error.message || "Something went wrong"
    error = new ApiError(statusCode, message, error?.errors || [], err.stack)
  }

  const response = {
    ...error, message: error.message,
    ...("development" === "development" ? { stack: error.stack } : {})
  }

  return res.status(error.statusCode).json(response)
}


export default errorHandler;
