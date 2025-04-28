import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";

import { IUsuarioRepository } from "../domain/repositories/IUsuarioRepository";

import { IAlterarUsuario } from "../domain/models/IAlterarUsuario";
import { IUsuario } from "../domain/models/IUsuario";

@injectable()
export class AlterarUsuarioService {
  constructor(
    @inject("UsuarioRepository")
    private UsuarioRepository: IUsuarioRepository,
  ) {}

  public async execute(alterarUsuario: IAlterarUsuario): Promise<IUsuario> {
    const usuario = await this.UsuarioRepository.buscarPorId(alterarUsuario.id_usuario);

    if (!usuario || !alterarUsuario.id_usuario) {
      throw new AppError("Usuario não Encontrado.", 404);
    }

    if (alterarUsuario.nm_usuario) usuario.nm_usuario = alterarUsuario.nm_usuario?.toUpperCase();
    if (alterarUsuario.perfis) usuario.perfis = alterarUsuario.perfis;
    if (typeof alterarUsuario.in_ativo === "boolean") usuario.in_ativo = alterarUsuario.in_ativo;

    await this.UsuarioRepository.alterar(usuario);

    return usuario;
  }
}
