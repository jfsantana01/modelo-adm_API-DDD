import { Router } from "express";
import { PerfilController } from "../controller/PerfilController";
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import { validarAcesso } from "@shared/infra/http/middlewares/validarAcesso";

const perfilRouter = Router();
const perfilController = new PerfilController();

perfilRouter.use(isAuthenticated);
perfilRouter.get("/v1/", validarAcesso("PERFIL_CONSULTAR"), perfilController.listar);
perfilRouter.post("/v1/", validarAcesso("PERFIL_CRIAR"), perfilController.criar);
perfilRouter.put("/v1/", validarAcesso("PERFIL_ALTERAR"), perfilController.alterar);
perfilRouter.delete("/v1/", validarAcesso("PERFIL_REMOVER"), perfilController.remover);
perfilRouter.post("/acesso/v1/", validarAcesso("PERFIL_ALTERAR"), perfilController.adicionarAcesso);
perfilRouter.delete("/acesso/v1/", validarAcesso("PERFIL_ALTERAR"), perfilController.removerAcesso);
export default perfilRouter;
