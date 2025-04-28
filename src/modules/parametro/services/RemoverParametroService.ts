import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IRemoverParametro } from "../domain/models/IRemoverParametro";
import { IParametroRepository } from "../domain/repositories/IParametroRepository";
import RedisCache from "@shared/cache/RedisCache";
const keyRedis = "parametro";
@injectable()
export class RemoverParametroService {
  constructor(
    @inject("ParametroRepository")
    private ParametroRepository: IParametroRepository,
  ) {}

  public async execute({ id_parametro }: IRemoverParametro): Promise<void> {
    const Parametro = await this.ParametroRepository.buscarPorId(id_parametro);

    if (!Parametro || !id_parametro) {
      throw new AppError("Parametro não encontrado.", 404);
    }
    await this.ParametroRepository.remover(Parametro);
    RedisCache.invalidarTodasAsKeys(keyRedis);
  }
}
