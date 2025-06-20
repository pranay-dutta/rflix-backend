import { Router } from "express";
import ApiClient from "../services/api-client";
import Movie from "@/interfaces/Movie";
import TvSeries from "@/interfaces/TvSeries";

const router = Router();

router.get("/movie", async (req, res) => {
  try {
    const searchParams = { ...req.query };
    const apiClient = new ApiClient<Movie>("/discover/movie");

    const response = await apiClient.getAll({ params: searchParams });
    res.status(200).send(response);
  } catch (error) {
    console.log("Error at /discover/movie", error);
    res.send(500).send({ error: "Internal server error" });
  }
});

router.get("/tv", async (req, res) => {
  try {
    const searchParams = { ...req.query };
    const apiClient = new ApiClient<TvSeries>("/discover/tv");

    const response = await apiClient.getAll({ params: searchParams });
    res.status(200).send(response);
  } catch (error) {
    console.log("Error at /discover/movie", error);
    res.send(500).send({ error: "Internal server error" });
  }
});

export default router