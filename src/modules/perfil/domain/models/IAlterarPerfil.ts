import { IAcesso } from "@modules/acesso/domain/models/IAcesso";

export interface IAlterarPerfil {
  id_perfil: string;
  nm_perfil: string;
  ds_perfil: string;
  in_ativo: boolean;
  acessos?: IAcesso[];
}
