import routeMaker from "../../../helper/routeMaker";
import { TRoutMaker } from "../../../interface/routeMaker.interface";
import { petAdaptionRequestController } from "./petAdoptionRequest.controller";

export const petAdaptionRequestRoutes: TRoutMaker[] = [
  {
    method: "post",
    path: "/adoption-request",
    controller: petAdaptionRequestController.submitPetAdaptionRequest,
  },
  {
    method: "get",
    path: "/adoption-request",
    controller: petAdaptionRequestController.getPetAdaptionRequests,
  },
  {
    method:"patch",
    path:"/adoption-request/:requestId",
    controller:petAdaptionRequestController.updateAdaptionRequest
  }
];
