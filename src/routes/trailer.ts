import { getAllTitleVideos } from "../scripts/imdbVideos";
import { Router } from "express";
const router = Router();

router.get("/:imdbId", async (req, res) => {
  const { imdbId } = req.params;
  const videos = await getAllTitleVideos(imdbId, 1, "trailer");
  res.status(200).json({ streams: videos });
});
export default router;
