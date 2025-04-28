import { inject, injectable } from "tsyringe";
import RedisCache from "@shared/cache/RedisCache";
import { IParametroRepository } from "../domain/repositories/IParametroRepository";
import { IListarParametro } from "../domain/models/IListarParametro";
import { IParametro } from "../domain/models/IParametro";
const keyRedis = "parametro";

@injectable()
export class ListarParametroService {
  constructor(
    @inject("ParametroRepository")
    private parametroRepository: IParametroRepository,
  ) {}

  public async execute(parametro: IListarParametro): Promise<IParametro[]> {
    const parametrosRedis = await RedisCache.recuperar(keyRedis + JSON.stringify(parametro));
    if (parametrosRedis) return parametrosRedis as IParametro[];
    const parametros = await this.parametroRepository.listar(parametro);
    if (parametros.length > 0) RedisCache.salvar(keyRedis + JSON.stringify(parametro), parametros);
    return parametros;
  }
}
