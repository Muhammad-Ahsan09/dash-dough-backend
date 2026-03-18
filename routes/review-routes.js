import express from "express";
import { createReview } from "../controllers/review-controllers.js";

const reviewRouter = express.Router();

reviewRouter.post('/', createReview)
reviewRouter.get('/', getSelection)

export default reviewRouter;