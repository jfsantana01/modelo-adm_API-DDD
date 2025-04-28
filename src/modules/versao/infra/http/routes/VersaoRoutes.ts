import { Router } from "express";
import { VersaoController } from "../controllers/VersaoController";
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import { validarAcesso } from "@shared/infra/http/middlewares/validarAcesso";

const versaoRouter = Router();
const versaoController = new VersaoController();

versaoRouter.get("/v1/", versaoController.listar);

/**Rotas Abaixo nessecitam de autenticação */
versaoRouter.use(isAuthenticated);
/**Rotas Abaixo nessecitam de autenticação */

versaoRouter.post("/v1/", isAuthenticated, validarAcesso("VERSAO_CRIAR"), versaoController.criar);
versaoRouter.put("/v1/", validarAcesso("VERSAO_CRIAR"), versaoController.alterar);
versaoRouter.delete("/v1/", validarAcesso("VERSAO_REMOVER"), versaoController.remover);

export default versaoRouter;
