import express = require("express");
import {
  deletePictures,
  getPictures,
  postPictures,
  validatePictures,
} from "../controller/pictures.controller";

const router: express.Router = express.Router();

// GET

router.get("/getPicture", getPictures);

// POST

router.post("/postPicture", postPictures);
router.post("/validatePictures", validatePictures);

// DELETE

router.delete("/deletePicture/:public_id", deletePictures);

export default router;
