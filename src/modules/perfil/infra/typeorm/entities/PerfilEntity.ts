import { Acesso } from "@modules/acesso/infra/typeorm/entities/AcessoEntity";
import { IPerfil } from "@modules/perfil/domain/models/IPerfil";
import { Usuario } from "@modules/usuario/infra/typeorm/entities/UsuarioEntity";
import { Column, CreateDateColumn, Entity, Index, JoinTable, ManyToMany, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Index("tbl_adm_perfis_pkey", ["id_perfil"], { unique: true })
@Entity("tbl_adm_perfis", { schema: "adm" })
export class Perfil implements IPerfil {

  @Column("uuid", { primary: true, name: "id_perfil" })
  id_perfil: string = uuidv4(); // Inicializa com UUID gerado na aplicação

  @Column("character varying", { name: "nm_perfil", nullable: true, length: 100, unique: true })
  nm_perfil: string;
  @Column("character varying", { name: "ds_perfil", nullable: true, length: 200, unique: false })
  ds_perfil: string;

  @ManyToMany(() => Usuario, (usuario) => usuario.perfis, { onDelete: "CASCADE" })
  usuarios: Usuario[];

  @ManyToMany(() => Acesso, (acesso) => acesso.perfis, { onDelete: "CASCADE" })
  @JoinTable({
    name: "tbl_adm_perfis_acessos",
    joinColumn: { name: "id_perfil" },
    inverseJoinColumn: { name: "id_acesso" },
  })
  acessos: Acesso[];

  @Column("boolean", { name: "in_ativo", nullable: false, default: true })
  in_ativo: boolean;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;
}
