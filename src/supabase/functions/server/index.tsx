import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-910292f7/health", (c) => {
  return c.json({ status: "ok" });
});

// App Request endpoint
app.post("/make-server-910292f7/requests", async (c) => {
  try {
    const body = await c.req.json();
    const id = `request:${Date.now()}:${Math.random().toString(36).substring(2, 9)}`;
    
    // Validate body has required fields
    if (!body.name || !body.email || !body.idea) {
       return c.json({ error: "Missing required fields" }, 400);
    }
    
    await kv.set(id, body);
    return c.json({ success: true, id });
  } catch (error) {
    console.error("Error processing request:", error);
    return c.json({ error: "Failed to process request" }, 500);
  }
});

Deno.serve(app.fetch);
