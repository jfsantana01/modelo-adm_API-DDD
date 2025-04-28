import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IImagemRepository } from "../domain/repositories/IImagemRepository";
import RedisCache from "@shared/cache/RedisCache";
import { IRemoverImagem } from "../domain/models/IRemoverImagem";
import DiskStorageProvider from "@shared/providers/storageProvider/DiskStorageProvider";
const keyRedis = "imagem";
@injectable()
export class RemoverImagemService {
  constructor(
    @inject("ImagemRepository")
    private ImagemRepository: IImagemRepository,
  ) {}

  public async execute({ id_imagem }: IRemoverImagem): Promise<void> {
    const imagemResponse = await this.ImagemRepository.buscarPorId(id_imagem);

    if (!imagemResponse || !id_imagem) {
      throw new AppError("Imagem não encontrado.", 404);
    }

    const diskProvider = new DiskStorageProvider();
    if (imagemResponse.nm_imagem) {
      await diskProvider.deleteFile("public/images", imagemResponse.nm_imagem);
    }

    await this.ImagemRepository.remover(imagemResponse);
    RedisCache.invalidarTodasAsKeys(keyRedis);
  }
}
