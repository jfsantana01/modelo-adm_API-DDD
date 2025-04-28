import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IUsuarioRepository } from "../domain/repositories/IUsuarioRepository";
import { IAlterarAvatarUsuario } from "../domain/models/IAlterarAvatarUsuario";
import DiskStorageProvider from "@shared/providers/storageProvider/DiskStorageProvider";
import { IUsuario } from "../domain/models/IUsuario";

@injectable()
export class AlterarAvatarUsuarioServices {
  constructor(
    @inject("UsuarioRepository")
    private UsuarioRepository: IUsuarioRepository,
  ) {}

  public async execute({ id_usuario, avatarFilename }: IAlterarAvatarUsuario): Promise<IUsuario> {
    const usuario = await this.UsuarioRepository.buscarPorId(id_usuario);

    if (!usuario) {
      throw new AppError("Usuario não encontrado.", 404);
    }

    const diskProvider = new DiskStorageProvider();
    if (usuario.avatar) {
      await diskProvider.deleteFile("uploads", usuario.avatar);
    }
    const filename = await diskProvider.saveFile("uploads", avatarFilename);
    usuario.avatar = filename;

    await this.UsuarioRepository.alterar(usuario);

    return usuario;
  }
}
