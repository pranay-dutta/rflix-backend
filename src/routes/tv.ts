import TvSeries from "@/interfaces/TvSeries";
import { TvSeriesDetails } from "@/interfaces/TvSeriesDetails";
import ApiClient from "../services/api-client";
import Season from "@/interfaces/Season";
import { Router } from "express";

const router = Router();

//Return details of a tv show
router.get("/:series_id", async (req, res) => {
  try {
    const { series_id } = req.params;
    const apiClient = new ApiClient<TvSeriesDetails>("/tv/" + series_id);

    const response = await apiClient.get();
    res.status(200).json(response);
  } catch (err) {
    console.error("Error at /tvshow/id :", err);
    res.status(500).json({ error: "Failed to get the tv show." });
  }
});

//Return similar tv shows
router.get("/:series_id/similar", async (req, res) => {
  try {
    const { series_id } = req.params;

    const apiClient = new ApiClient<TvSeries>(`/tv/${series_id}/similar`);
    const response = await apiClient.getAll();

    res.status(200).send(response);
  } catch (error) {
    console.log("Error at /similar/tv", error);
    res.status(500).json({ error: "Failed to get similar shows." });
  }
});

//Return list of tv shows based on tag
const allowedTags = ["popular", "top_rated", "airing_today", "on_the_air"];
router.get("/tag/:tag", async (req, res) => {
  const { tag } = req.params;
  const queryParams = { ...req.query };

  if (!allowedTags.includes(tag)) {
    res.status(400).json({ error: "Invalid movie tag" });
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
router.get("/:series_id/season/:season_number", async (req, res) => {
  const { series_id, season_number } = req.params;

  try {
    const apiClient = new ApiClient<Season>(
      `/tv/${series_id}/season/${season_number}`
    );

    const response = await apiClient.get();
    res.status(200).json(response);
  } catch (err) {
    console.log(`Error at /tv/series/season}`, err);
    res.status(500).json({ error: "Failed to get tv list." });
  }
});
export default router;
