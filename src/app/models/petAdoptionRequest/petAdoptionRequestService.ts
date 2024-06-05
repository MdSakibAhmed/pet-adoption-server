import { AdoptionRequest, Pet, adoptionRequestStatus } from "@prisma/client";
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

const getAdaptionRequestFromDB = async (
  token: string,
  query: Record<string, unknown>
) => {
  const decoded: JwtPayload = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string
  ) as JwtPayload;
  console.log("decoded", decoded);
  const { userId } = decoded;
  // const andCondions = [];

  // if (query.userId) {
  //   andCondions.push({
  //     id: userId,
  //   });
  // }

  // const whereConditons = { AND: andCondions };

  const adaptionRequests = await prisma.adoptionRequest.findMany({
    where: { userId: userId },
    include: {
      pet: true,
      user: true,
    },
  });

  return adaptionRequests;
};

const updateAdaptionRequestIntoDB = async (
  token: string,
  payLoad: Partial<AdoptionRequest>,
  requestId: string
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
    include: {
      pet: true,
      user: true,
    },
  });

  // create adopted pet list
  if (updatedRequest.status == "APPROVED") {
    const adoptedPet = await prisma.petsAdopted.create({
      data: {
        userId: updatedRequest.user.id,
        petId: updatedRequest.pet.id,
      },
    });
  }

  return updatedRequest;
};
export const petAdaptionRequestServices = {
  petAdaptionRequestIntoDB,
  getAdaptionRequestFromDB,
  updateAdaptionRequestIntoDB,
};
