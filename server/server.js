import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/connectDb.js";
import authRoute from "./routes/authRoute.js";

const app = express();
const port = process.env.PORT || 4000;
connectDb();


app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://auth2-zwwj.vercel.app",
    credentials: true
  })
);


app.use("/api/auth", authRoute);

app.listen(port, () => console.log(`Server is running on port ${port}`));
