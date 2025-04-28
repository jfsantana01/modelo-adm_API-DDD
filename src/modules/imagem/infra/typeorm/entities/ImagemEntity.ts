import { IImagem } from "@modules/imagem/domain/models/IImagem";
import { Produto } from "@modules/produto/infra/typeorm/entities/ProdutoEntity";
import { TipoImagem } from "@modules/tipoImagem/infra/typeorm/entities/TipoImagemEntity";
import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, Index, JoinTable, ManyToMany, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Index("tbl_venda_imagens_pkey", ["id_imagem"], { unique: true })
@Entity("tbl_venda_imagens", { schema: "venda" })
export class Imagem implements IImagem {
  @Column("uuid", { primary: true, name: "id_imagem" })
  id_imagem: string = uuidv4();

  @Column("character varying", { name: "nm_imagem", nullable: false, length: 100, unique: true })
  nm_imagem: string;

  @Column("character varying", { name: "ds_imagem", nullable: true, length: 200, unique: false })
  ds_imagem: string;
  @Column("character varying", { name: "ds_imagem2", nullable: true, length: 200, unique: false })
  ds_imagem2: string;
  @Column("character varying", { name: "ds_imagem3", nullable: true, length: 200, unique: false })
  ds_imagem3: string;

  @ManyToMany(() => TipoImagem, (tipoImagem) => tipoImagem.imagens, { onDelete: "CASCADE" })
  @JoinTable({
    name: "tbl_venda_imagens_tiposimagem",
    joinColumn: { name: "id_imagem" },
    inverseJoinColumn: { name: "id_tipoimagem" },
  })
  tiposimagem: TipoImagem[];

  @ManyToMany(() => Produto, (produto) => produto.imagens)
  produtos: Produto[];

  @Column("boolean", { name: "in_ativo", nullable: false, default: true })
  in_ativo: boolean;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;

  @Expose({ name: "imagem_url" })
  getImagemUrl(): string | null {
    if (!this.nm_imagem) {
      return null;
    }
    return `${process.env.BASE_URL}/${process.env.BASE_IMAGEM_URL}/${this.nm_imagem}`;
  }
}
