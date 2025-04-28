import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IAlterarTipoImagem } from "../domain/models/IAlterarTipoImagem";
import { ITipoImagemRepository } from "../domain/repositories/ITipoImagemRepository";
import { ITipoImagem } from "../domain/models/ITipoImagem";
import RedisCache from "@shared/cache/RedisCache";
const keyRedis = "tipoimagem";

@injectable()
export class AlterarTipoImagemService {
  constructor(
    @inject("TipoImagemRepository")
    private TipoImagemRepository: ITipoImagemRepository,
  ) {}

  public async execute(tipoimagem: IAlterarTipoImagem): Promise<ITipoImagem> {
    const tipoimagemResponse = await this.TipoImagemRepository.buscarPorId(tipoimagem.id_tipoimagem);

    if (!tipoimagemResponse || !tipoimagem.id_tipoimagem) {
      throw new AppError("TipoImagem não Encontrado.", 404);
    }

    if (tipoimagem.nm_tipoimagem) tipoimagemResponse.nm_tipoimagem = tipoimagem.nm_tipoimagem?.toUpperCase();
    if (tipoimagem.ds_tipoimagem) tipoimagemResponse.ds_tipoimagem = tipoimagem.ds_tipoimagem?.toUpperCase();
    if (tipoimagem.imagens) tipoimagemResponse.imagens = tipoimagem.imagens;
    if (typeof tipoimagem.in_ativo === "boolean") tipoimagemResponse.in_ativo = tipoimagem.in_ativo;

    await this.TipoImagemRepository.alterar(tipoimagemResponse);
    RedisCache.invalidarTodasAsKeys(keyRedis);
    return tipoimagemResponse;
  }
}
