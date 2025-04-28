import { FindOptionsWhere, ILike, In, Repository } from "typeorm";
import { dataSource } from "@shared/infra/typeorm";
import { IProdutoRepository, ISearchParams } from "../../../domain/repositories/IProdutoRepository";
import { ICriarProduto } from "../../../domain/models/ICriarProduto";

import { IListarProduto } from "@modules/produto/domain/models/IListarProduto";
import { IProduto } from "@modules/produto/domain/models/IProduto";
import AppError from "@shared/errors/AppError";
import { Produto } from "../entities/ProdutoEntity";

export class ProdutoRepository implements IProdutoRepository {
  private ormRepository: Repository<Produto>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Produto);
  }
  public async listar(produtoRequest: IListarProduto): Promise<IProduto[]> {
    const condicao: FindOptionsWhere<Produto> = {};

    if (produtoRequest.ds_produto) {
      condicao.ds_produto = ILike(`%${produtoRequest.ds_produto?.toString()}%`);
    }
    if (produtoRequest.nm_produto) {
      condicao.nm_produto = ILike(`%${produtoRequest.nm_produto?.toString()}%`);
    }
    if (produtoRequest.id_produto) {
      condicao.id_produto = produtoRequest.id_produto;
    }
    if (produtoRequest.vl_produto) {
      condicao.vl_produto = Number(produtoRequest.vl_produto);
    }

    const result = await this.ormRepository.find({
      where: condicao,
      relations: { imagens: true },
      order: {
        nm_produto: "ASC",
      },
    });
    if (result.length == 0) throw new AppError("Produto não encontrado para o filtro informado.", 404);

    return result;
  }
  public async criar(produtoRequest: ICriarProduto): Promise<Produto> {
    const produto = this.ormRepository.create(produtoRequest);
    await this.ormRepository.save(produto);
    return produto;
  }

  public async alterar(produto: Produto): Promise<Produto> {
    await this.ormRepository.save(produto);
    return produto;
  }

  public async remover(produto: Produto): Promise<void> {
    await this.ormRepository.remove(produto);
  }

  public async buscarPorNome(nm_produto: string): Promise<Produto | null> {
    const produto = await this.ormRepository.findOneBy({
      nm_produto,
    });

    return produto;
  }

  public async buscarPorId(id_produto: string): Promise<Produto | null> {
    const produto = await this.ormRepository.findOne({
      where: { id_produto: id_produto },
      relations: { imagens: true },
    });
    // const produto = await this.ormRepository.findOneBy({
    //   id_produto,
    // });

    return produto;
  }
}
