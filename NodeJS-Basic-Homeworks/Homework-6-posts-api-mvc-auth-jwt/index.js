import "dotenv/config";
import express from "express";
import { globalRouter } from "./const/router.const.js";

const app = express();
app.use(express.json());
app.use("/api", globalRouter);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send(message);
});

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "0.0.0.0";
app.listen(PORT, HOST, () => console.log(`Listening on http://localhost:${PORT}`));
