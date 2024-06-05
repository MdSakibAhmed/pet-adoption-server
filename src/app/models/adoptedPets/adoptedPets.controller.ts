import { RequestHandler } from "express";
import httpStatus from "http-status";
import { adoptedPetsServices } from "./adoptedPets.services";

const addAdoptedPets: RequestHandler = async (req, res, next) => {
    const token = req.headers.authorization as string;
    const result = await adoptedPetsServices.addAdoptedPetsIntoDB(
      token,
      req.body
    );
    res.send({
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Successfully added",
      data: result,
    });
  };

  const getAdoptedPets: RequestHandler = async (req, res, next) => {
    const token = req.headers.authorization as string;
    const result = await adoptedPetsServices.getAdoptedPetsFromDB(
      token,
      req.body
    );
    res.send({
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Successfully added",
      data: result,
    });
  };

  export const adoptedPetsController = {
    addAdoptedPets,
    getAdoptedPets
  }