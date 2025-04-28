import { IAcesso } from "@modules/acesso/domain/models/IAcesso";

export interface ICriarPerfil {
  nm_perfil: string;
  ds_perfil: string;
  in_ativo?: boolean;
  acessos?: IAcesso[];
}
