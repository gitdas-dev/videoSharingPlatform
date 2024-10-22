import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";
import cors from "cors";


const app = express();
dotenv.config();


app.use(cors({
  origin: 'https://video-sharing-platform-frontend-ocmogtfrl.vercel.app', // Allow only your frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: false, // If your frontend makes requests with credentials (cookies, etc.)
}));


const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to DB!");
    })
    .catch((err) => {
      throw err;
    });
};


app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(process.env.PORT, () => {
  connect();
  console.log("Connected!");
});
