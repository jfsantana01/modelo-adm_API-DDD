import { IVersao } from "@modules/versao/domain/models/IVersao";

import { Column, CreateDateColumn, Entity, Index, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Index("tbl_adm_versoes_pkey", ["id_versao"], { unique: true })
@Entity("tbl_adm_versoes", { schema: "adm" })
export class Versao implements IVersao {
  @Column("uuid", { primary: true, name: "id_versao" })
  id_versao: string = uuidv4();

  @Column("character varying", { name: "nm_versao", nullable: true, length: 100, unique: true })
  nm_versao: string;

  @Column("character varying", { name: "ds_versao", nullable: true, length: 200, unique: false })
  ds_versao: string;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;
}
