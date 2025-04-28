import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IRemoverAcesso } from "../domain/models/IRemoverAcesso";
import { IAcessoRepository } from "../domain/repositories/IAcessoRepository";
import RedisCache from "@shared/cache/RedisCache";
const keyRedis = "acesso";
@injectable()
export class RemoverAcessoService {
  constructor(
    @inject("AcessoRepository")
    private AcessoRepository: IAcessoRepository,
  ) {}

  public async execute({ id_acesso }: IRemoverAcesso): Promise<void> {
    const Acesso = await this.AcessoRepository.buscarPorId(id_acesso);

    if (!Acesso || !id_acesso) {
      throw new AppError("Acesso não encontrado.", 404);
    }
    await this.AcessoRepository.remover(Acesso);
    RedisCache.invalidarTodasAsKeys(keyRedis);
  }
}
