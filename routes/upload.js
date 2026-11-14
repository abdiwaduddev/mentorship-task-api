import express from "express";
const router = express.Router();

import { protect } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";
import { uploadFile } from "../controllers/uploadController.js";

router.post("/profile-picture", protect, upload.single("file"), uploadFile);

export default router;
