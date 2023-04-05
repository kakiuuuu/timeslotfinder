import express from "express";
import {
  createComment,
  getAllComment,
  getAllCommentByVenue,
} from "../controllers/comments.js";

const router = express.Router()

/* CREATE */
router.post("/", createComment);

/* READ */
router.get("/", getAllComment);
router.get("/venue/:venueId", getAllCommentByVenue);

export default router;
