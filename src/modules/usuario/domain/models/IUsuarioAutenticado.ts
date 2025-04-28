import { ITokenAutenticacao } from "./ITokenAutenticacao";
export interface IUsuarioAutenticado {
  usuario: {
    id_usuario: string;
    nm_usuario: string;
    ds_login: string;
    perfis?: string[];
    acessos?: string[];
  };
  token: ITokenAutenticacao;
}
