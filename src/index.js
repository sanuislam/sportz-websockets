import "dotenv/config";
import express from "express";
import { matchesRouter } from "./routes/matches.js";

const app = express();
app.use(express.json());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/matches", matchesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
