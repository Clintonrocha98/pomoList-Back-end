import "express-async-errors";
import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middleware/error";
import { routes } from "./routes/routes";

const app = express();

app.use(cors({ origin: true }));

app.use(express.json());

app.use(routes);

app.use(errorMiddleware);

export { app };
