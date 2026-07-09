import express from "express";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";


const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/api", router);

export default app;