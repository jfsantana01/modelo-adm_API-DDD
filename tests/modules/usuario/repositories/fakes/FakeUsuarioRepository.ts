import { v4 as uuidv4 } from "uuid";
import { IUsuarioRepository } from "../../../../../src/modules/usuario/domain/repositories/IUsuarioRepository";
import { ICriarUsuario } from "../../../../../src/modules/usuario/domain/models/ICriarUsuario";

import { IUsuario } from "../../../../../src/modules/usuario/domain/models/IUsuario";
import { Usuario } from "../../../../../src/modules/usuario/infra/typeorm/entities/UsuarioEntity";
import { IListarUsuarios } from "../../../../../src/modules/usuario/domain/models/IListarUsuarios";

export class FakeUsuarioRepository implements IUsuarioRepository {
  private usuarios: Usuario[] = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async listar(usuario: IListarUsuarios): Promise<IUsuario[]> {
    return this.usuarios;
  }
  public async criar({ nm_usuario, ds_login, ds_senha, in_ativo, perfis }: ICriarUsuario): Promise<Usuario> {
    const usuario = new Usuario();
    usuario.id_usuario = uuidv4();
    usuario.nm_usuario = nm_usuario;
    usuario.ds_login = ds_login;
    usuario.perfis = [];

    if (ds_senha) usuario.ds_senha = ds_senha;

    if (in_ativo) usuario.in_ativo = in_ativo;

    if (perfis) Object.assign(usuario.perfis, perfis);

    this.usuarios.push(usuario);
    return usuario;
  }

  public async alterar(usuario: Usuario): Promise<Usuario> {
    Object.assign(this.usuarios, usuario);
    return usuario;
  }

  public async remover(usuario: Usuario): Promise<void> {
    this.usuarios = this.usuarios.filter((a) => a.id_usuario !== usuario.id_usuario);
  }

  public async buscarPorNome(nm_usuario: string): Promise<Usuario | null> {
    const usuario = this.usuarios.find((usuario) => usuario.nm_usuario === nm_usuario);
    return usuario == undefined ? null : usuario;
  }
  public async buscarPorLogin(ds_login: string): Promise<Usuario | null> {
    const usuario = this.usuarios.find((usuario) => usuario.ds_login === ds_login);
    return usuario == undefined ? null : usuario;
  }

  public async buscarPorId(id_usuario: string): Promise<Usuario | null> {
    const usuario = this.usuarios.find((usuario) => usuario.id_usuario === id_usuario);
    return usuario == undefined ? null : usuario;
  }
}
