import express from "express";
import {
  getAllEvent,
  getAllEventByVenue,
  patchEvent,
  deleteEvent,
} from "../controllers/events.js";

const router = express.Router()

/* READ */
router.get("/", getAllEvent);
router.get("/venue/:venueId", getAllEventByVenue);

/* UPDATE */
router.patch("/:eventId", patchEvent);

/* DELETE */
router.delete("/:eventId", deleteEvent);

export default router;
