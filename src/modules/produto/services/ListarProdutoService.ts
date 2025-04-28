import { inject, injectable } from "tsyringe";
import RedisCache from "@shared/cache/RedisCache";
import { IProdutoRepository } from "../domain/repositories/IProdutoRepository";
import { IListarProduto } from "../domain/models/IListarProduto";
import { IProduto } from "../domain/models/IProduto";
const keyRedis = "produto";

@injectable()
export class ListarProdutoService {
  constructor(
    @inject("ProdutoRepository")
    private produtoRepository: IProdutoRepository,
  ) {}

  public async execute(produto: IListarProduto): Promise<IProduto[]> {
    const produtosRedis = await RedisCache.recuperar(keyRedis + JSON.stringify(produto));
    if (produtosRedis) return produtosRedis as IProduto[];
    const produtos = await this.produtoRepository.listar(produto);
    if (produtos.length > 0) RedisCache.salvar(keyRedis + JSON.stringify(produto), produtos);
    return produtos;
  }
}
