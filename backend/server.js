import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import studentRoutes from "./routes/student.routes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/students", studentRoutes);

mongoose.connect(process.env.MONGO_URI).then(() =>
  console.log("MongoDB Connected")
);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Backend is running 🚀");
});


app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);
