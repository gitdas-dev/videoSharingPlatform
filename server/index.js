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
  origin: 'https://video-sharing-platform-frontend-seven.vercel.app', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://video-sharing-platform-frontend-6qx90wz6a.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400'); 
  res.sendStatus(200);  
});


const connect = () => {
  mongoose
    .connect("mongodb+srv://mandeepdas321:UQ8cq7LkSElpYnSa@cluster0.8bvta5c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
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

app.listen(3000, () => {
  connect();
  console.log("Connected!");
});
