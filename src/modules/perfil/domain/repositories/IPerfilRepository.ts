import { ICriarPerfil } from "../models/ICriarPerfil";
import { IPerfil } from "../models/IPerfil";
import { IListarPerfil } from "../models/IListarPerfil";
export type ISearchParams = {
  nm_perfil: string;
  page: number;
  skip: number;
  take: number;
};

export interface IPerfilRepository {
  listar(perfil: IListarPerfil): Promise<IPerfil[]>;
  buscarPorNome(nm_perfil: string): Promise<IPerfil | null>;
  buscarPorId(id_perfil: string): Promise<IPerfil | null>;
  criar(data: ICriarPerfil): Promise<IPerfil>;
  alterar(perfil: IPerfil): Promise<IPerfil>;
  remover(perfil: IPerfil): Promise<void>;
}
