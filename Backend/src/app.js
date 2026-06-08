import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import authRouter from "./routes/auth.routes.js";
import reviewsRouter from "./routes/reviews.routes.js";
import requestRouter from "./routes/requestCallback.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/auth/", authRouter);
app.use("/api/", reviewsRouter);
app.use("/api/request/", requestRouter);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
export default app;