import { IProduto } from "@modules/produto/domain/models/IProduto";
import { Perfil } from "@modules/perfil/infra/typeorm/entities/PerfilEntity";
import { Column, CreateDateColumn, Entity, Index, JoinTable, ManyToMany, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Imagem } from "@modules/imagem/infra/typeorm/entities/ImagemEntity";

@Index("tbl_venda_produtos_pkey", ["id_produto"], { unique: true })
@Entity("tbl_venda_produtos", { schema: "venda" })
export class Produto implements IProduto {
  @Column("uuid", { primary: true, name: "id_produto" })
  id_produto: string = uuidv4();

  @Column("character varying", { name: "nm_produto", nullable: true, length: 100, unique: true })
  nm_produto: string;

  @Column("character varying", { name: "ds_produto", nullable: true, length: 200, unique: false })
  ds_produto: string;
  @Column("character varying", { name: "ds_produto2", nullable: true, length: 200, unique: false })
  ds_produto2: string;
  @Column("character varying", { name: "ds_produto3", nullable: true, length: 200, unique: false })
  ds_produto3: string;

  @Column("character varying", { name: "ds_codbarras", nullable: true, length: 200, unique: false })
  ds_codbarras: string;

  @Column("numeric", { name: "vl_produto", nullable: true, precision: 12, scale: 2, unique: false })
  vl_produto: number;

  @ManyToMany(() => Imagem, (imagem) => imagem.produtos, { onDelete: "CASCADE" })
  @JoinTable({
    name: "tbl_venda_produtos_imagems",
    joinColumn: { name: "id_perfil" },
    inverseJoinColumn: { name: "id_imagem" },
  })
  imagens: Imagem[];

  @Column("boolean", { name: "in_ativo", nullable: false, default: true })
  in_ativo: boolean;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;
}
