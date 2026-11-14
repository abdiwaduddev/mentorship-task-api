import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getOnuserInfo,
  updateUser,
} from "../controllers/userControllers";
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getOnuserInfo);
router.post("/:id", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
