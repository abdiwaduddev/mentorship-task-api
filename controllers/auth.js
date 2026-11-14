import Student from "../model/student.js";
import { generateToken } from "../utils/generateToken.js";

// Register Student
export const register = async (req, res, next) => {
  let { name, email, password } = req.body;
  try {
    const exists = await Student.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already in use" });

    const newStudent = await Student.create({ name, email, password });
    const token = generateToken(newStudent._id);
    res.status(201).json({ token });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    next(err);
  }
};

// Login Student

export const login = async (req, res, next) => {
  let { email, password } = req.body;

  try {
    // email = email.toLowerCase();
    const student = await Student.findOne({ email });

    if (!student || !(await student.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(student._id);

    res.json({ token });
  } catch (error) {
    console.log("Error", error);
    next(err);
  }
};
