import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import exclude from "../../../shared/excludeField";

const loginFromDB = async (payLoad: Partial<User>) => {
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
  const userWithoutPass = exclude(user, ["password"]);

  return userWithoutPass;
};

const updateProfileFromDB = async (token: string, payLoad: Partial<User>) => {
  
    const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string
  ) as JwtPayload;
  console.log("decoded", decoded);

  const { userId } = decoded;

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: payLoad,
  });

  const updateUserWithoutPass = exclude(updatedUser, ["password"]);

  return updateUserWithoutPass;
};
export const authServices = {
  loginFromDB,
  getProfileFromDB,
  updateProfileFromDB,
};
