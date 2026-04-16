import { getAllTitleVideos } from "../scripts/imdbVideos";
import ApiClient from "../services/api-client";
import { Router } from "express";
const router = Router();

//movie or tv show id
interface Data {
  external_ids: {
    imdb_id: string;
  };
}

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const type = req.query.type as string;

  const client = new ApiClient<Data>(`/${type}/${id}`);
  const response = await client.get({
    params: { append_to_response: "external_ids" },
  });

  const imdbId = response.external_ids.imdb_id;
  const videos = await getAllTitleVideos(imdbId, 1, "trailer");

  res.status(200).json({ streams: videos });
});
export default router;
