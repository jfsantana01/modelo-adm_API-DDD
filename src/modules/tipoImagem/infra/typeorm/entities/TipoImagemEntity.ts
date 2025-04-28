import { ITipoImagem } from "@modules/tipoImagem/domain/models/ITipoImagem";
import { Imagem } from "@modules/imagem/infra/typeorm/entities/ImagemEntity";
import { Column, CreateDateColumn, Entity, Index, ManyToMany, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Index("tbl_venda_tiposimagem_pkey", ["id_tipoimagem"], { unique: true })
@Entity("tbl_venda_tiposimagem", { schema: "venda" })
export class TipoImagem implements ITipoImagem {
  @Column("uuid", { primary: true, name: "id_tipoimagem" })
  id_tipoimagem: string = uuidv4(); // Inicializa com UUID gerado na aplicação

  @Column("character varying", { name: "nm_tipoimagem", nullable: false, length: 100, unique: true })
  nm_tipoimagem: string; //| null;

  @Column("character varying", { name: "ds_tipoimagem", nullable: true, length: 200, unique: false })
  ds_tipoimagem: string; //| null;

  @ManyToMany(() => Imagem, (imagem) => imagem.tiposimagem)
  imagens: Imagem[];

  @Column("boolean", { name: "in_ativo", nullable: false, default: true })
  in_ativo: boolean;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;
}
