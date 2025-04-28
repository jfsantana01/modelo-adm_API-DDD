import { IAcesso } from "@modules/acesso/domain/models/IAcesso";
import { Perfil } from "@modules/perfil/infra/typeorm/entities/PerfilEntity";
import { Column, CreateDateColumn, Entity, Index, ManyToMany, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Index("tbl_adm_acessos_pkey", ["id_acesso"], { unique: true })
@Entity("tbl_adm_acessos", { schema: "adm" })
export class Acesso implements IAcesso {
  @Column("uuid", { primary: true, name: "id_acesso" })
  id_acesso: string = uuidv4(); // Inicializa com UUID gerado na aplicação

  @Column("character varying", { name: "nm_acesso", nullable: true, length: 100, unique: true })
  nm_acesso: string; //| null;

  @Column("character varying", { name: "ds_acesso", nullable: true, length: 200, unique: false })
  ds_acesso: string; //| null;

  @ManyToMany(() => Perfil, (perfil) => perfil.acessos)
  perfis: Perfil[];

  @Column("boolean", { name: "in_ativo", nullable: false, default: true })
  in_ativo: boolean;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;
}
