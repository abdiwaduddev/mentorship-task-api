import express from "express";
const router = express.Router();
import {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from "../controllers/studentController.js";

router.get("/", getStudents);
router.post("/create", createStudent);
router.put("/update/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
