import express from "express";
import { routes } from "./routes";
import cors from "cors";

const app = express();

const port = process.env.PORT || 3333;

app.use(cors({ origin: true }));

app.use(express.json());

app.use(routes);

app.listen(port, () => {
  console.log(`server is running ${port}`);
});
