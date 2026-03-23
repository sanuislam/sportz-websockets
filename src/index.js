import "dotenv/config";
import express from "express";
import http from "http";
import { matchesRouter } from "./routes/matches.js";
import { attachWebSocketServer } from "./ws/server.js";

const app = express();
const PORT = Number(process.env.PORT || 8000);
const HOST = process.env.HOST || "0.0.0.0";

app.use(express.json());
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/matches", matchesRouter);

const { broadcastMatchCreated } = attachWebSocketServer(server);
app.locals.broadcastMatchCreated = broadcastMatchCreated;

server.listen(PORT, HOST, () => {
  const isTls =
    process.env.USE_TLS === "true" || process.env.NODE_ENV === "production";
  const protocol = isTls ? "https" : "http";
  const wsProtocol = protocol === "https" ? "wss" : "ws";
  const hostForUrl = HOST === "0.0.0.0" ? "localhost" : HOST;

  const baseUrl = `${protocol}://${hostForUrl}:${PORT}`;
  const wsUrl = `${wsProtocol}://${hostForUrl}:${PORT}/ws`;

  console.log(`Server is running on ${baseUrl}`);
  console.log(`WebSocket Server is running on ${wsUrl}`);
});
