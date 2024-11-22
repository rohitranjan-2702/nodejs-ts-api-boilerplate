import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./env";

const app: Express = express();
const logger = morgan("tiny");
const port = env.PORT || 8080;

app.use(cors());
app.use(helmet());
app.use(logger);
app.use(express.json());

app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, AUTHORIZATION"
  );
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Auth server running smoothly 🚀");
});

app.use((_, res) => {
  res.status(404).send("Not found");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
