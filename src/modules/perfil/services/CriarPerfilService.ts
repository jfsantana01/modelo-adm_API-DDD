import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICriarPerfil } from "../domain/models/ICriarPerfil";
import { IPerfil } from "../domain/models/IPerfil";
import { IPerfilRepository } from "../domain/repositories/IPerfilRepository";

@injectable()
export class CriarPerfilService {
  constructor(
    @inject("PerfilRepository")
    private PerfilRepository: IPerfilRepository,
  ) {}

  public async execute(perfil: ICriarPerfil): Promise<IPerfil> {
    const perfilExiste = await this.PerfilRepository.buscarPorNome(perfil.nm_perfil);

    if (perfilExiste) {
      throw new AppError("Já existe um perfil com este nome.", 409);
    }

    perfil.nm_perfil = perfil.nm_perfil?.toUpperCase();
    perfil.ds_perfil = perfil.ds_perfil?.toUpperCase();

    const perfilResponse = await this.PerfilRepository.criar(perfil);

    return perfilResponse;
  }
}
