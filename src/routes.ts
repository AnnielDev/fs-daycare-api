import { Router } from "express";
import picturesRoutes from "./routes/pictures.routes";

const router: Router = Router();

router.use("/pictures", picturesRoutes);

export default router;
