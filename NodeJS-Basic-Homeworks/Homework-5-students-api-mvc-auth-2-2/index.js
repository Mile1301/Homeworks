import express from "express";
import { globalRouter } from "./const/router.const.js";
import { createSession } from "./const/session.const.js";
const app = express();
app.use(createSession);
app.use(express.json());
app.use("/api", globalRouter);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

// Error handler here
app.use((err, req, res, next) => {
  let { statusCode = 500, message } = err;
  return res.status(statusCode).send(message);
});
app.listen(PORT, HOST, () => console.log(`Listening on http://localhost:${PORT}`));
