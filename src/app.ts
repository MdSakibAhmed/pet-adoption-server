import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookiParser from "cookie-parser";

import userRoutes from "./app/models/user/user.routes";
import authRoutes from "./app/models/auth/auth.routes";
import petRoutes from "./app/models/pet/pet.routes";
import routeMaker from "./helper/routeMaker";
import { petAdaptionRoutes } from "./app/models/petAdoption/petAdoptionRoutes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
dotenv.config();
const app:Application = express();

app.use(express.json());
app.use(cookiParser());
app.use(cors());

app.get('/',(req:Request,res:Response) => {
    res.send({ message:"Hello prisma . How are you ?. Prisma is awesome "})
})

// user routes
app.use('/api',userRoutes)

// auth routes
app.use('/api',authRoutes)

// pet routes

app.use("/api",routeMaker(petRoutes))

// pet adaption routes

app.use("/api",routeMaker(petAdaptionRoutes))

app.use(globalErrorHandler)

export default app;
