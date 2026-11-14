import jwt from "jsonwebtoken";
import Student from "../model/student.js";

export const protect = async (req, res, next) => {
  try {
    // Fix: split by a space " " instead of ""
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.student = await Student.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    console.log("Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
