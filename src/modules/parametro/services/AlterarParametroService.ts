import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IAlterarParametro } from "../domain/models/IAlterarParametro";
import { IParametroRepository } from "../domain/repositories/IParametroRepository";
import { IParametro } from "../domain/models/IParametro";
import RedisCache from "@shared/cache/RedisCache";
const keyRedis = "parametro";

@injectable()
export class AlterarParametroService {
  constructor(
    @inject("ParametroRepository")
    private ParametroRepository: IParametroRepository,
  ) {}

  public async execute(parametro: IAlterarParametro): Promise<IParametro> {
    const parametroResponse = await this.ParametroRepository.buscarPorId(parametro.id_parametro);

    if (!parametroResponse || !parametro.id_parametro) {
      throw new AppError("Parametro não Encontrado.", 404);
    }

    if (parametro.nm_parametro) {
      const parametroExists = await this.ParametroRepository.buscarPorNome(parametro.nm_parametro);
      if (parametroExists) {
        throw new AppError("Já existe um parametro com este nome.", 409);
      }
    }

    if (parametro.nm_parametro) parametroResponse.nm_parametro = parametro.nm_parametro;
    if (parametro.vl_parametro1) parametroResponse.vl_parametro1 = parametro.vl_parametro1;
    if (parametro.vl_parametro2) parametroResponse.vl_parametro2 = parametro.vl_parametro2;
    if (parametro.vl_parametro3) parametroResponse.vl_parametro3 = parametro.vl_parametro3;
    if (parametro.in_publico) parametroResponse.in_publico = parametro.in_publico;

    await this.ParametroRepository.alterar(parametroResponse);
    RedisCache.invalidarTodasAsKeys(keyRedis);

    return parametroResponse;
  }
}
