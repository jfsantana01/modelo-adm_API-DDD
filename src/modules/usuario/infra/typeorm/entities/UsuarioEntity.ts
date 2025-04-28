import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  // PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Exclude, Expose } from "class-transformer";
import { Perfil } from "@modules/perfil/infra/typeorm/entities/PerfilEntity";
import { IUsuario } from "@modules/usuario/domain/models/IUsuario";
import { v4 as uuidv4 } from "uuid";
@Index("tbl_adm_usuarios_pkey", ["id_usuario"], { unique: true })
@Entity("tbl_adm_usuarios", { schema: "adm" })
export class Usuario implements IUsuario {
  // @PrimaryGeneratedColumn("uuid", { name: "id_usuario" })
  // id_usuario: string;
  @Column("uuid", { primary: true, name: "id_usuario" })
  id_usuario: string = uuidv4(); // Inicializa com UUID gerado na aplicação

  @Column("character varying", { name: "nm_usuario", nullable: false, length: 100 })
  nm_usuario: string; //| null;

  @Column("character varying", { name: "ds_login", nullable: false, unique: true, length: 50 })
  ds_login: string;

  @Exclude()
  @Column("character varying", { name: "ds_senha", nullable: true, length: 100 })
  ds_senha: string; // | null;

  @Exclude()
  @Column("character varying", { name: "ds_senha2", nullable: true, length: 100 })
  ds_senha2: string; // | null;

  @Exclude()
  @Column("character varying", { name: "ds_senha3", nullable: true, length: 100 })
  ds_senha3: string; //| null;

  @Column("character varying", { name: "avatar", nullable: true, length: 200 })
  avatar: string;

  @Expose({ name: "avatar_url" })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }
    return `${process.env.BASE_URL}/${process.env.BASE_AVATAR_URL}/${this.avatar}`;
  }

  @ManyToMany(() => Perfil, (perfil) => perfil.usuarios, { onDelete: "CASCADE" })
  @JoinTable({
    name: "tbl_adm_usuarios_perfis",
    joinColumn: { name: "id_usuario" },
    inverseJoinColumn: { name: "id_perfil" },
  })
  perfis: Perfil[];

  @Column("boolean", { name: "in_ativo", nullable: false, default: true })
  in_ativo: boolean;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;
}
