import express from "express";
import { studentsRouter } from "./routes/students.routes.js";
import { publicPath } from "./students.js";
const app = express();

app.use(express.json());
app.use("/", express.static(publicPath));
app.use("/students", studentsRouter);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, HOST, () => console.log(`Listening on http://localhost:${PORT}`));
