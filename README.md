# interview_api_server

A simple Express API server with WebSocket support for demonstrating real-time order status updates.

## Overview

This project provides a REST API endpoint for fetching orders and a WebSocket connection that pushes random order status updates to connected clients in real-time.

## Features

- **REST API**: GET endpoint to retrieve all orders
- **WebSocket Server**: Real-time updates of order statuses every second
- **In-memory Data Store**: 8 sample orders with randomized statuses

## Installation

```bash
npm install
```

## Usage

Start the server:

```bash
npm start
```

The server will run on port 3000 by default (or the port specified in the `PORT` environment variable).

## API Endpoints

### GET /

Returns an HTML landing page with an overview of the API, its endpoints, and usage instructions.

### GET /orders

Returns a JSON array of all orders.

**Response:**
```json
[
  { "id": 1, "status": "NEW" },
  { "id": 2, "status": "PROCESSING" },
  ...
]
```

### GET /meta

Returns API metadata in JSON format, including information about available endpoints and important notes.

**Response:**
```json
{
  "name": "Orders Demo API",
  "version": "1.0.0",
  "endpoints": {
    "/": "HTML landing page with API overview",
    "/orders": "GET order list",
    "/meta": "API metadata (JSON)",
    "WebSocket": "Connect to same base URL for random status updates"
  },
  "notes": [
    "Orders stored in memory only",
    "Statuses update randomly every second",
    "REST and WebSocket order states may diverge"
  ]
}
```

## WebSocket

Connect to the WebSocket server at `ws://localhost:3000` to receive real-time order status updates.

**Message Format:**
```json
{ "id": 1, "status": "SHIPPED" }
```

A random order status update is sent every second to all connected clients.

## Order Statuses

- `NEW`
- `PROCESSING`
- `SHIPPED`
- `CANCELLED`

## Testing

The `tests/` folder contains quick test scripts to verify the API functionality:

### test-rest.js

Tests the REST API endpoints (`/meta` and `/orders`). Run with:

```bash
node tests/test-rest.js
```

This script fetches data from both endpoints and displays the responses.

### test-ws.js

Tests the WebSocket connection and listens for real-time order status updates. Run with:

```bash
node tests/test-ws.js
```

This script connects to the WebSocket server and logs incoming status updates.

**Note:** The test files are configured to connect to the Railway production deployment at `interviewapiserver-production.up.railway.app`. Update the URLs in the test files to test against your local server.

## Important Notes

- Orders are stored in memory only and reset on server restart
- Order statuses are randomized on startup
- Status updates via WebSocket occur every second with random values
- REST and WebSocket order states may diverge as updates are independent

## Technologies

- **Express** (^4.19.0) - Web framework
- **ws** (^8.17.0) - WebSocket implementation
- **ES Modules** - Modern JavaScript module system

