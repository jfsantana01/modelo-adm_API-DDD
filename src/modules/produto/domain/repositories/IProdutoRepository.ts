import { ICriarProduto } from "../models/ICriarProduto";
import { IProduto } from "../models/IProduto";

import { IListarProduto } from "../models/IListarProduto";
export type ISearchParams = {
  nm_produto: string;
  page: number;
  skip: number;
  take: number;
};

export interface IProdutoRepository {
  listar(produto: IListarProduto): Promise<IProduto[]>;
  buscarPorNome(nm_produto: string): Promise<IProduto | null>;
  buscarPorId(id_produto: string): Promise<IProduto | null>;
  criar(data: ICriarProduto): Promise<IProduto>;
  alterar(produto: IProduto): Promise<IProduto>;
  remover(produto: IProduto): Promise<void>;
}
