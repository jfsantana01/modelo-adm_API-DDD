import { ICriarImagem } from "../models/ICriarImagem";
import { IImagem } from "../models/IImagem";

import { IListarImagem } from "../models/IListarImagem";
export type ISearchParams = {
  nm_imagem: string;
  page: number;
  skip: number;
  take: number;
};

export interface IImagemRepository {
  listar(imagem: IListarImagem): Promise<IImagem[]>;
  buscarPorNome(nm_imagem: string): Promise<IImagem | null>;
  buscarPorId(id_imagem: string): Promise<IImagem | null>;
  criar(data: ICriarImagem): Promise<IImagem>;
  alterar(imagem: IImagem): Promise<IImagem>;
  remover(imagem: IImagem): Promise<void>;
}
