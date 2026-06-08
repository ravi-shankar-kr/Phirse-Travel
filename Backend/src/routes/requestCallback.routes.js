import { Router } from "express";
import { createRequestCallback, getRequestCallback } from "../controllers/requestCallback.controller.js";
import authUser from "../middleware/auth.middleware.js";

const requestRouter = Router();

requestRouter.post("/requestCallback",authUser, createRequestCallback)

requestRouter.get("/getRequestCallback", getRequestCallback)


export default requestRouter;