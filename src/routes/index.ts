import { Router } from "express";
import movieRoutes from "./movie";
import tvRoutes from "./tv";
import searchRoutes from "./serach";
import trendingRoutes from "./trending";
import discoverRoutes from "./discover"

const router = Router();

router.use("/movie", movieRoutes);
router.use("/search", searchRoutes);
router.use("/trending", trendingRoutes);
router.use("/tv", tvRoutes);
router.use("/discover", discoverRoutes);

export default router;
