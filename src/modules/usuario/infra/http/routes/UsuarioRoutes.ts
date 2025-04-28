import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";
import { UsuarioController } from "../controllers/UsuarioController";
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import { validarAcesso } from "@shared/infra/http/middlewares/validarAcesso";
import {
  validaAdicionarPerfilUsuario,
  validaAlterarAvatarUsuario,
  validaAlterarUsuario,
  validaCriarUsuario,
  validaRemoverUsuario,
} from "../middlewares/UsuarioValidate";
import { UsuarioAvatarController } from "../controllers/UsuarioAvatarController";

const usuarioRouter = Router();
const usuarioController = new UsuarioController();
const usuarioAvatarController = new UsuarioAvatarController();
const upload = multer(uploadConfig.multer);

usuarioRouter.use(isAuthenticated);
usuarioRouter.get("/v1/", validarAcesso("USUARIO_CONSULTAR"), usuarioController.listar);
usuarioRouter.post("/v1/", validarAcesso("USUARIO_CRIAR"), validaCriarUsuario, usuarioController.criar);
usuarioRouter.put("/v1/", validarAcesso("USUARIO_ALTERAR"), validaAlterarUsuario, usuarioController.alterar);

usuarioRouter.patch(
  "/avatar/v1/",

  validarAcesso("USUARIO_ALTERAR"),
  upload.single("avatar"),
  validaAlterarAvatarUsuario,

  usuarioAvatarController.alterar,
);

usuarioRouter.post(
  "/perfil/v1/",
  validarAcesso("USUARIO_ALTERAR"),
  validaAdicionarPerfilUsuario,
  usuarioController.adicionarPerfil,
);
usuarioRouter.delete(
  "/perfil/v1/",
  validarAcesso("USUARIO_ALTERAR"),
  validaRemoverUsuario,
  usuarioController.removerPerfil,
);

export default usuarioRouter;
