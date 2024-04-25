import { RequestHandler } from "express";
import { petAdaptionRequestServices } from "./petAdoptionService";
import httpStatus from "http-status";

const submitPetAdaptionRequest: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization as string;
  const result = await petAdaptionRequestServices.petAdaptionRequestIntoDB(
    token,
    req.body
  );
  res.send({
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Adoption request submitted successfully",
    data: result,
  });
};

const getPetAdaptionRequests:RequestHandler = async(req,res,next) => {
    const token = req.headers.authorization as string;

    const result = await petAdaptionRequestServices.getAdaptionRequestFromDB(token)

    res.send({
        success: true,
        statusCode: httpStatus.OK,
        message: "pet adaption retrieved  successfully",
        data: result,
      });


}

const updateAdaptionRequest :RequestHandler = async(req,res,next) => {
    const id = req.params.requestId;
    const token = req.headers.authorization as string

    
    const result = await petAdaptionRequestServices.updateAdaptionRequestIntoDB(token,req.body,id)

    res.send({
        success: true,
        statusCode: httpStatus.OK,
        message: "adaption updated  successfully",
        data: result,
      });

}

export const petAdaptionRequestController = {
  submitPetAdaptionRequest,
  getPetAdaptionRequests,
  updateAdaptionRequest
};
