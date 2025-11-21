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

## Technologies

- **Express** (^4.19.0) - Web framework
- **ws** (^8.17.0) - WebSocket implementation
- **ES Modules** - Modern JavaScript module system

