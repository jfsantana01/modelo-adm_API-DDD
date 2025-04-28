import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IAlterarImagem } from "../domain/models/IAlterarImagem";
import { IImagemRepository } from "../domain/repositories/IImagemRepository";
import { IImagem } from "../domain/models/IImagem";
import RedisCache from "@shared/cache/RedisCache";
import DiskStorageProvider from "@shared/providers/storageProvider/DiskStorageProvider";

const keyRedis = "imagem";

@injectable()
export class AlterarImagemService {
  constructor(
    @inject("ImagemRepository")
    private ImagemRepository: IImagemRepository,
  ) {}

  public async execute(imagem: IAlterarImagem): Promise<IImagem> {
    const imagemResponse = await this.ImagemRepository.buscarPorId(imagem.id_imagem);

    if (!imagemResponse || !imagem.id_imagem) {
      throw new AppError("Imagem não Encontrada.", 404);
    }

    /** Altera a imagem caso ela exista */
    if (imagem.image_filename) {
      const diskProvider = new DiskStorageProvider();
      if (imagemResponse.nm_imagem) {
        await diskProvider.deleteFile("public/images", imagemResponse.nm_imagem);
      }
      const filename = await diskProvider.saveFile("public/images", imagem.image_filename);
      imagemResponse.nm_imagem = filename;
    }

    if (imagem.ds_imagem) imagemResponse.ds_imagem = imagem.ds_imagem; //?.toUpperCase();
    if (imagem.ds_imagem2) imagemResponse.ds_imagem2 = imagem.ds_imagem2; //?.toUpperCase();
    if (imagem.ds_imagem3) imagemResponse.ds_imagem3 = imagem.ds_imagem3; //?.toUpperCase();
    if (imagem.tiposimagem) imagemResponse.tiposimagem = imagem.tiposimagem;
    if (typeof imagem.in_ativo === "boolean") imagemResponse.in_ativo = imagem.in_ativo;

    await this.ImagemRepository.alterar(imagemResponse);
    RedisCache.invalidarTodasAsKeys(keyRedis);
    return imagemResponse;
  }
}
