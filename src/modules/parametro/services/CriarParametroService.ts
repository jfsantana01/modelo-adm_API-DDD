import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICriarParametro } from "../domain/models/ICriarParametro";
import { IParametro } from "../domain/models/IParametro";
import { IParametroRepository } from "../domain/repositories/IParametroRepository";
import RedisCache from "@shared/cache/RedisCache";
const keyRedis = "parametro";

@injectable()
export class CriarParametroService {
  constructor(
    @inject("ParametroRepository")
    private ParametroRepository: IParametroRepository,
  ) {}

  public async execute(parametroRequest: ICriarParametro): Promise<IParametro> {
    const parametroExiste = await this.ParametroRepository.buscarPorNome(parametroRequest.nm_parametro);

    if (parametroExiste) {
      throw new AppError("Já existe um parametro com este nome.", 409);
    }

    const parametro = await this.ParametroRepository.criar(parametroRequest);
    RedisCache.invalidarTodasAsKeys(keyRedis);

    return parametro;
  }
}
