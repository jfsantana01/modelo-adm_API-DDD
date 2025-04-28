import { IPerfil } from "@modules/perfil/domain/models/IPerfil";

export interface IAcesso {
  id_acesso: string;
  nm_acesso: string;
  ds_acesso: string;
  in_ativo: boolean;
  created_at: Date;
  updated_at: Date;
  perfis: IPerfil[];
}
