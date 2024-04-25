import express from "express";
import { signup, login, google, logout, github } from "../controllers/auth.controller.js";

router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google", google);
router.post("/github", github);
router.post("/logout", logout);

export default router;
