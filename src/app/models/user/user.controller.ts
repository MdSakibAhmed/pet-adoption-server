import { RequestHandler } from "express";
import { userServices } from "./user.service";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";

const register = catchAsync(async (req, res, next) => {
  const newUser = req.body;

  const result = await userServices.registerIntoDB(newUser);

  res.send({
    success: true,
    statusCode: httpStatus.CREATED,
    message: "user registered successfully",
    data: { token: result.token, ...result.userWithoutPass },
  });
});


const getAllUsers = catchAsync(async (req, res, next) => {
  const params = req.params;

  const result = await userServices.getAllUsersFromDB(params);

  res.send({
    success: true,
    statusCode: httpStatus.OK,
    message: "users fetched successfully",
    data: result
  });
});

export const userControllers = {
  register,
  getAllUsers
};
