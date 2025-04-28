import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IAlterarProduto } from "../domain/models/IAlterarProduto";
import { IProdutoRepository } from "../domain/repositories/IProdutoRepository";
import { IProduto } from "../domain/models/IProduto";
import RedisCache from "@shared/cache/RedisCache";
const keyRedis = "produto";

@injectable()
export class AlterarProdutoService {
  constructor(
    @inject("ProdutoRepository")
    private ProdutoRepository: IProdutoRepository,
  ) {}

  public async execute(produto: IAlterarProduto): Promise<IProduto> {
    const produtoResponse = await this.ProdutoRepository.buscarPorId(produto.id_produto);

    if (!produtoResponse || !produto.id_produto) {
      throw new AppError("Produto não Encontrado.", 404);
    }

    if (produto.nm_produto) produtoResponse.nm_produto = produto.nm_produto; //?.toUpperCase();
    if (produto.ds_produto) produtoResponse.ds_produto = produto.ds_produto; //?.toUpperCase();
    if (produto.ds_produto2) produtoResponse.ds_produto2 = produto.ds_produto2; //?.toUpperCase();
    if (produto.ds_produto3) produtoResponse.ds_produto3 = produto.ds_produto3; //?.toUpperCase();

    // if (produto.vl_produto) produtoResponse.vl_produto = produto.vl_produto;

    if (typeof produto.in_ativo === "boolean") produtoResponse.in_ativo = produto.in_ativo;

    await this.ProdutoRepository.alterar(produtoResponse);
    RedisCache.invalidarTodasAsKeys(keyRedis);
    return produtoResponse;
  }
}
