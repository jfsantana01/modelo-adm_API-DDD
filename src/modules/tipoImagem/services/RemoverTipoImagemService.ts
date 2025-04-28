import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IRemoverTipoImagem } from "../domain/models/IRemoverTipoImagem";
import { ITipoImagemRepository } from "../domain/repositories/ITipoImagemRepository";
import RedisCache from "@shared/cache/RedisCache";
const keyRedis = "tipoimagem";
@injectable()
export class RemoverTipoImagemService {
  constructor(
    @inject("TipoImagemRepository")
    private TipoImagemRepository: ITipoImagemRepository,
  ) {}

  public async execute({ id_tipoimagem }: IRemoverTipoImagem): Promise<void> {
    const TipoImagem = await this.TipoImagemRepository.buscarPorId(id_tipoimagem);

    if (!TipoImagem || !id_tipoimagem) {
      throw new AppError("TipoImagem não encontrado.", 404);
    }
    await this.TipoImagemRepository.remover(TipoImagem);
    RedisCache.invalidarTodasAsKeys(keyRedis);
  }
}
