import express = require("express");
import {
  deletePictures,
  getPictures,
  postPictures,
  validatePictures,
  getLatestPictures,
} from "../controller/pictures.controller";

const router: express.Router = express.Router();

// GET

router.get("/getPictures", getPictures);
router.get("/getLatestPictures", getLatestPictures);


// POST

router.post("/postPicture", postPictures);
router.post("/validatePictures", validatePictures);

// DELETE

router.delete("/deletePicture/:public_id", deletePictures);

export default router;
