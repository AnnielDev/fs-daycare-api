import { Request, Response } from "express";
import cloudinary from "../utils/cloudinary";
import upload from "../utils/multer";

async function getPictures(req: Request, res: Response) {
  try {
    const result = await cloudinary.v2.api.resources({
      type: "upload",
      prefix: "",
      resource_type: "image",
      max_results: 2000,
    });
    res.status(200).json({ images: result.resources });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving pictures from Cloudinary.", error });
  }
}

async function getLatestPictures(req: Request, res: Response) {
  try {
    const result = await cloudinary.v2.api.resources({
      type: "upload",
      prefix: "",
      resource_type: "image",
      max_results: 7,
      sort_by: { created_at: "desc" },
    });
    res.status(200).json({ images: result.resources });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving latest pictures from Cloudinary.",
      error,
    });
  }
}

// function postPictures(req: Request, res: Response) {
//   try {
//     upload.single("file")(req, res, async (err) => {
//       if (err) {
//         return res
//           .status(400)
//           .json({ error: err, message: "Error uploading file." });
//       }

//       const image = req.file;
//       if (image) {
//         try {
//           const result = await cloudinary.v2.uploader.upload(image.path, {
//             folder: "",
//             resource_type: "image",
//           });
//           res
//             .status(200)
//             .json({ message: "File uploaded successfully.", result });
//         } catch (error: any) {
//           res
//             .status(500)
//             .json({ error, message: "Error uploading to Cloudinary." });
//         }
//       } else {
//         res.status(400).json({ message: "No file uploaded." });
//       }
//     });
//   } catch (error: any) {
//     res.status(500).json({ error: error });
//   }
// }
async function postPictures(req: Request, res: Response) {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ error: err, message: "Error uploading file." });
    }

    const image = req.file;
    if (image) {
      try {
        await cloudinary.v2.uploader
          .upload_stream(
            { folder: "", resource_type: "image" },
            (error, result) => {
              if (error) {
                return res
                  .status(500)
                  .json({ error, message: "Error uploading to Cloudinary." });
              }
              res
                .status(200)
                .json({ message: "File uploaded successfully.", result });
            }
          )
          .end(image.buffer);
      } catch (error: any) {
        res
          .status(500)
          .json({ error, message: "Error uploading to Cloudinary." });
      }
    } else {
      res.status(400).json({ message: "No file uploaded." });
    }
  });
}

async function deletePictures(req: Request, res: Response) {
  const { public_id } = req.params;
  try {
    await cloudinary.v2.uploader.destroy(public_id);
    res.status(200).json({ message: "Picture deleted successfully." });
  } catch (error: any) {
    res.status(500).json({ error, message: "Error deleting picture." });
  }
}

async function validatePictures(req: Request, res: Response) {
  const { authPassword } = req.body;
  if (authPassword === process.env.AUTH_PASSWORD) {
    res.status(200).json({ message: "Auth granted!" });
  } else {
    res.status(401).json({ message: "Wrong password!" });
  }
}

export {
  getPictures,
  postPictures,
  deletePictures,
  validatePictures,
  getLatestPictures,
};
