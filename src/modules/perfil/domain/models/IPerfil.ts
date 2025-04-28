import { IAcesso } from "@modules/acesso/domain/models/IAcesso";
import { IUsuario } from "@modules/usuario/domain/models/IUsuario";

export interface IPerfil {
  id_perfil: string;
  nm_perfil: string;
  ds_perfil: string;
  in_ativo: boolean;
  created_at: Date;
  updated_at: Date;
  acessos: IAcesso[];
  usuarios: IUsuario[];
}
