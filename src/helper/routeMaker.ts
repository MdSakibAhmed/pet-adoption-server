import { Application, Router, RouterOptions } from "express";
import { TRoutMaker } from "../interface/routeMaker.interface";
import validateRequest from "../app/middleware/validatRequest";

const router = Router();

const routeMaker = (routesData: TRoutMaker[]) => {
  routesData.forEach((route) => {
    (router as any)[route.method](route.path, route.controller);
  });
  return router;
};

export default routeMaker;
