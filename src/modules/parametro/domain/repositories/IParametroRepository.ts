import { IParametro } from "../models/IParametro";

import { IListarParametro } from "../models/IListarParametro";
import { ICriarParametro } from "../models/ICriarParametro";

export interface IParametroRepository {
  listar(parametro: IListarParametro): Promise<IParametro[]>;
  buscarPorNome(nm_parametro: string): Promise<IParametro | null>;
  buscarPorId(id_parametro: string): Promise<IParametro | null>;
  criar(data: ICriarParametro): Promise<IParametro>;
  alterar(parametro: IParametro): Promise<IParametro>;
  remover(parametro: IParametro): Promise<void>;
}
