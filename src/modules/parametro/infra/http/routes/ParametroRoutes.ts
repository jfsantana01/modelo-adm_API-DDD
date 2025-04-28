import { Router } from "express";
import { ParametroController } from "../controllers/ParametroController";
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import { validarAcesso } from "@shared/infra/http/middlewares/validarAcesso";
import { validaAlterarParametro, validaCriarParametro, validaRemoverParametro } from "../middlewares/ParametroValidate";

const parametroRouter = Router();
const parametroController = new ParametroController();

parametroRouter.get("/v1/", isAuthenticated, validarAcesso("PARAMETRO_CONSULTAR"), parametroController.listar);

/**Rotas Abaixo nessecitam de autenticação */
parametroRouter.use(isAuthenticated);
/**Rotas Abaixo nessecitam de autenticação */

parametroRouter.post(
  "/v1/",
  isAuthenticated,
  validarAcesso("PARAMETRO_CRIAR"),
  validaCriarParametro,
  parametroController.criar,
);
parametroRouter.put("/v1/", validarAcesso("PARAMETRO_CRIAR"), validaAlterarParametro, parametroController.alterar);
parametroRouter.delete("/v1/", validarAcesso("PARAMETRO_REMOVER"), validaRemoverParametro, parametroController.remover);

export default parametroRouter;
