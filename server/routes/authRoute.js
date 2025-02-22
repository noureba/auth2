import express from "express";
import { login, register, resetPassword, sendEmailOtp, sendResetPasswordOtp, verifyEmailOtp } from "../controllers/authController.js";
import { userData } from "../controllers/userController.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/data", isAuth, userData);
router.post("/send-Email-Otp", isAuth, sendEmailOtp);
router.post("/verify-Email-Otp", isAuth, verifyEmailOtp);
router.post("/send-Reset-Password-Otp", sendResetPasswordOtp);
router.post("/reset-Password", resetPassword);





export default router;
