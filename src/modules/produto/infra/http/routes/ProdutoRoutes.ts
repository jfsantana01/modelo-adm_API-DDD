import { Router } from "express";
import { ProdutoController } from "../controllers/ProdutoController";
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import { validarAcesso } from "@shared/infra/http/middlewares/validarAcesso";
import {
  validaAdicionarImagemAoProduto,
  validaAlterarProduto,
  validaCriarProduto,
  validaRemoverProduto,
} from "../middlewares/ProdutoValidate";

const produtoRouter = Router();
const produtoController = new ProdutoController();

produtoRouter.use(isAuthenticated);
produtoRouter.get("/v1/", validarAcesso("PRODUTO_CONSULTAR"), produtoController.listar);
produtoRouter.post("/v1/", validarAcesso("PRODUTO_CRIAR"), validaCriarProduto, produtoController.criar);
produtoRouter.put("/v1/", validarAcesso("PRODUTO_CRIAR"), validaAlterarProduto, produtoController.alterar);
produtoRouter.delete("/v1/", validarAcesso("PRODUTO_REMOVER"), validaRemoverProduto, produtoController.remover);
produtoRouter.post(
  "/imagem/v1/",
  validarAcesso("PERFIL_ALTERAR"),
  validaAdicionarImagemAoProduto,
  produtoController.adicionarImagem,
);
produtoRouter.delete("/imagem/v1/", validarAcesso("PERFIL_ALTERAR"), produtoController.removerImagem);

export default produtoRouter;
