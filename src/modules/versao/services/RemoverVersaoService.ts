import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IRemoverVersao } from "../domain/models/IRemoverVersao";
import { IVersaoRepository } from "../domain/repositories/IVersaoRepository";
import RedisCache from "@shared/cache/RedisCache";
const keyRedis = "versao";
@injectable()
export class RemoverVersaoService {
  constructor(
    @inject("VersaoRepository")
    private VersaoRepository: IVersaoRepository,
  ) {}

  public async execute({ id_versao }: IRemoverVersao): Promise<void> {
    const Versao = await this.VersaoRepository.buscarPorId(id_versao);

    if (!Versao || !id_versao) {
      throw new AppError("Versao não encontrado.", 404);
    }
    await this.VersaoRepository.remover(Versao);
    RedisCache.invalidarTodasAsKeys(keyRedis);
  }
}
