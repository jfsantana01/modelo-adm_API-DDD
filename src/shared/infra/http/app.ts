import express, { Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import { errors } from "celebrate";
import routes from "./routes";
import AppError from "@shared/errors/AppError";
import "@shared/infra/typeorm";
import "@shared/container";
import uploadConfig from "@config/upload";
//import rateLimiter from "./middlewares/rateLimiter";
import { errorHandler } from "@shared/errors/ErrorHandler";
export const app = express();
app.use(cors());
app.use(express.json());
//app.use(rateLimiter);
app.use("/api/files", express.static(uploadConfig.directory));
app.use("/api/images", express.static("public/images"));
app.use(routes);
app.use(errors());
/**Nenhuma rota encontrada */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((req: Request, res: Response) => {
  throw new AppError("EndPoint Não Encontrado.", 404);
});

/**Tratamento de erros */
app.use(errorHandler);
