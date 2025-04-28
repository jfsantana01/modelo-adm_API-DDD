import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";

import { IPerfilRepository } from "@modules/perfil/domain/repositories/IPerfilRepository";

import { IAcessoRepository } from "@modules/acesso/domain/repositories/IAcessoRepository";
import { IPerfil } from "../domain/models/IPerfil";
import { IRemoverAcessoDoPerfil } from "../domain/models/IRemoverAcessoDoPerfil";

@injectable()
export class RemoverAcessoDoPerfilService {
  constructor(
    //@inject("AcessoRepository")
   // private AcessoRepository: IAcessoRepository,
    @inject("PerfilRepository")
    private PerfilRepository: IPerfilRepository,
  ) {}

  public async execute({ id_acesso, id_perfil }: IRemoverAcessoDoPerfil): Promise<IPerfil> {
    const perfil = await this.PerfilRepository.buscarPorId(id_perfil);

    if (!perfil || !id_perfil) {
      throw new AppError("Perfil não encontrado.", 404);
    }

    const jaPossuiAcesso = perfil.acessos.some((acesso) => acesso.id_acesso === id_acesso);
    if (!jaPossuiAcesso) {
      throw new AppError("Acesso não encontrado neste Perfil.", 409);
    }

    perfil.acessos = perfil.acessos.filter((p) => p.id_acesso !== id_acesso);

    await this.PerfilRepository.alterar(perfil);

    return perfil;
  }
}
