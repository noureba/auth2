import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.STMP_HOST,
  port: process.env.STMP_PORT,
  secure: false,
  auth: {
    user: process.env.STMP_USER,
    pass: process.env.STMP_PASS,
  },
  tls: {
    rejectUnauthorized: false // This disables the self-signed certificate check
  }
});

export default transporter;
