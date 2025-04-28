import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICriarProduto } from "../domain/models/ICriarProduto";
import { IProduto } from "../domain/models/IProduto";
import { IProdutoRepository } from "../domain/repositories/IProdutoRepository";

@injectable()
export class CriarProdutoService {
  constructor(
    @inject("ProdutoRepository")
    private ProdutoRepository: IProdutoRepository,
  ) {}

  public async execute(produto: ICriarProduto): Promise<IProduto> {
    const produtoExiste = await this.ProdutoRepository.buscarPorNome(produto.nm_produto);

    if (produtoExiste) {
      throw new AppError("Já existe um produto com este nome.", 409);
    }

    //produto.nm_produto = produto.nm_produto?.toUpperCase();
    //produto.ds_produto = produto.ds_produto?.toUpperCase();

    const produtoResponse = await this.ProdutoRepository.criar(produto);

    return produtoResponse;
  }
}
