import { Router } from "express";
import { TipoImagemController } from "../controllers/TipoImagemController";
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import { validarAcesso } from "@shared/infra/http/middlewares/validarAcesso";
import {
  validaAlterarTipoImagem,
  validaCriarTipoImagem,
  validaRemoverTipoImagem,
} from "../middlewares/TipoImagemValidate";

const tipoImagemRouter = Router();
const tipoImagemController = new TipoImagemController();

tipoImagemRouter.use(isAuthenticated);
tipoImagemRouter.get("/v1/", validarAcesso("TIPOIMAGEM_CONSULTAR"), tipoImagemController.listar);
tipoImagemRouter.post("/v1/", validarAcesso("TIPOIMAGEM_CRIAR"), validaCriarTipoImagem, tipoImagemController.criar);
tipoImagemRouter.put("/v1/", validarAcesso("TIPOIMAGEM_CRIAR"), validaAlterarTipoImagem, tipoImagemController.alterar);
tipoImagemRouter.delete(
  "/v1/",
  validarAcesso("TIPOIMAGEM_REMOVER"),
  validaRemoverTipoImagem,
  tipoImagemController.remover,
);

export default tipoImagemRouter;
