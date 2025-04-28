import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IRemoverProduto } from "../domain/models/IRemoverProduto";
import { IProdutoRepository } from "../domain/repositories/IProdutoRepository";
import RedisCache from "@shared/cache/RedisCache";
const keyRedis = "produto";
@injectable()
export class RemoverProdutoService {
  constructor(
    @inject("ProdutoRepository")
    private ProdutoRepository: IProdutoRepository,
  ) {}

  public async execute({ id_produto }: IRemoverProduto): Promise<void> {
    const Produto = await this.ProdutoRepository.buscarPorId(id_produto);

    if (!Produto || !id_produto) {
      throw new AppError("Produto não encontrado.", 404);
    }
    await this.ProdutoRepository.remover(Produto);
    RedisCache.invalidarTodasAsKeys(keyRedis);
  }
}
