import multer from "multer";
import fs from "fs";
import path from "path";

// const uploadsDir = path.join(__dirname, "../../uploads");
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadsDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export default upload;
