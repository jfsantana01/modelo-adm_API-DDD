import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICriarTipoImagem } from "../domain/models/ICriarTipoImagem";
import { ITipoImagem } from "../domain/models/ITipoImagem";
import { ITipoImagemRepository } from "../domain/repositories/ITipoImagemRepository";

@injectable()
export class CriarTipoImagemService {
  constructor(
    @inject("TipoImagemRepository")
    private TipoImagemRepository: ITipoImagemRepository,
  ) {}

  public async execute(tipoimagem: ICriarTipoImagem): Promise<ITipoImagem> {
    const tipoimagemExiste = await this.TipoImagemRepository.buscarPorNome(tipoimagem.nm_tipoimagem);

    if (tipoimagemExiste) {
      throw new AppError("Já existe um tipoimagem com este nome.", 409);
    }

    tipoimagem.nm_tipoimagem = tipoimagem.nm_tipoimagem?.toUpperCase();
    tipoimagem.ds_tipoimagem = tipoimagem.ds_tipoimagem?.toUpperCase();

    const tipoimagemResponse = await this.TipoImagemRepository.criar(tipoimagem);

    return tipoimagemResponse;
  }
}
