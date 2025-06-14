import { Router } from "express";
import movieRoutes from "./movie";
import tvRoutes from "./tv";
import searchRoutes from "./serach";
import trendingRoutes from "./trending";

const router = Router();

router.use("/movie", movieRoutes);
router.use("/search", searchRoutes);
router.use("/trending", trendingRoutes);
router.use("/tv", tvRoutes);

export default router;
