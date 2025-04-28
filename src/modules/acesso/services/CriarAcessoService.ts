import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICriarAcesso } from "../domain/models/ICriarAcesso";
import { IAcesso } from "../domain/models/IAcesso";
import { IAcessoRepository } from "../domain/repositories/IAcessoRepository";

@injectable()
export class CriarAcessoService {
  constructor(
    @inject("AcessoRepository")
    private AcessoRepository: IAcessoRepository,
  ) {}

  public async execute(acesso: ICriarAcesso): Promise<IAcesso> {
    const acessoExiste = await this.AcessoRepository.buscarPorNome(acesso.nm_acesso);

    if (acessoExiste) {
      throw new AppError("Já existe um acesso com este nome.", 409);
    }

    acesso.nm_acesso = acesso.nm_acesso?.toUpperCase();
    acesso.ds_acesso = acesso.ds_acesso?.toUpperCase();

    const acessoResponse = await this.AcessoRepository.criar(acesso);

    return acessoResponse;
  }
}
