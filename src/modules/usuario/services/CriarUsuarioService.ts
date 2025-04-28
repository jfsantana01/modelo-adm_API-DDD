import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICriarUsuario } from "../domain/models/ICriarUsuario";
import { IUsuario } from "../domain/models/IUsuario";
import { IUsuarioRepository } from "../domain/repositories/IUsuarioRepository";
import { IHashProvider } from "../../../shared/providers/hashProvider/models/IHashPovider";
@injectable()
export class CriarUsuarioService {
  constructor(
    @inject("UsuarioRepository")
    private UsuarioRepository: IUsuarioRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider,
  ) {}

  public async execute(usuario: ICriarUsuario): Promise<IUsuario> {
    const usuarioExiste = await this.UsuarioRepository.buscarPorLogin(usuario.ds_login);

    if (usuarioExiste) {
      throw new AppError("Já existe um usuario com este nome.", 409);
    }
    usuario.nm_usuario = usuario.nm_usuario?.toUpperCase();
    usuario.ds_login = usuario.ds_login?.toUpperCase();

    if (usuario.ds_senha) usuario.ds_senha = await this.hashProvider.generateHash(usuario.ds_senha);

    const usuarioResponse = await this.UsuarioRepository.criar(usuario);

    return usuarioResponse;
  }
}
