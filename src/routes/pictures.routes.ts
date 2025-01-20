import express = require("express");
import {
  deletePictures,
  getPictures,
  postPictures,
} from "../controller/pictures.controller";

const router: express.Router = express.Router();

// GET

router.get("/getPicture", getPictures);

// POST

router.post("/postPicture", postPictures);

// DELETE

router.delete("/deletePicture/:public_id", deletePictures);

export default router;
