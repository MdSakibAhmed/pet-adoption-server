import { RequestHandler } from "express";
import { authServices } from "./auth.service";
import httpStatus from "http-status";

const login: RequestHandler = async (req, res, next) => {
  const result = await authServices.loginFromDB(req.body);

  res.send({
    success: true,
    statusCode: httpStatus.OK,
    message: "user logged in  successfully",
    data: result,
  });
};

const getProfile: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization as string;
  const result = await authServices.getProfileFromDB(token);

  res.send({
    success: true,
    statusCode: httpStatus.OK,
    message: "user profile retrieved  successfully",
    data: result,
  });
};

const updateProfile: RequestHandler = async (req, res, next) => {
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
};

export const authControllers = {
  login,
  getProfile,
  updateProfile,
};
