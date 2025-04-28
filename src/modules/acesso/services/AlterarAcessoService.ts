import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IAlterarAcesso } from "../domain/models/IAlterarAcesso";
import { IAcessoRepository } from "../domain/repositories/IAcessoRepository";
import { IAcesso } from "../domain/models/IAcesso";
import RedisCache from "@shared/cache/RedisCache";
const keyRedis = "acesso";

@injectable()
export class AlterarAcessoService {
  constructor(
    @inject("AcessoRepository")
    private AcessoRepository: IAcessoRepository,
  ) {}

  public async execute(acesso: IAlterarAcesso): Promise<IAcesso> {
    const acessoResponse = await this.AcessoRepository.buscarPorId(acesso.id_acesso);

    if (!acessoResponse || !acesso.id_acesso) {
      throw new AppError("Acesso não Encontrado.", 404);
    }

    if (acesso.nm_acesso) acessoResponse.nm_acesso = acesso.nm_acesso?.toUpperCase();
    if (acesso.ds_acesso) acessoResponse.ds_acesso = acesso.ds_acesso?.toUpperCase();
    if (acesso.perfis) acessoResponse.perfis = acesso.perfis;
    if (typeof acesso.in_ativo === "boolean") acessoResponse.in_ativo = acesso.in_ativo;

    await this.AcessoRepository.alterar(acessoResponse);
    RedisCache.invalidarTodasAsKeys(keyRedis);
    return acessoResponse;
  }
}
