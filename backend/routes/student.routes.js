import express from "express";
import Student from "../models/student.js";
import { protect, authorize } from "../middleware/auth.js";


const router = express.Router();

/* CREATE student */
router.post("/", protect, authorize("admin"), async (req, res) => {
  const student = await Student.create(req.body);
  res.json(student);
});

/* READ all students */
router.get("/", protect, authorize("admin"), async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

/* UPDATE student */
router.put("/:id", protect, authorize("admin"), async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(student);
});

/* DELETE student */
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
