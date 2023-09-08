import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { addReview } from "./controller/review.js";
const router = Router();

router.post("/", isAuthenticated, addReview);

export default router;
