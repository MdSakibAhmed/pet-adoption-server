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
    method: "get",
    path: "/pets/:petId",
    controller: petController.getSinglePet,
  },
  {
    method: "patch",
    path: "/pets/:petId",
    controller: petController.updatePet,
  },
  {
    method: "delete",
    path: "/pets/:petId",
    controller: petController.deletePet,
  },
];

export default petRoutes;
