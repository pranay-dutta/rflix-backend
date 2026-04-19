import TvSeries from "@/interfaces/TvSeries";
import { TvSeriesDetails } from "@/interfaces/TvSeriesDetails";
import ApiClient from "../services/api-client";
import Season from "@/interfaces/Season";
import { Router } from "express";
import { Credit } from "@/interfaces/Credit";
import { Images } from "@/interfaces/Images";

const router = Router();

//Return movie name logo images
router.get("/images/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const apiClient = new ApiClient<Images>("/tv/" + id + "/images");
    const response: Images = await apiClient.get();
    res.status(200).json(response);
  } catch (err) {
    console.error("Error at /tv/:id/images", err);
    res.status(500).json({ error: "Failed to get logo images." });
  }
});

//Return details of a tv show
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const apiClient = new ApiClient<TvSeriesDetails>("/tv/" + id);

    const response = await apiClient.get();
    res.status(200).json(response);
  } catch (err) {
    console.error("Error at /tv/:id :", err);
    res.status(500).json({ error: "Failed to get the tv show." });
  }
});

//Return similar tv shows
router.get("/:id/similar", async (req, res) => {
  try {
    const { id } = req.params;

    const apiClient = new ApiClient<TvSeries>(`/tv/${id}/similar`);
    const response = await apiClient.getAll();

    res.status(200).send(response);
  } catch (error) {
    console.log("Error at /similar/tv", error);
    res.status(500).json({ error: "Failed to get similar shows." });
  }
});

//Return tv series video trailers
router.get("/videos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const queryParams = { ...req.query };

    const apiClient = new ApiClient(`/tv/${id}/videos`);
    const response = await apiClient.getAll({ params: queryParams });

    res.status(200).send(response);
  } catch (error) {
    console.log("Error at /videos/:id", error);
    res.status(500).json({ error: "Failed to get videos." });
  }
});

//Return list of tv shows based on tag
const allowedTags = ["popular", "top_rated", "airing_today", "on_the_air"];
router.get("/tag/:tag", async (req, res) => {
  const { tag } = req.params;
  const queryParams = { ...req.query };

  if (!allowedTags.includes(tag)) {
    res.status(400).json({ error: "Invalid tv show tag" });
    return;
  }

  try {
    const apiClient = new ApiClient<TvSeries>("/tv/" + tag);

    const response = await apiClient.getAll({ params: queryParams });
    res.status(200).json(response);
  } catch (err) {
    console.log(`Error at /tv/${tag}`, err);
    res.status(500).json({ error: "Failed to get tv list." });
  }
});

//Return all episode of a season
router.get("/:id/season/:season_number", async (req, res) => {
  const { id, season_number } = req.params;

  try {
    const apiClient = new ApiClient<Season>(
      `/tv/${id}/season/${season_number}`
    );

    const response = await apiClient.get();
    res.status(200).json(response);
  } catch (err) {
    console.log(`Error at /tv/${id}/season/${season_number}`, err);
    res.status(500).json({ error: "Failed to get tv list." });
  }
});

//Return tv series credits
router.get("/credits/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const apiClient = new ApiClient<Credit>(`/tv/${id}/credits`);
    const response = await apiClient.get();
    res.status(200).json(response);
  } catch (err) {
    console.log(`Error at /tv/${id}/credits`, err);
    res.status(500).json({ error: "Failed to get tv credits." });
  }
});
export default router;
