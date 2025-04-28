import { IParametro } from "@modules/parametro/domain/models/IParametro";

import { Column, CreateDateColumn, Entity, Index, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Index("tbl_adm_parametros_pkey", ["id_parametro"], { unique: true })
@Entity("tbl_adm_parametros", { schema: "adm" })
export class Parametro implements IParametro {
  @Column("uuid", { primary: true, name: "id_parametro" })
  id_parametro: string = uuidv4(); // Inicializa com UUID gerado na aplicação

  @Column("character varying", { name: "nm_parametro", nullable: true, length: 100, unique: true })
  nm_parametro: string; //| null;

  @Column("character varying", { name: "vl_parametro1", nullable: true, length: 100 })
  vl_parametro1: string; //| null;

  @Column("character varying", { name: "vl_parametro2", nullable: true, length: 100 })
  vl_parametro2: string; //| null;

  @Column("character varying", { name: "vl_parametro3", nullable: true, length: 100})
  vl_parametro3: string; //| null;

  @Column("boolean", { name: "in_publico", nullable: false, default: false })
  in_publico: boolean;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;
}
