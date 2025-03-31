import cors from "cors";
import "express-async-errors";
import express from "express";
import upLoadConfig from "@/configs/upload";
import { routes } from "./routes";
import { errorHandling } from "@/middlewares/error-handling";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(upLoadConfig.UPLOADS_FOLDER));

app.use(routes);
app.use(errorHandling);

export { app };
