import AppError from "@shared/errors/AppError";

import { IPerfilRepository } from "@modules/perfil/domain/repositories/IPerfilRepository";
import { IAdicionarAcessoAoPerfil } from "../domain/models/IAdicionarAcessoAoPerfil";
import { IAcessoRepository } from "@modules/acesso/domain/repositories/IAcessoRepository";
import { IPerfil } from "../domain/models/IPerfil";
import { inject, injectable } from "tsyringe";

@injectable()
export class AdicionarAcessoAoPerfilService {
  constructor(
    @inject("AcessoRepository")
    private AcessoRepository: IAcessoRepository,
    @inject("PerfilRepository")
    private PerfilRepository: IPerfilRepository,
  ) {}

  public async execute({ id_acesso, id_perfil }: IAdicionarAcessoAoPerfil): Promise<IPerfil> {
    const perfil = await this.PerfilRepository.buscarPorId(id_perfil);

    if (!perfil || !id_perfil) {
      throw new AppError("Perfil não encontrado.", 404);
    }
    if (!perfil.acessos) perfil.acessos = [];

    const acesso = await this.AcessoRepository.buscarPorId(id_acesso);
    if (!acesso || !id_acesso) {
      throw new AppError("Acesso não encontrado.", 404);
    }

    const jaPossuiAcesso = perfil.acessos.some((acesso) => acesso.id_acesso === id_acesso);
    if (jaPossuiAcesso) {
      throw new AppError("Perfil já possui este acesso. ", 409);
    }

    perfil.acessos.push(acesso);

    await this.PerfilRepository.alterar(perfil);

    return perfil;
  }
}
