const BASE = "https://interviewapiserver-production.up.railway.app";

async function test() {
  try {
    console.log("Fetching /meta...");
    const meta = await fetch(`${BASE}/meta`).then(r => r.json());
    console.log("META:", meta);

    console.log("\nFetching /orders...");
    const orders = await fetch(`${BASE}/orders`).then(r => r.json());
    console.log("ORDERS:", orders);
  } catch (err) {
    console.error("Error:", err);
  }
}

test();
