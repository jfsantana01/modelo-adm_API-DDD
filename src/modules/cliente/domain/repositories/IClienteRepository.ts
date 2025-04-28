import { ICriarCliente } from "../models/ICriarCliente";
import { ICliente } from "../models/ICliente";
import { IListarCliente } from "../models/IListarCliente";
export type ISearchParams = {
  nm_cliente: string;
  page: number;
  skip: number;
  take: number;
};

export interface IClienteRepository {
  listar(cliente: IListarCliente): Promise<ICliente[]>;
  buscarPorLogin(ds_login: string): Promise<ICliente | null>;
  buscarPorId(id_cliente: string): Promise<ICliente | null>;
  criar(data: ICriarCliente): Promise<ICliente>;
  alterar(cliente: ICliente): Promise<ICliente>;
}
