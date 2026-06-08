import Router from "express"
import { createReview, getReview } from "../controllers/reviews.controller.js"
 
import authUser from "../middleware/auth.middleware.js";

const reviewsRouter = Router();

reviewsRouter.post("/createReview", authUser, createReview)

reviewsRouter.get("/getReviews", getReview)

export default reviewsRouter;