import { IVersao } from "../models/IVersao";

import { IListarVersao } from "../models/IListarVersao";
import { ICriarVersao } from "../models/ICriarVersao";

export interface IVersaoRepository {
  listar(versao: IListarVersao): Promise<IVersao[]>;
  buscarPorNome(nm_versao: string): Promise<IVersao | null>;
  buscarPorId(id_versao: string): Promise<IVersao | null>;
  criar(data: ICriarVersao): Promise<IVersao>;
  alterar(versao: IVersao): Promise<IVersao>;
  remover(versao: IVersao): Promise<void>;
}
