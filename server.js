import express from "express";
import { WebSocketServer } from "ws";

const app = express();
const port = process.env.PORT || 3000;

// --- In-memory orders ---
const statuses = ["NEW", "PROCESSING", "SHIPPED", "CANCELLED"];
const orders = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  status: statuses[Math.floor(Math.random() * statuses.length)]
}));

// -----------------------------------
// REST: /orders
// -----------------------------------
app.get("/orders", (_req, res) => {
  res.json(orders);
});

// -----------------------------------
// JSON metadata: /meta
// -----------------------------------
app.get("/meta", (_req, res) => {
  res.json({
    name: "Orders Demo API",
    version: "1.0.0",
    endpoints: {
      "/": "HTML landing page with API overview",
      "/orders": "GET order list",
      "/meta": "API metadata (JSON)",
      "WebSocket": "Connect to same base URL for random status updates"
    },
    notes: [
      "Orders stored in memory only",
      "Statuses update randomly every second",
      "REST and WebSocket order states may diverge"
    ]
  });
});

// -----------------------------------
// HTML landing page: /
// -----------------------------------
app.get("/", (_req, res) => {
  res.send(`
    <h1>Orders Demo API</h1>
    <p>This service provides a simple REST API and WebSocket stream for interview exercises.</p>

    <h2>REST Endpoints</h2>
    <ul>
      <li><strong>GET /orders</strong> — returns a list of in-memory orders</li>
      <li><strong>GET /meta</strong> — API metadata in JSON</li>
    </ul>

    <h2>WebSocket</h2>
    <p>Connect via <code>wss://&lt;interviewapiserver-production.up.railway.app&gt;/</code> to receive random order status updates.</p>

    <h2>Notes</h2>
    <ul>
      <li>Orders and statuses are randomized on startup.</li>
      <li>Status updates are pushed every second.</li>
      <li>Consistency between REST and WebSocket is not guaranteed.</li>
    </ul>
  `);
});

// -----------------------------------
// WebSocket: status updates
// -----------------------------------
const server = app.listen(port, () => {
  console.log("API running on port " + port);
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");

  const interval = setInterval(() => {
    const order = orders[Math.floor(Math.random() * orders.length)];
    order.status = statuses[Math.floor(Math.random() * statuses.length)];

    ws.send(JSON.stringify(order));
  }, 1000);

  ws.on("close", () => clearInterval(interval));
});
