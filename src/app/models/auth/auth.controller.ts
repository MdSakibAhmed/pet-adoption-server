import { RequestHandler } from "express";
import { authServices } from "./auth.service";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";

const login = catchAsync( async (req, res, next) => {
  const result = await authServices.loginFromDB(req.body);

  res.send({
    success: true,
    statusCode: httpStatus.OK,
    message: "user logged in  successfully",
    data: result,
  });
});

const getProfile = catchAsync( async (req, res, next) => {
  const token = req.headers.authorization as string;
  const result = await authServices.getProfileFromDB(token);

  res.send({
    success: true,
    statusCode: httpStatus.OK,
    message: "user profile retrieved  successfully",
    data: result,
  });
});

const updateProfile = catchAsync( async (req, res, next) => {
  const token = req.headers.authorization as string;
  console.log("token", token);
  const body = req.body;

  const result = await authServices.updateProfileFromDB(token, body);

  res.send({
    success: true,
    statusCode: httpStatus.OK,
    message: "user profile updated  successfully",
    data: result,
  });
});

const changePassword = catchAsync( async (req, res, next) => {
  const token = req.headers.authorization as string;
  // console.log("token", token);
  const body = req.body;

  const result = await authServices.changePasswordFromDB(token, body);

  res.send({
    success: true,
    statusCode: httpStatus.OK,
    message: "password changed  successfully",
    data: null,
  });
});


export const authControllers = {
  login,
  getProfile,
  updateProfile,
  changePassword
};
