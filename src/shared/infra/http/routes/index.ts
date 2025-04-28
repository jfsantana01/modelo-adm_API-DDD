import acessoRouter from "@modules/acesso/infra/http/routes/AcessoRoutes";
import clienteRouter from "@modules/cliente/infra/http/routes/ClienteRoutes";
import imagemRouter from "@modules/imagem/infra/http/routes/ImagemRoutes";
import parametroRouter from "@modules/parametro/infra/http/routes/ParametroRoutes";
import perfilRouter from "@modules/perfil/infra/http/routes/PerfilRoutes";
import produtoRouter from "@modules/produto/infra/http/routes/ProdutoRoutes";
import tipoImagemRouter from "@modules/tipoImagem/infra/http/routes/TipoImagemRoutes";
import autenticacaoRouter from "@modules/usuario/infra/http/routes/AutenticacaoRoutes";
import usuarioRouter from "@modules/usuario/infra/http/routes/UsuarioRoutes";
import versaoRouter from "@modules/versao/infra/http/routes/VersaoRoutes";

import { Router } from "express";
const routes = Router();

routes.use("/api/auth", autenticacaoRouter);
routes.use("/api/usuario", usuarioRouter);
routes.use("/api/acesso", acessoRouter);
routes.use("/api/perfil", perfilRouter);
routes.use("/api/versao", versaoRouter);
routes.use("/api/parametro", parametroRouter);
routes.use("/api/cliente", clienteRouter);
routes.use("/api/imagem", imagemRouter);
routes.use("/api/tipoimagem", tipoImagemRouter);
routes.use("/api/produto", produtoRouter);

export default routes;
