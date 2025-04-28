import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IProdutoRepository } from "@modules/produto/domain/repositories/IProdutoRepository";
import { IProduto } from "../domain/models/IProduto";
import { IRemoverImagemDoProduto } from "../domain/models/IRemoverImagemDoProduto";

@injectable()
export class RemoverImagemDoProdutoService {
  constructor(
    @inject("ProdutoRepository")
    private ProdutoRepository: IProdutoRepository,
  ) {}

  public async execute({ id_imagem, id_produto }: IRemoverImagemDoProduto): Promise<IProduto> {
    const produto = await this.ProdutoRepository.buscarPorId(id_produto);

    if (!produto || !id_produto) {
      throw new AppError("Produto não encontrado.", 404);
    }

    const jaPossuiImagem = produto.imagens.some((imagem) => imagem.id_imagem === id_imagem);
    if (!jaPossuiImagem) {
      throw new AppError("Imagem não encontrada neste Produto.", 409);
    }

    produto.imagens = produto.imagens.filter((p) => p.id_imagem !== id_imagem);

    await this.ProdutoRepository.alterar(produto);

    return produto;
  }
}
