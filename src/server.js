import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import notesRoutes from "./routes/notes.routes.js";
import {
  registerUser,
  loginUser,
  getUsers,
} from "./controllers/auth.controller.js";
import {
  registerRules,
  loginRules,
  validateRequest,
} from "./validators/auth.validator.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/notes", notesRoutes);

app.get("/", (req, res) => {
  res.send("Notes API is running");
});

app.get("/api/auth/getUsers", getUsers);

app.post("/api/auth/register", registerRules, validateRequest, registerUser);
app.post("/api/auth/login", loginRules, validateRequest, loginUser);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MONGODB connected successfully"))
  .catch((error) => console.log("MONGODB connection error", error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
