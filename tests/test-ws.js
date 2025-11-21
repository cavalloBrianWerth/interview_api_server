import WebSocket from "ws";

// Railway WebSocket URL is the same domain, but ws:// or wss://
const WS_URL = "wss://interviewapiserver-production.up.railway.app";

console.log("Connecting to WebSocket:", WS_URL);

const ws = new WebSocket(WS_URL);

ws.on("open", () => {
  console.log("Connected! Waiting for updates...");
});

ws.on("message", (data) => {
  console.log("Update:", data.toString());
});

ws.on("close", () => console.log("WebSocket closed"));
ws.on("error", (err) => console.error("WebSocket error:", err));
