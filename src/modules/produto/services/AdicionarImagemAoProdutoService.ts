import AppError from "@shared/errors/AppError";

import { IProdutoRepository } from "@modules/produto/domain/repositories/IProdutoRepository";
import { IAdicionarImagemAoProduto } from "../domain/models/IAdicionarImagemAoProduto";
import { IImagemRepository } from "@modules/imagem/domain/repositories/IImagemRepository";
import { IProduto } from "../domain/models/IProduto";
import { inject, injectable } from "tsyringe";

@injectable()
export class AdicionarImagemAoProdutoService {
  constructor(
    @inject("ImagemRepository")
    private ImagemRepository: IImagemRepository,
    @inject("ProdutoRepository")
    private ProdutoRepository: IProdutoRepository,
  ) {}

  public async execute({ id_imagem, id_produto }: IAdicionarImagemAoProduto): Promise<IProduto> {
    const produto = await this.ProdutoRepository.buscarPorId(id_produto);

    if (!produto || !id_produto) {
      throw new AppError("Produto não encontrado.", 404);
    }
    if (!produto.imagens) produto.imagens = [];

    const imagem = await this.ImagemRepository.buscarPorId(id_imagem);
    if (!imagem || !id_imagem) {
      throw new AppError("Imagem não encontrada.", 404);
    }

    const jaPossuiImagem = produto.imagens.some((imagem) => imagem.id_imagem === id_imagem);
    if (jaPossuiImagem) {
      throw new AppError("Produto já possui esta imagem. ", 409);
    }

    produto.imagens.push(imagem);

    await this.ProdutoRepository.alterar(produto);

    return produto;
  }
}
