import express from "express";
import {
  getAllVenue,
  getAllVenueByUser,
} from "../controllers/venues.js";

const router = express.Router()

/* READ */
router.get("/", getAllVenue);
router.get("/user/:username", getAllVenueByUser);


export default router;
