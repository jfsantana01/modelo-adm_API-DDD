import { Request, Response } from "express";
import { container } from "tsyringe";
import { CriarProdutoService } from "@modules/produto/services/CriarProdutoService";
import { AlterarProdutoService } from "@modules/produto/services/AlterarProdutoService";
import { RemoverProdutoService } from "@modules/produto/services/RemoverProdutoService";
import { ListarProdutoService } from "@modules/produto/services/ListarProdutoService";
import { sucesso } from "@shared/responses/AppResponse";
import { ICriarProduto } from "@modules/produto/domain/models/ICriarProduto";
import { IAlterarProduto } from "@modules/produto/domain/models/IAlterarProduto";
import { IListarProduto } from "@modules/produto/domain/models/IListarProduto";
import { AdicionarImagemAoProdutoService } from "@modules/produto/services/AdicionarImagemAoProdutoService";
import { RemoverImagemDoProdutoService } from "@modules/produto/services/RemoverImagemDoProdutoService";
import { instanceToPlain } from "class-transformer";

export class ProdutoController {
  public async listar(req: Request, res: Response): Promise<Response> {
    const produto: IListarProduto = {
      id_produto: req.query.id_produto as string,
      nm_produto: req.query.nm_produto as string,
      ds_produto: req.query.ds_produto as string,
      ds_produto2: req.query.ds_produto2 as string,
      ds_produto3: req.query.ds_produto3 as string,
      ds_codbarras: req.query.ds_codbarras as string,
      vl_produto: req.query.vl_produto as string,
    };
    const listarProduto = container.resolve(ListarProdutoService);
    const produtoResponse = await listarProduto.execute(produto);

    return res.json(sucesso(instanceToPlain(produtoResponse)));
  }

  public async criar(req: Request, res: Response): Promise<Response> {
    const produto: ICriarProduto = {
      nm_produto: req.body.nm_produto,
      ds_produto: req.body.ds_produto,
      ds_produto2: req.body.ds_produto2,
      ds_produto3: req.body.ds_produto3,
      ds_codbarras: req.body.ds_codbarras,
      vl_produto: req.body.vl_produto,
      in_ativo: req.body.in_ativo,
    };

    const criarProduto = container.resolve(CriarProdutoService);
    const produtoResponse = await criarProduto.execute(produto);

    return res.json(sucesso([produtoResponse], "Produto Criado"));
  }

  public async alterar(req: Request, res: Response): Promise<Response> {
    const produto: IAlterarProduto = {
      id_produto: req.body.id_produto,
      nm_produto: req.body.nm_produto,
      ds_produto: req.body.ds_produto,
      ds_produto2: req.body.ds_produto2,
      ds_produto3: req.body.ds_produto3,
      ds_codbarras: req.body.ds_codbarras,
      vl_produto: req.body.vl_produto,
      in_ativo: req.body.in_ativo,
    };

    const alterarProduto = container.resolve(AlterarProdutoService);
    const produtoResponse = await alterarProduto.execute(produto);
    return res.json(sucesso([produtoResponse], "Produto Alterado"));
  }

  public async remover(req: Request, res: Response): Promise<Response> {
    const { id_produto } = req.body;

    const deleteProduto = container.resolve(RemoverProdutoService);

    await deleteProduto.execute({ id_produto });

    return res.json(sucesso([], "Produto Removido"));
  }
  public async adicionarImagem(req: Request, res: Response): Promise<Response> {
    const { id_imagem, id_produto } = req.body;

    const adicionarImagem = container.resolve(AdicionarImagemAoProdutoService);

    const produto = await adicionarImagem.execute({
      id_imagem,
      id_produto,
    });

    return res.json(sucesso([instanceToPlain(produto)], "Imagem Adicionado."));
  }
  public async removerImagem(req: Request, res: Response): Promise<Response> {
    const { id_imagem, id_produto } = req.body;

    const removerImagem = container.resolve(RemoverImagemDoProdutoService);

    const produto = await removerImagem.execute({
      id_imagem,
      id_produto,
    });

    return res.json(sucesso([produto], "Imagem Removido."));
  }
}
