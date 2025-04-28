//import { IAdicionarPerfilAoUsuario } from "../models/IAdicionarPerfilAoUsuario";
import { ICriarUsuario } from "../models/ICriarUsuario";
import { IListarUsuarios } from "../models/IListarUsuarios";
import { IUsuario } from "../models/IUsuario";

export interface IUsuarioRepository {
  listar(usuario: IListarUsuarios): Promise<IUsuario[]>;
  buscarPorId(id_usuario: string): Promise<IUsuario | null>;
  buscarPorLogin(ds_login: string): Promise<IUsuario | null>;
  criar(data: ICriarUsuario): Promise<IUsuario>;
  alterar(usuario: IUsuario): Promise<IUsuario>;
}
