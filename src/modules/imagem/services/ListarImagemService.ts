import { inject, injectable } from "tsyringe";
import RedisCache from "@shared/cache/RedisCache";
import { IImagemRepository } from "../domain/repositories/IImagemRepository";
import { IListarImagem } from "../domain/models/IListarImagem";
import { IImagem } from "../domain/models/IImagem";
const keyRedis = "imagem";

@injectable()
export class ListarImagemService {
  constructor(
    @inject("ImagemRepository")
    private imagemRepository: IImagemRepository,
  ) {}

  public async execute(imagem: IListarImagem): Promise<IImagem[]> {
    const imagensRedis = await RedisCache.recuperar(keyRedis + JSON.stringify(imagem));
    if (imagensRedis) return imagensRedis as IImagem[];
    const imagens = await this.imagemRepository.listar(imagem);
    if (imagens.length > 0) RedisCache.salvar(keyRedis + JSON.stringify(imagem), imagens);
    return imagens;
  }
}
