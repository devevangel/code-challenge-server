import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRouter from "./routes/product.route.js";
import { globalErrorHandler } from "./utils/error.middleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRouter);

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Central error handler
app.use(globalErrorHandler);

// 👉 No app.listen() here
export default app;
