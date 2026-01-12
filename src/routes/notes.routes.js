import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  createNote,
  getAllNotes,
  //   getNoteById,
  //   updateNote,
  //   deleteNote,
} from "../controllers/notes.controller.js";

const router = express.Router();

router.post("/create", protect, createNote);
router.get("/getAllNotes", protect, getAllNotes);
// router.get("/:id", protect, getNoteById);
// router.put("/:id", protect, updateNote);
// router.delete("/:id", protect, deleteNote);

export default router;
