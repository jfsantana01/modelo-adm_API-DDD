import { IProduto } from "@modules/produto/domain/models/IProduto";
import { ITipoImagem } from "@modules/tipoImagem/domain/models/ITipoImagem";

export interface IImagem {
  id_imagem: string;
  nm_imagem: string;
  ds_imagem: string;
  ds_imagem2: string;
  ds_imagem3: string;
  in_ativo: boolean;
  created_at: Date;
  updated_at: Date;
  tiposimagem: ITipoImagem[];
  produtos: IProduto[];
}
