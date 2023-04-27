import express from "express";
import { globalRouter } from "./const/router.const.js";
const app = express();
app.use(express.json());
app.use("/api", globalRouter);

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "0.0.0.0";
app.listen(PORT, HOST, () => console.log(`Listening on http://localhost:${PORT}`));
