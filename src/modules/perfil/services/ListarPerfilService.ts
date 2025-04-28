import { inject, injectable } from "tsyringe";
import { IPerfilRepository } from "../domain/repositories/IPerfilRepository";
import { IListarPerfil } from "../domain/models/IListarPerfil";
import { IPerfil } from "../domain/models/IPerfil";

@injectable()
export class ListarPerfilService {
  constructor(
    @inject("PerfilRepository")
    private perfilRepository: IPerfilRepository,
  ) {}

  public async execute(perfil: IListarPerfil): Promise<IPerfil[]> {
    const perfis = await this.perfilRepository.listar(perfil);
    return perfis;
  }
}
