import express from "express";
import { 
  registerUser, 
  loginUser, 
  findUser, 
  getUsers 
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:id", findUser);
router.get("/", getUsers);

export default router;