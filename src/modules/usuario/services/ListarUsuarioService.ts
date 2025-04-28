import { inject, injectable } from "tsyringe";
import { IUsuarioRepository } from "../domain/repositories/IUsuarioRepository";
import { IListarUsuarios } from "../domain/models/IListarUsuarios";
import { IUsuario } from "../domain/models/IUsuario";

@injectable()
export class ListarUsuarioService {
  constructor(
    @inject("UsuarioRepository")
    private usuarioRepository: IUsuarioRepository,
  ) {}

  public async execute(usuario: IListarUsuarios): Promise<IUsuario[]> {
    const usuarios = await this.usuarioRepository.listar(usuario);
    return usuarios;
  }
}
