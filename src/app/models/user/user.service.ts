import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import bcrypt from "bcrypt";
import exclude from "../../../shared/excludeField";
const registerIntoDB = async (payLoad: User) => {
  console.log(payLoad);
  const hassedPassword = await bcrypt.hash(payLoad.password,Number(process.env.SALT_ROUNDS));
  payLoad.password = hassedPassword;
  const user = await prisma.user.create({ data: payLoad});
const userWithoutPass = exclude(user,["password"])
  return userWithoutPass;
};

export const userServices = {
  registerIntoDB,
};
