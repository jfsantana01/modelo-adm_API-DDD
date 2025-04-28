import { IPerfil } from "@modules/perfil/domain/models/IPerfil";

export interface IAlterarUsuario {
  id_usuario: string;
  nm_usuario?: string;
  ds_senha?: string;
  in_ativo?: boolean;
  perfis?: IPerfil[];
}
