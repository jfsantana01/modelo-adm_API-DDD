import { IPerfil } from "@modules/perfil/domain/models/IPerfil";

export interface IAlterarAcesso {
  id_acesso: string;
  nm_acesso: string;
  ds_acesso: string;
  in_ativo: boolean;
  perfis?: IPerfil[];
}
