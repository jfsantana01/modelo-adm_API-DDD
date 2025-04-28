import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";

import { IUsuarioRepository } from "../domain/repositories/IUsuarioRepository";
import { IPerfilRepository } from "@modules/perfil/domain/repositories/IPerfilRepository";
import { IAdicionarPerfilAoUsuario } from "../domain/models/IAdicionarPerfilAoUsuario";
import { IUsuario } from "../domain/models/IUsuario";

@injectable()
export class AdicionarPerfilAoUsuarioService {
  constructor(
    @inject("UsuarioRepository")
    private UsuarioRepository: IUsuarioRepository,
    @inject("PerfilRepository")
    private PerfilRepository: IPerfilRepository,
  ) {}

  public async execute({ id_usuario, id_perfil }: IAdicionarPerfilAoUsuario): Promise<IUsuario> {
    const usuario = await this.UsuarioRepository.buscarPorId(id_usuario);

    if (!usuario || !id_usuario) {
      throw new AppError("Usuario não encontrado.", 404);
    }
    if (!usuario.perfis) usuario.perfis = [];

    const perfil = await this.PerfilRepository.buscarPorId(id_perfil);
    if (!perfil || !id_perfil) {
      throw new AppError("Perfil não encontrado.", 404);
    }

    const jaPossuiPerfil = usuario.perfis.some((perfil) => perfil.id_perfil === id_perfil);
    if (jaPossuiPerfil) {
      throw new AppError("Usuário já possui este perfil. ", 409);
    }

    usuario.perfis.push(perfil);

    await this.UsuarioRepository.alterar(usuario);

    return usuario;
  }
}
