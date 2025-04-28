import { IImagem } from "@modules/imagem/domain/models/IImagem";

export interface IAlterarTipoImagem {
  id_tipoimagem: string;
  nm_tipoimagem: string;
  ds_tipoimagem: string;
  in_ativo: boolean;
  imagens?: IImagem[];
}
