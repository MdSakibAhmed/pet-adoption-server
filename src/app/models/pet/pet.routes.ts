import { petController } from "./pet.controller";
import { TRoutMaker } from "../../../interface/routeMaker.interface";

const petRoutes: TRoutMaker[] = [
  {
    method: "post",
    path: "/pets",
    controller: petController.addPet,
  },
  {
    method: "get",
    path: "/pets",
    controller: petController.getAllPet,
  },
  {
    method: "put",
    path: "/pets/:petId",
    controller: petController.updatePet,
  },
];

export default petRoutes;
