import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import bcrypt from "bcrypt";
import exclude from "../../../shared/excludeField";
import jwt from "jsonwebtoken";
const registerIntoDB = async (payLoad: User) => {
  console.log(payLoad);
  const hassedPassword = await bcrypt.hash(
    payLoad.password,
    Number(process.env.SALT_ROUNDS)
  );
  payLoad.password = hassedPassword;
  const user = await prisma.user.create({ data: payLoad });
  const payLoadForToken = {
    userId: user.id,
    email: user.email,
    role:user.role
  };
  const token = jwt.sign(
    payLoadForToken,
    process.env.JWT_SECRET_KEY as string,
    { algorithm: "HS256", expiresIn: process.env.TOKEN_EXPIRES_TIME }
  );
  const userWithoutPass = exclude(user, ["password"]);
  return { userWithoutPass, token };
};

const getAllUsersFromDB = async(params:Record<string,unknown>) => {
 
  const result = await prisma.user.findMany();
  return result;

}

export const userServices = {
  registerIntoDB,
  getAllUsersFromDB,
};
