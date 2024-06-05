import { Pet } from "@prisma/client";
import prisma from "../../../shared/prisma";
import exclude from "../../../shared/excludeField";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IPetFilterRequest } from "./pet.interface";
import { paginationHelper } from "../../../helper/paginationHelper";
import { orderOptions, petSearchAbleFields, sortOptions } from "./pet.const";
import { IPaginationOptions } from "../../../interface/pagination";
import { RequestHandler } from "express";

const addPetIntoDB = async (payLoad: Pet) => {
  const newPet = await prisma.pet.create({ data: payLoad });
  // const petWithoutCreatedAt = exclude(newPet, ["createdAt", "updatedAt"]);

  return newPet;
};

const getAllPetFromDB = async (
  params: IPetFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andCondions = [];
  console.log(searchTerm, "25");
  //console.log(filterData);
  if (params.searchTerm) {
    andCondions.push({
      OR: petSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  console.log(andCondions);
  if (Object.keys(filterData).length > 0) {
    andCondions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditons = { AND: andCondions };

  const result = await prisma.pet.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy:
      options.sortBy &&
      sortOptions.includes(options.sortBy) &&
      options.sortOrder &&
      orderOptions.includes(options.sortOrder)
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "asc",
          },
  });

  const total = await prisma.pet.count({
    where: whereConditons,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSinglePetFromDB = async (petId: string) => {
  const result = await prisma.pet.findUniqueOrThrow({ where: { id: petId } });
  return result;
};
const updatePetIntoDB = async (
  token: string,
  petId: string,
  payLoad: Partial<Pet>
) => {
  const decoded: JwtPayload = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string
  ) as JwtPayload;
  console.log("decoded", decoded);

  const updatePet = await prisma.pet.update({
    where: { id: petId },
    data: payLoad,
  });
  return updatePet;
};

const deletePetFromDB = async (token: string, petId: string) => {
  const decoded: JwtPayload = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string
  ) as JwtPayload;
  console.log("decoded", decoded);

  const updatePet = await prisma.pet.delete({ where: { id: petId } });
  return updatePet;
};
export const petServices = {
  addPetIntoDB,
  getAllPetFromDB,
  updatePetIntoDB,
  getSinglePetFromDB,
  deletePetFromDB,
};
