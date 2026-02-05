import express from "express";
import cors from "cors";
import timeRoutes from "./routes/timeRoutes";

const app = express();

app.use(cors());

app.use(express.json({ limit: "5mb" }));

app.get("/", (_req, res) => {
    res.send("API is running");
});

app.use("/api", timeRoutes);

export default app;