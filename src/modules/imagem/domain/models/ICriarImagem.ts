import { ITipoImagem } from "@modules/tipoImagem/domain/models/ITipoImagem";

export interface ICriarImagem {
  nm_imagem: string;
  ds_imagem: string;
  ds_imagem2: string;
  ds_imagem3: string;
  in_ativo: boolean;
  image_filename: string;
  tiposimagens: ITipoImagem[];
}
