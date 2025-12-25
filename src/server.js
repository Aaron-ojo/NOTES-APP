import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Notes API is running");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MONGODB connected successfully"))
  .catch((error) => console.log("MONGODB connection error", error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
