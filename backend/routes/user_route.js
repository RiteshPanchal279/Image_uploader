import express from "express";
import { login, register } from "../controller/user_cnt.js";
import {authMiddleware} from "../middleware/authMiddleware.js"


const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);

router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "You are authorized", userId: req.user });
});

export default router;
