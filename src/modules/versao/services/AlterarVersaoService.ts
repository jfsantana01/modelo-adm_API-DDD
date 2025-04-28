import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IAlterarVersao } from "../domain/models/IAlterarVersao";
import { IVersaoRepository } from "../domain/repositories/IVersaoRepository";
import { IVersao } from "../domain/models/IVersao";
import RedisCache from "@shared/cache/RedisCache";
const keyRedis = "versao";

@injectable()
export class AlterarVersaoService {
  constructor(
    @inject("VersaoRepository")
    private VersaoRepository: IVersaoRepository,
  ) {}

  public async execute(versao: IAlterarVersao): Promise<IVersao> {
    const versaoResponse = await this.VersaoRepository.buscarPorId(versao.id_versao);

    if (!versaoResponse || !versao.id_versao) {
      throw new AppError("Versao não Encontrada.", 404);
    }

    const versaoExists = await this.VersaoRepository.buscarPorNome(versao.nm_versao);

    if (versaoExists) {
      throw new AppError("Já existe um versao com este nome.", 409);
    }

    if (versao.nm_versao) versaoResponse.nm_versao = versao.nm_versao;
    if (versao.ds_versao) versaoResponse.ds_versao = versao.ds_versao;

    await this.VersaoRepository.alterar(versaoResponse);
    RedisCache.invalidarTodasAsKeys(keyRedis);

    return versaoResponse;
  }
}
