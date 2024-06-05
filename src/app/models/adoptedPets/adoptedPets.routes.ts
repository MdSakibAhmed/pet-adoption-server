import { TRoutMaker } from "../../../interface/routeMaker.interface";
import { adoptedPetsController } from "./adoptedPets.controller";


const adoptedPetsRoutes :TRoutMaker[] = [
    {
        path:"/adoptedPets",
        method:"post",
        controller:adoptedPetsController.addAdoptedPets
    },
    {
        path:"/adoptedPets",
        method:"get",
        controller:adoptedPetsController.getAdoptedPets
    }
]

export default adoptedPetsRoutes