import express from "express";
import routers from "../src/routes";
import cors from "cors";

const app = express();
app.use(cors());

// Cache middleware should come BEFORE routers
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api/search")) {
    res.setHeader("Cache-Control", "public, max-age=300");
  }
  next();
});

app.use(routers); // Mount routers after middleware
app.get("/", (_, res) => {
  res.json(
    "Welcome to the rflix backend. We do not store anything we just link tmdb response."
  );
});

app.listen(3000, () => console.log("Server ready on port 3000"));

export default app;
