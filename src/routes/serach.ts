import { Router } from "express";
import ApiClient from "../services/api-client";
import TvSeries from "@/interfaces/TvSeries";
import Movie from "@/interfaces/Movie";

const router = Router();

router.get("/movie", async (req, res) => {
  try {
    const searchParams = { ...req.query };
    const apiClient = new ApiClient<Movie>("/search/movie");

    const response = await apiClient.getAll({ params: searchParams });
    res.status(200).send(response);
  } catch (error) {
    console.log("Error at /search/movie", error);
    res.send(500).send({ error: "Internal server error" });
  }
});

router.get("/tv", async (req, res) => {
  try {
    const searchParams = { ...req.query };
    const apiClient = new ApiClient<TvSeries>("/search/tv");

    const response = await apiClient.getAll({ params: searchParams });
    res.status(200).send(response);
  } catch (error) {
    console.log("Error at /search/tv", error);
    res.send(500).send({ error: "Internal server error" });
  }
});

export default router;
