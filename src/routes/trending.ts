import { Router } from "express";
import ApiClient from "../services/api-client";
import Movie from "@/interfaces/Movie";
import FetchResponse from "@/interfaces/FetchResponse";

const router = Router();

//Return trending movies shows [day | week]
router.get("/movie/:time", async (req, res) => {
  try {
    const { time } = req.params;
    const apiClient = new ApiClient<FetchResponse<Movie>>(
      `/trending/movie/${time}`
    );

    const response = await apiClient.get();
    res.status(200).json(response);
  } catch (err) {
    console.error("Error at /trending/movie", err);
    res.status(500).json({ error: "Failed to trending movies." });
  }
});

//Return trending tv shows [day | week]
router.get("/tv/:time", async (req, res) => {
  try {
    const { time } = req.params;
    const apiClient = new ApiClient<FetchResponse<Movie>>(
      `/trending/tv/${time}`
    );

    const response = await apiClient.get();
    res.status(200).json(response);
  } catch (err) {
    console.error("Error at /trending/tv", err);
    res.status(500).json({ error: "Failed to get trending tv shows." });
  }
});

export default router;
