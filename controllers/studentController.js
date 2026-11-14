import Student from "../model/student.js";
import { generateToken } from "../utils/generateToken.js";

// get all students

export const getStudents = async (req, res) => {
  const student = await Student.find();
  res.json(student);
};

// create student
export const createStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// update student
export const updateStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const updateStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateStudent) return res.status(404).send("User not Found");

    res.json(updateStudent);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// delete student
export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).send("User not found");
    }
    res.send(`Student with id ${id} deleted`);
  } catch (err) {
    res.status(500).send("Server error");
  }
};


