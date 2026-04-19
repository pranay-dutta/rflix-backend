import { Router } from "express";
import ApiClient from "../services/api-client";
import { MovieDetails } from "@/interfaces/MovieDetails";
import { Images } from "@/interfaces/Images";
import Movie from "@/interfaces/Movie";
import { Credit } from "@/interfaces/Credit";

const router = Router();

// Return specific movie details
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const isValidMovieId = /^[0-9]+$/.test(id);

    if (!isValidMovieId) {
      res.status(400).json({ error: "Invalid movie ID" });
      return;
    }

    const apiClient = new ApiClient<MovieDetails>("/movie/" + id);
    const response: MovieDetails = await apiClient.get();
    res.status(200).json(response);
  } catch (err) {
    console.error("Error at /movie/:id", err);
    res.status(500).json({ error: "Failed to get the movie details." });
  }
});

//Return list of movie based on tag
const allowedTags = ["now_playing", "popular", "top_rated", "upcoming"];
router.get("/tag/:tag", async (req, res) => {
  const { tag } = req.params;
  const queryParams = { ...req.query };

  if (!allowedTags.includes(tag)) {
    res.status(400).json({ error: "Invalid movie tag" });
    return;
  }

  try {
    const apiClient = new ApiClient<Movie>("/movie/" + tag);

    const response = await apiClient.getAll({ params: queryParams });
    res.status(200).json(response);
  } catch (err) {
    console.log(`Error at /movie/${tag}`, err);
    res.status(500).json({ error: "Failed to get movie list." });
  }
});

//Return movie name logo images
router.get("/images/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = req.query;

    const apiClient = new ApiClient<Images>("/movie/" + id + "/images");
    const response: Images = await apiClient.get({ params: query });
    res.status(200).json(response);
  } catch (err) {
    console.error("Error at /movie/:id/images", err);
    res.status(500).json({ error: "Failed to get logo images." });
  }
});

//Return similar Movies
router.get("/similar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const queryParams = { ...req.query };

    const apiClient = new ApiClient(`/movie/${id}/similar`);
    const response = await apiClient.getAll({ params: queryParams });

    res.status(200).send(response);
  } catch (error) {
    console.log("Error at /similar/:id", error);
    res.status(500).json({ error: "Failed to get similar movies." });
  }
});

//Return movie video trailers
router.get("/videos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const queryParams = { ...req.query };

    const apiClient = new ApiClient(`/movie/${id}/videos`);
    const response = await apiClient.getAll({ params: queryParams });

    res.status(200).send(response);
  } catch (error) {
    console.log("Error at /videos/:id", error);
    res.status(500).json({ error: "Failed to get videos." });
  }
});

//Return movie credits
router.get("/credits/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const apiClient = new ApiClient<Credit>(`/movie/${id}/credits`);
    const response = await apiClient.get();
    res.status(200).json(response);
  } catch (err) {
    console.log(`Error at /movie/credits`, err);
    res.status(500).json({ error: "Failed to get movie credits." });
  }
});
export default router;
