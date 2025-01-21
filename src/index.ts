process.loadEnvFile();
import express from "express";
import cors, { CorsOptions } from "cors";
import routes from "./routes";

const app: express.Application = express();
const urlList = [
  "http://localhost:5174",
  "https://afrj-crud-operations.netlify.app",
];
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin && urlList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

export default app;
