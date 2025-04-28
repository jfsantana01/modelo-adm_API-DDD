import { inject, injectable } from "tsyringe";
import RedisCache from "@shared/cache/RedisCache";
import { ITipoImagemRepository } from "../domain/repositories/ITipoImagemRepository";
import { IListarTipoImagem } from "../domain/models/IListarTipoImagem";
import { ITipoImagem } from "../domain/models/ITipoImagem";
const keyRedis = "tipoimagem";

@injectable()
export class ListarTipoImagemService {
  constructor(
    @inject("TipoImagemRepository")
    private tipoimagemRepository: ITipoImagemRepository,
  ) {}

  public async execute(tipoimagem: IListarTipoImagem): Promise<ITipoImagem[]> {
    const tiposimagemRedis = await RedisCache.recuperar(keyRedis + JSON.stringify(tipoimagem));
    if (tiposimagemRedis) return tiposimagemRedis as ITipoImagem[];
    const tiposimagem = await this.tipoimagemRepository.listar(tipoimagem);
    if (tiposimagem.length > 0) RedisCache.salvar(keyRedis + JSON.stringify(tipoimagem), tiposimagem);
    return tiposimagem;
  }
}
