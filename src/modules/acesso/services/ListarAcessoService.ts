import { inject, injectable } from "tsyringe";
import RedisCache from "@shared/cache/RedisCache";
import { IAcessoRepository } from "../domain/repositories/IAcessoRepository";
import { IListarAcesso } from "../domain/models/IListarAcesso";
import { IAcesso } from "../domain/models/IAcesso";
const keyRedis = "acesso";

@injectable()
export class ListarAcessoService {
  constructor(
    @inject("AcessoRepository")
    private acessoRepository: IAcessoRepository,
  ) {}

  public async execute(acesso: IListarAcesso): Promise<IAcesso[]> {
    const acessosRedis = await RedisCache.recuperar(keyRedis + JSON.stringify(acesso));
    if (acessosRedis) return acessosRedis as IAcesso[];
    const acessos = await this.acessoRepository.listar(acesso);
    if (acessos.length > 0) RedisCache.salvar(keyRedis + JSON.stringify(acesso), acessos);
    return acessos;
  }
}
