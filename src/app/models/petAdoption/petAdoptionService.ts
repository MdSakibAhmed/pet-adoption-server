import { AdoptionRequest } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
const petAdaptionRequestIntoDB = async (
  token: string,
  payLoad: AdoptionRequest
) => {
  const decoded: JwtPayload = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string
  ) as JwtPayload;
  console.log("decoded", decoded);
  const { userId } = decoded;
  payLoad.userId = userId;

  const newRequest = prisma.adoptionRequest.create({ data: payLoad });
  return newRequest;
};

const getAdaptionRequestFromDB = async (token: string) => {
  const decoded: JwtPayload = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string
  ) as JwtPayload;
  console.log("decoded", decoded);
  const { userId } = decoded;
  const adaptionRequests = await prisma.adoptionRequest.findMany({
    where: { userId: userId },
  });

  return adaptionRequests;
};

const updateAdaptionRequestIntoDB = async (
  token: string,
  payLoad: Partial<AdoptionRequest>,
  requestId:string
) => {
  const decoded: JwtPayload = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string
  ) as JwtPayload;
  console.log("decoded", decoded);

  const updatedRequest = await prisma.adoptionRequest.update({
    where: {
      id: requestId,
    },
    data: payLoad,
  });

  return updatedRequest
};
export const petAdaptionRequestServices = {
  petAdaptionRequestIntoDB,
  getAdaptionRequestFromDB,
  updateAdaptionRequestIntoDB
};
