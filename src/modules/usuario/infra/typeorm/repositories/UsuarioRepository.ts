import { IUsuarioRepository } from "@modules/usuario/domain/repositories/IUsuarioRepository";
import { FindOptionsWhere, ILike, In, Repository } from "typeorm";

import { dataSource } from "@shared/infra/typeorm";
import { IListarUsuarios } from "@modules/usuario/domain/models/IListarUsuarios";
import { IUsuario } from "@modules/usuario/domain/models/IUsuario";
import { Usuario } from "../entities/UsuarioEntity";
import { ICriarUsuario } from "@modules/usuario/domain/models/ICriarUsuario";
import AppError from "@shared/errors/AppError";
export class UsuarioRepository implements IUsuarioRepository {
  private usuarioRepository: Repository<Usuario>;

  constructor() {
    this.usuarioRepository = dataSource.getRepository(Usuario);
  }
  public async listar(usuarioRequest: IListarUsuarios): Promise<IUsuario[]> {
    const condicao: FindOptionsWhere<Usuario> = {};

    if (usuarioRequest.ds_login) {
      condicao.ds_login = ILike(`%${usuarioRequest.ds_login?.toString()}%`);
    }
    if (usuarioRequest.nm_usuario) {
      condicao.nm_usuario = ILike(`%${usuarioRequest.nm_usuario?.toString()}%`);
    }
    if (usuarioRequest.id_usuario) {
      condicao.id_usuario = usuarioRequest.id_usuario;
    }
    
    if (typeof usuarioRequest.perfis === "string" || Array.isArray(usuarioRequest.perfis)) {
      let itens: string[] = [];
      if (typeof usuarioRequest.perfis === "string") {
        itens = usuarioRequest.perfis.split(",");
      } else {
        itens = usuarioRequest.perfis;
      }
      condicao.perfis = {
        nm_perfil: In(itens),
      };
    }

    const result = await this.usuarioRepository.find({
      where: condicao,
      relations: { perfis: { acessos: true } },
      order: {
        ds_login: "ASC",
      },
    });
    if (result.length == 0) throw new AppError("Usuario não encontrado para o filtro informado.", 404);

    return result;
  }
  public async criar(usuarioRequest: ICriarUsuario): Promise<Usuario> {
    const usuario = this.usuarioRepository.create(usuarioRequest);
    await this.usuarioRepository.save(usuario);
    return usuario;
  }

  public async alterar(usuarioRequest: Usuario): Promise<Usuario> {
    usuarioRequest.nm_usuario = usuarioRequest.nm_usuario.toUpperCase();
    usuarioRequest.ds_login = usuarioRequest.ds_login.toUpperCase();
    await this.usuarioRepository.save(usuarioRequest);

    return usuarioRequest;
  }

  public async buscarPorId(id_usuario: string): Promise<Usuario | null> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id_usuario: id_usuario },
      relations: { perfis: { acessos: true } },
    });

    return usuario;
  }

  public async buscarPorLogin(ds_login: string): Promise<Usuario | null> {
    const usuario = await this.usuarioRepository.findOne({
      where: { ds_login: ds_login },
      relations: { perfis: { acessos: true } },
    });

    return usuario;
  }
}
