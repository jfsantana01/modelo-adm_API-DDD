import { ICriarTipoImagem } from "../models/ICriarTipoImagem";
import { ITipoImagem } from "../models/ITipoImagem";

import { IListarTipoImagem } from "../models/IListarTipoImagem";
export type ISearchParams = {
  nm_tipoimagem: string;
  page: number;
  skip: number;
  take: number;
};

export interface ITipoImagemRepository {
  listar(tipoimagem: IListarTipoImagem): Promise<ITipoImagem[]>;
  buscarPorNome(nm_tipoimagem: string): Promise<ITipoImagem | null>;
  buscarPorId(id_tipoimagem: string): Promise<ITipoImagem | null>;
  criar(data: ICriarTipoImagem): Promise<ITipoImagem>;
  alterar(tipoimagem: ITipoImagem): Promise<ITipoImagem>;
  remover(tipoimagem: ITipoImagem): Promise<void>;
}
