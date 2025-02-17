import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/connectDb.js";
import authRoute from "./routes/authRoute.js";

const app = express();
const port = process.env.PORT || 4000;


app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());

connectDb();

app.use("/api/auth", authRoute);

app.listen(port, () => console.log(`Server is running on port ${port}`));
