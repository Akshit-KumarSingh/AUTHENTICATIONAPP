import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./db/connectDB.js";
dotenv.config();
import authRoutes from "./routes/auth.route.js";
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.listen(5000, () => {
  connectDB();
  console.log("Server is running on port ", PORT);
});
