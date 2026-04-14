import { Router } from "express";
import ApiClient from "../services/api-client";

const router = Router();

router.get("/tv/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const apiClient = new ApiClient(`/tv/${id}`);
    const response = await apiClient.getAll({
      params: { append_to_response: "images" },
    });

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

router.get("/movie/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const apiClient = new ApiClient(`/movie/${id}`);
    const response = await apiClient.getAll({
      params: { append_to_response: "images" },
    });

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

export default router;
