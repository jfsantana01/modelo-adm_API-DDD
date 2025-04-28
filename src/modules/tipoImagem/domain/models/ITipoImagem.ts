import { IImagem } from "@modules/imagem/domain/models/IImagem";

export interface ITipoImagem {
  id_tipoimagem: string;
  nm_tipoimagem: string;
  ds_tipoimagem: string;
  in_ativo: boolean;
  created_at: Date;
  updated_at: Date;
  imagens: IImagem[];
}
