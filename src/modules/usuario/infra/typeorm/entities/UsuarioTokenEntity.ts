import { IUsuarioToken } from "@modules/usuario/domain/models/IUsuarioToken";
import { Column, CreateDateColumn, Entity, Index, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
@Index("tbl_adm_usuarios_tokens_pkey", ["id_usuario"], { unique: true })
@Entity("tbl_adm_usuarios_tokens", { schema: "adm" })
export class UsuarioToken implements IUsuarioToken {
  @Column("uuid", { primary: true, name: "id_token" })
  id_token: string = uuidv4(); // Inicializa com UUID gerado na aplicação

  @Column()
  // @Generated("uuid")
  token: string = uuidv4();

  @Column()
  id_usuario: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
