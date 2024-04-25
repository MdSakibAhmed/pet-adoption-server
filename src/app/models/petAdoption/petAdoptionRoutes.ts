import routeMaker from "../../../helper/routeMaker";
import { TRoutMaker } from "../../../interface/routeMaker.interface";
import { petAdaptionRequestController } from "./petAdoption.controller";

export const petAdaptionRoutes: TRoutMaker[] = [
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
    method:"put",
    path:"/adoption-request/:requestId",
    controller:petAdaptionRequestController.updateAdaptionRequest
  }
];
