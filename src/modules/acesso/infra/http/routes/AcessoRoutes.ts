import { Router } from "express";
import { AcessoController } from "../controllers/AcessoController";
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import { validarAcesso } from "@shared/infra/http/middlewares/validarAcesso";

const acessoRouter = Router();
const acessoController = new AcessoController();

acessoRouter.use(isAuthenticated);
acessoRouter.get("/v1/", validarAcesso("ACESSO_CONSULTAR"), acessoController.listar);
acessoRouter.get("/porpagina/v1/", validarAcesso("ACESSO_CONSULTAR"), acessoController.listarPorPaginacao);
acessoRouter.post("/v1/", validarAcesso("ACESSO_CRIAR"), acessoController.criar);
acessoRouter.put("/v1/", validarAcesso("ACESSO_CRIAR"), acessoController.alterar);
acessoRouter.delete("/v1/", validarAcesso("ACESSO_REMOVER"), acessoController.remover);

export default acessoRouter;
