import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICriarImagem } from "../domain/models/ICriarImagem";
import { IImagem } from "../domain/models/IImagem";
import { IImagemRepository } from "../domain/repositories/IImagemRepository";
import DiskStorageProvider from "@shared/providers/storageProvider/DiskStorageProvider";

@injectable()
export class CriarImagemService {
  constructor(
    @inject("ImagemRepository")
    private ImagemRepository: IImagemRepository,
  ) {}

  public async execute(imagem: ICriarImagem): Promise<IImagem> {
    const imagemExiste = await this.ImagemRepository.buscarPorNome(imagem.nm_imagem);

    if (imagemExiste) {
      throw new AppError("Já existe um imagem com este nome.", 409);
    }

    const diskProvider = new DiskStorageProvider();

    const filename = await diskProvider.saveFile("public/images", imagem.image_filename);
    imagem.nm_imagem = filename;
    imagem.ds_imagem = imagem.ds_imagem//?.toUpperCase();
    imagem.ds_imagem2 = imagem.ds_imagem2//.toUpperCase();
    imagem.ds_imagem3 = imagem.ds_imagem3//?.toUpperCase();

    const imagemResponse = await this.ImagemRepository.criar(imagem);
    return imagemResponse;
  }
}
