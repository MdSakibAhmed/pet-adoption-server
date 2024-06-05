import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import exclude from "../../../shared/excludeField";

const loginFromDB = async (payLoad: { email: string; password: string }) => {
  const { email, password: plainTextPass } = payLoad;
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("user not found ");
  }

  // match password
  const isMatched = await bcrypt.compare(
    plainTextPass as string,
    user.password
  );
  if (!isMatched) {
    throw new Error("incorrect password ");
  }

  // genarate token for this user
  const payLoadForToken = {
    userId: user.id,
    email,
    role: user.role,
  };
  const token = jwt.sign(
    payLoadForToken,
    process.env.JWT_SECRET_KEY as string,
    { algorithm: "HS256", expiresIn: process.env.TOKEN_EXPIRES_TIME }
  );

  const userWithoutPass = exclude(user, ["password", "createdAt", "updatedAt"]);
  return {
    ...userWithoutPass,
    token,
  };
};

const getProfileFromDB = async (token: string) => {
  // verify token

  const decoded: JwtPayload = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string
  ) as JwtPayload;
  console.log("decoded", decoded);

  const { userId } = decoded;

  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
  console.log(user);
  const userWithoutPass = exclude(user, ["password"]);

  return userWithoutPass;
};

const updateProfileFromDB = async (token: string, payLoad: Partial<User>) => {
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string
  ) as JwtPayload;
  // console.log("decoded", decoded);

  const { userId, role } = decoded;
  // if (
  //   (payLoad.role && role != "ADMIN") ||
  //   (payLoad.isActive && role != "ADMIN")
  // ) {
  //   throw new Error("You are not authorized to update user role");
  // }
  // if (payLoad.hasOwnProperty("role") || payLoad.hasOwnProperty("isActive")) {
  //   console.log(payLoad.isActive, payLoad.role, "isActive");
  //   const updatedUser = await prisma.user.update({
  //     where: {
  //       id: payLoad.id,
  //     },
  //     data: { isActive: payLoad.isActive, role: payLoad.role },
  //   });

  //   return updatedUser;
  // }
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: payLoad,
  });

  const updateUserWithoutPass = exclude(updatedUser, ["password"]);

  return updateUserWithoutPass;
};

const changePasswordFromDB = async (
  token: string,
  payLoad: { newPassword: string; currentPassword: string }
) => {
  console.log(payLoad);
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string
  ) as JwtPayload;
  // console.log("decoded", decoded);

  const { userId } = decoded;
  console.log(userId);
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });
  console.log(user, "user");
  if (!user) {
    throw new Error("user not found ");
  }

  // match password
  console.log(user.password, payLoad.currentPassword);
  const isMatched = await bcrypt.compare(
    payLoad.currentPassword as string,
    user.password
  );
  if (!isMatched) {
    throw new Error("incorrect current password ");
  }

  const hassedPassword = await bcrypt.hash(
    payLoad.newPassword,
    Number(process.env.SALT_ROUNDS)
  );

  console.log(hassedPassword);
  const udpatePassword = await prisma.user.update({
    where: {
      id: userId,
    },
    data: { password: hassedPassword },
  });
  console.log(udpatePassword);
  return udpatePassword;
};
export const authServices = {
  loginFromDB,
  getProfileFromDB,
  updateProfileFromDB,
  changePasswordFromDB,
};
