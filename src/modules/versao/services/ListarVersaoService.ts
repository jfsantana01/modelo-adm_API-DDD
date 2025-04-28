import { inject, injectable } from "tsyringe";
import RedisCache from "@shared/cache/RedisCache";
import { IVersaoRepository } from "../domain/repositories/IVersaoRepository";
import { IListarVersao } from "../domain/models/IListarVersao";
import { IVersao } from "../domain/models/IVersao";
const keyRedis = "versao";

@injectable()
export class ListarVersaoService {
  constructor(
    @inject("VersaoRepository")
    private versaoRepository: IVersaoRepository,
  ) {}

  public async execute(versao: IListarVersao): Promise<IVersao[]> {
    const versoesRedis = await RedisCache.recuperar(keyRedis + JSON.stringify(versao));
    if (versoesRedis) return versoesRedis as IVersao[];
    const versoes = await this.versaoRepository.listar(versao);
    if (versoes.length > 0) RedisCache.salvar(keyRedis + JSON.stringify(versao), versoes);
    return versoes;
  }
}
