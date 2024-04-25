


import { ErrorRequestHandler } from "express";

import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";
import { TErrorResponse } from "../../interface/error";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const errorResponse: TErrorResponse = {
    success: false,
    message: err.message || "something went wrong",
    errorDetails: err || null,
  };
  if (err instanceof ZodError) {
    errorResponse.message = err.issues
    .map((issue) => issue.message)
    .join(". ");
    errorResponse.errorDetails = err;
  
  }  else if (
    err instanceof JsonWebTokenError ||
    err.message == "Unauthorized Access"
  ) {
    errorResponse.message = "Unauthorized Access";
    errorResponse.errorDetails = err;

  }

  res.status(400).json(errorResponse);
};

export default globalErrorHandler;
