import { ICriarAcesso } from "../models/ICriarAcesso";
import { IAcesso } from "../models/IAcesso";
import { IAcessoPaginacao } from "../models/IAcessoPaginacao";

import { IListarAcesso } from "../models/IListarAcesso";
export type ISearchParams = {
  nm_acesso: string;
  page: number;
  skip: number;
  take: number;
};

export interface IAcessoRepository {
  listar(acesso: IListarAcesso): Promise<IAcesso[]>;
  listarPorPaginacao({ nm_acesso, page, skip, take }: ISearchParams): Promise<IAcessoPaginacao>;
  buscarPorNome(nm_acesso: string): Promise<IAcesso | null>;
  buscarPorId(id_acesso: string): Promise<IAcesso | null>;
  criar(data: ICriarAcesso): Promise<IAcesso>;
  alterar(acesso: IAcesso): Promise<IAcesso>;
  remover(acesso: IAcesso): Promise<void>;
}
