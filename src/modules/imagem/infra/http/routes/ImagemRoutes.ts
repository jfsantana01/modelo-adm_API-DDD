import { Router } from "express";
import { ImagemController } from "../controllers/ImagemController";
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import { validarAcesso } from "@shared/infra/http/middlewares/validarAcesso";
import {
  validaAdicionarTipoImagem,
  validaAlterarImagem,
  validaCriarImagem,
  validaRemoverImagem,
} from "../middlewares/ImagemValidate";
import multer from "multer";
import uploadConfig from "@config/upload";
const imagemRouter = Router();
const imagemController = new ImagemController();
const upload = multer(uploadConfig.multer);

// imagemRouter.use(isAuthenticated);
imagemRouter.get("/v1/", imagemController.listar);
imagemRouter.post(
  "/v1/",
  isAuthenticated,
  validarAcesso("IMAGEM_CRIAR"),
  upload.single("imagem"),
  validaCriarImagem,
  imagemController.criar,
);
imagemRouter.put(
  "/v1/",
  isAuthenticated,
  validarAcesso("IMAGEM_ALTERAR"),
  upload.single("imagem"),
  validaAlterarImagem,
  imagemController.alterar,
);
imagemRouter.delete(
  "/v1/",
  isAuthenticated,
  validarAcesso("IMAGEM_REMOVER"),
  validaRemoverImagem,
  imagemController.remover,
);
imagemRouter.post(
  "/tipoimagem/v1/",
  isAuthenticated,
  validarAcesso("IMAGEM_ALTERAR"),
  validaAdicionarTipoImagem,
  imagemController.adicionarTipoImagem,
);

export default imagemRouter;
