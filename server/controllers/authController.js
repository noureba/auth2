import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import transporter from "../config/transport.js";
import "dotenv/config";

// register controller
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    // Create new user
    const passwordHash = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      email,
      password: passwordHash,
    });
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//login controller
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    //check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "password not correct" });
    }
    //return token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Token not generated" });
    }
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Logout controller
export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//send verifyed email otp
export const sendEmailOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);
    if (user.isAcountVerified) {
      return res.json({
        success: false,
        message: "user alredy verified",
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.emailVerifyOtp = otp;
    user.emailVerifyOtpExpiredAt = Date.now() + 10 * 60 * 1000;
    await user.save();

    const mailOptions = {
      from: process.env.STMP_FROM,
      to: user.email,
      subject: "Email verification",
      text: "Your email verification otp is " + otp,
    };
    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Email verification otp sent to your email",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//verify email otp
export const verifyEmailOtp = async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp) {
    return res.json({
      success: false,
      message: "All fields are required",
    });
  }
  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(400).json({
        succes: false,
        message: "User not found",
      });
    }
    if (user.emailVerifyOtp == "" || user.emailVerifyOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid otp",
      });
    }
    if (user.emailVerifyOtpExpiredAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Otp expired",
      });
    }

    user.isAcountVerified = true;
    user.emailVerifyOtp = "";
    user.emailVerifyOtpExpiredAt = 0;
    await user.save();

    res.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//reset password otp
export const sendResetPasswordOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({
      success: false,
      message: "Email is required",
    });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "user not found",
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpiredAt = Date.now() + 10 * 60 * 1000;
    await user.save();

    const mailOptions = {
      from: process.env.STMP_FROM,
      to: user.email,
      subject: "Reset password otp",
      text: "your reset password otp is : " + otp,
    };
    await transporter.sendMail(mailOptions)

    res.json({
      success:true,
      message:"otp sent to your email"
    })

  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//reset password 
export const resetPassword = async (req, res) => {
  const {email, otp, newPassword} = req.body;
  if(!email|| !otp || !newPassword){
    return res.json({
      succes: false,
      message: "Details are required"
    })
  }

  try {
    const user = await userModel.findOne({email});
    if(!user){
      return res.json({
        success: false,
        message: "User not found"
      })
    }
    //check otp
    if(user.resetPasswordOtp == "" || user.resetPasswordOtp !== otp){
      return res.json({
        success: false,
        message:"your otp is not coreccet"
      })
    }
    if(user.resetPasswordOtpExpiredAt < Date.now()){
      return res.json({
        succes: false,
        message: "your otp is expired"
      })
    }
    const newPasswordHash = await bcrypt.hash(newPassword, 12);
    user.password = newPasswordHash;
    user.resetPassword = "";
    user.resetPasswordOtpExpiredAt = 0;
    await user.save()

    res.json({
      succes: true,
      message: "password has been changed"
    })

  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
}
