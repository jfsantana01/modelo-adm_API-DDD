import { IPerfil } from "@modules/perfil/domain/models/IPerfil";

export interface IUsuario {
  id_usuario: string;
  nm_usuario: string;
  ds_login: string;
  ds_senha: string;
  ds_senha2: string;
  ds_senha3: string;
  in_ativo: boolean;
  created_at: Date;
  updated_at: Date;
  perfis?: IPerfil[];
  avatar: string;
}
