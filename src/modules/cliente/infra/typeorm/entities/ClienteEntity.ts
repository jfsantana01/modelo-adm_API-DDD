import { ICliente } from "@modules/cliente/domain/models/ICliente";
import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, Index, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Index("tbl_venda_clientes_pkey", ["id_cliente"], { unique: true })
@Entity("tbl_venda_clientes", { schema: "venda" })
export class Cliente implements ICliente {
  @Column("uuid", { primary: true, name: "id_cliente" })
  id_cliente: string = uuidv4();

  @Column("character varying", { name: "ds_login", nullable: true, length: 100, unique: true })
  ds_login: string;

  @Column("character varying", { name: "nm_cliente", nullable: true, length: 100 })
  nm_cliente: string;

  @Column("character varying", { name: "nr_cpf", nullable: true, length: 14, unique: true })
  nr_cpf: string;

  @Column("character varying", { name: "ds_email", nullable: true, length: 100 })
  ds_email: string;

  @Column("character varying", { name: "nr_telefoneprincipal", nullable: true, length: 20 })
  nr_telefoneprincipal: string;

  @Exclude()
  @Column("character varying", { name: "ds_senha", nullable: true, length: 100 })
  ds_senha: string;

  @Exclude()
  @Column("character varying", { name: "ds_senha2", nullable: true, length: 100 })
  ds_senha2: string;

  @Exclude()
  @Column("character varying", { name: "ds_senha3", nullable: true, length: 100 })
  ds_senha3: string;

  @Column("boolean", { name: "in_ativo", nullable: false, default: true })
  in_ativo: boolean;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;
}
