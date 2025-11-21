import express from "express";
import { WebSocketServer } from "ws";

const app = express();
const port = process.env.PORT || 3000;

// --- In-memory order store ---
const statuses = ["NEW", "PROCESSING", "SHIPPED", "CANCELLED"];
const orders = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  status: statuses[Math.floor(Math.random() * statuses.length)],
}));

app.get("/orders", (_req, res) => {
  res.json(orders);
});

// --- WebSocket for random status updates ---
const server = app.listen(port, () => {
  console.log("API running on port " + port);
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  const interval = setInterval(() => {
    const order = orders[Math.floor(Math.random() * orders.length)];
    order.status = statuses[Math.floor(Math.random() * statuses.length)];

    ws.send(JSON.stringify(order));
  }, 1000);

  ws.on("close", () => clearInterval(interval));
});