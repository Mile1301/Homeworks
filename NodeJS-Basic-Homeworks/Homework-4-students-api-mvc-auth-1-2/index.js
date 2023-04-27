import express from "express";
import { globalRouter } from "./const/router.const.js";
const app = express();

app.use(express.json());
app.use("/api", globalRouter);

// Error handler
app.use((err, req, res, next) => {
  let { statusCode = 500, message } = err;
  // is it better to go with plain if`s or with elseif ???
  // i`ll try to move this logic to the middlewares in the next homework
  // and the codes for unauthorized and forbidden
  if (message.includes("not found")) statusCode = 404;
  else if (message.includes("provide")) statusCode = 400;
  res.status(statusCode).send(message);
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";
app.listen(PORT, HOST, () => console.log(`Listening on http://localhost:${PORT}`));
