import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const studentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["admin", "student"],
    default: "student",
  },
});

//Hash password before saving

// Hash password before saving using async/await with next()
// Hash password before saving
studentSchema.pre("save", async function () {
  // If the password hasn't been modified, skip hashing
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Compare password

studentSchema.methods.comparePassword = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

const Student = mongoose.model("Student", studentSchema);

export default Student;
