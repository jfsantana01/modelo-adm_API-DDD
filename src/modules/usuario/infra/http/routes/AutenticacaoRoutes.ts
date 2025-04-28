import { Router } from "express";
import { SessionsController } from "../controllers/AutenticacaoController";
import rateLimiter from "@shared/infra/http/middlewares/rateLimiter";
import { autenticarUsuario } from "../middlewares/AutenticacaoValidate";

const autenticacaoRouter = Router();
const autenticacaoController = new SessionsController();

//autenticacaoRouter.use(rateLimiter);
autenticacaoRouter.post("/v1/", rateLimiter(1, 3), autenticarUsuario, autenticacaoController.autenticar);
export default autenticacaoRouter;
