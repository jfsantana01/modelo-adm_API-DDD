import { IImagem } from "@modules/imagem/domain/models/IImagem";
export interface IProduto {
  id_produto: string;
  nm_produto: string;
  ds_produto: string;
  ds_produto2: string;
  ds_produto3: string;
  ds_codbarras: string;
  vl_produto: number;
  in_ativo: boolean;
  created_at: Date;
  updated_at: Date;
  imagens: IImagem[];
}
