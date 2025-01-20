process.loadEnvFile();
import express from "express";
import cors from "cors";
import routes from "./routes";

const app: express.Application = express();

app.use(express.json());
app.use(cors());
app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
