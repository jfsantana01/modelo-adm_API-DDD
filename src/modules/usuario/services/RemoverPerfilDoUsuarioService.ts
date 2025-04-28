import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IUsuarioRepository } from "../domain/repositories/IUsuarioRepository";
import { IPerfilRepository } from "@modules/perfil/domain/repositories/IPerfilRepository";
import { IRemoverPerfilDoUsuario } from "../domain/models/IRemoverPerfilDoUsuario";
import { IUsuario } from "../domain/models/IUsuario";

@injectable()
export class RemoverPerfilDoUsuarioService {
  constructor(
    @inject("UsuarioRepository")
    private UsuarioRepository: IUsuarioRepository,
    @inject("PerfilRepository")
    private PerfilRepository: IPerfilRepository,
  ) {}

  public async execute({ id_usuario, id_perfil }: IRemoverPerfilDoUsuario): Promise<IUsuario> {
    const usuario = await this.UsuarioRepository.buscarPorId(id_usuario);

    if (!usuario || !id_usuario) {
      throw new AppError("Usuario não Encontrado.", 404);
    }

    if (usuario.perfis) {
      const jaPossuiPerfil = usuario.perfis.some((perfil) => perfil.id_perfil === id_perfil);
      if (!jaPossuiPerfil) {
        throw new AppError("Perfil não encontrado neste Usuário.", 404);
      }
      usuario.perfis = usuario.perfis.filter((p) => p.id_perfil !== id_perfil);
    }

    await this.UsuarioRepository.alterar(usuario);

    return usuario;
  }
}
