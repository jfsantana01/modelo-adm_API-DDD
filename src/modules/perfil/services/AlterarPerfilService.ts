import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IAlterarPerfil } from "../domain/models/IAlterarPerfil";
import { IPerfilRepository } from "../domain/repositories/IPerfilRepository";
import { IPerfil } from "../domain/models/IPerfil";

@injectable()
export class AlterarPerfilService {
  constructor(
    @inject("PerfilRepository")
    private PerfilRepository: IPerfilRepository,
  ) {}

  public async execute(perfil: IAlterarPerfil): Promise<IPerfil> {
    const perfilResponse = await this.PerfilRepository.buscarPorId(perfil.id_perfil);

    if (!perfilResponse || !perfil.id_perfil) {
      throw new AppError("Perfil não Encontrado.", 404);
    }

    if (perfil.nm_perfil) perfilResponse.nm_perfil = perfil.nm_perfil?.toUpperCase();
    if (perfil.ds_perfil) perfilResponse.ds_perfil = perfil.ds_perfil?.toUpperCase();
    if (perfil.acessos) perfilResponse.acessos = perfil.acessos;
    if (typeof perfil.in_ativo === "boolean") perfilResponse.in_ativo = perfil.in_ativo;

    await this.PerfilRepository.alterar(perfilResponse);
    return perfilResponse;
  }
}
