import { IPerfil } from "@modules/perfil/domain/models/IPerfil";

export interface ICriarUsuario {
  nm_usuario: string;
  ds_login: string;
  ds_senha?: string;
  in_ativo?: boolean;
  perfis?: IPerfil[];
}
