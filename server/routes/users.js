import express from "express";
import {
  getAllUser,
  getUser,
  patchUser,
  patchUserLike,
  deleteUser,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", getAllUser);
router.get("/:username", getUser);

/* UPDATE */
router.patch("/username/:username", patchUser);
router.patch("/like", patchUserLike);

/* DELETE */
router.delete("/:username", deleteUser);

export default router;
