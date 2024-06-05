import { RequestHandler } from "express";
import { petServices } from "./pet.service";
import httpStatus from "http-status";
import { petFilterableFields, petSearchAbleFields } from "./pet.const";
import pick from "../../../shared/pick";
import catchAsync from "../../../shared/catchAsync";

const addPet: RequestHandler = catchAsync(async (req, res, next) => {
  console.log(req.body);
  req.body.age = parseInt(req.body.age);
  const result = await petServices.addPetIntoDB(req.body);
  res.send({
    success: true,
    statusCode: httpStatus.CREATED,
    message: "pet created successfully",
    data: result,
  });
});

const getAllPet = catchAsync(async (req, res, next) => {
  const filters = pick(req.query, petFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  console.log(options);
  const result = await petServices.getAllPetFromDB(filters, options);

  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "pet  data fetched!",
    meta: result.meta,
    data: result.data,
  });
});

const getSinglePet: RequestHandler = async (req, res, next) => {
  const petId = req.params.petId;
  console.log(petId);
  const data = await petServices.getSinglePetFromDB(petId);

  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "pet  data fetched!",
    data,
  });
};
const updatePet = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization as string;
  const id = req.params.petId;
  const body = req.body;

  const result = await petServices.updatePetIntoDB(token, id, body);

  res.send({
    success: true,
    statusCode: httpStatus.OK,
    message: "pet info  updated  successfully",
    data: result,
  });
});

const deletePet = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization as string;
  const id = req.params.petId;

  const result = await petServices.deletePetFromDB(token, id);

  res.send({
    success: true,
    statusCode: httpStatus.OK,
    message: "pet deleted successfully",
    data: null,
  });
});
export const petController = {
  addPet,
  getAllPet,
  updatePet,
  getSinglePet,
  deletePet
};
