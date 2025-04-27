import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRouter from "./routes/product.route.js";

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
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server Error" });
});

// 👉 No app.listen() here
export default app;
