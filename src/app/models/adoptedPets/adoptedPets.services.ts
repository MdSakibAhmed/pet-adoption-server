import { PetsAdopted } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import jwt from "jsonwebtoken";
const addAdoptedPetsIntoDB = async (token: string, payLoad: PetsAdopted) => {
  const decoded: JwtPayload = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string
  ) as JwtPayload;
  console.log("decoded", decoded);
  const { userId } = decoded;
  payLoad.userId = userId;

  const result = await prisma.petsAdopted.create({ data: payLoad });
  return result;
};

const getAdoptedPetsFromDB = async (token: string, payLoad: PetsAdopted) => {
    const decoded: JwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as JwtPayload;
    console.log("decoded", decoded);
    const { userId } = decoded;
    payLoad.userId = userId;
  
    const result = await prisma.petsAdopted.findMany();
    return result;
  };


export const adoptedPetsServices = {
    addAdoptedPetsIntoDB,
    getAdoptedPetsFromDB
}