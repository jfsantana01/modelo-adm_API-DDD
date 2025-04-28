import AppError from "@shared/errors/AppError";

import { IImagemRepository } from "@modules/imagem/domain/repositories/IImagemRepository";
import { IAdicionarTipoImagem } from "../domain/models/IAdicionarTipoImagem";
import { ITipoImagemRepository } from "@modules/tipoImagem/domain/repositories/ITipoImagemRepository";
import { IImagem } from "../domain/models/IImagem";
import { inject, injectable } from "tsyringe";

@injectable()
export class AdicionarTipoImagemService {
  constructor(
    @inject("TipoImagemRepository")
    private TipoImagemRepository: ITipoImagemRepository,
    @inject("ImagemRepository")
    private ImagemRepository: IImagemRepository,
  ) {}

  public async execute(imagemTipoImagem: IAdicionarTipoImagem): Promise<IImagem> {
    const imagem = await this.ImagemRepository.buscarPorId(imagemTipoImagem.id_imagem);

    if (!imagem || !imagemTipoImagem.id_imagem) {
      throw new AppError("Imagem não encontrado.", 404);
    }
    if (!imagem.tiposimagem) imagem.tiposimagem = [];

    const tipoimagem = await this.TipoImagemRepository.buscarPorId(imagemTipoImagem.id_tipoimagem);
    if (!tipoimagem || !imagemTipoImagem.id_tipoimagem) {
      throw new AppError("TipoImagem não encontrado.", 404);
    }

    const jaPossuiTipoImagem = imagem.tiposimagem.some(
      (tipoimagem) => tipoimagem.id_tipoimagem === imagemTipoImagem.id_tipoimagem,
    );
    if (jaPossuiTipoImagem) {
      throw new AppError("Imagem já possui este tipoimagem. ", 409);
    }

    imagem.tiposimagem.push(tipoimagem);

    await this.ImagemRepository.alterar(imagem);

    return imagem;
  }
}
