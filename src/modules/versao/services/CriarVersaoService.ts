import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICriarVersao } from "../domain/models/ICriarVersao";
import { IVersao } from "../domain/models/IVersao";
import { IVersaoRepository } from "../domain/repositories/IVersaoRepository";

@injectable()
export class CriarVersaoService {
  constructor(
    @inject("VersaoRepository")
    private VersaoRepository: IVersaoRepository,
  ) {}

  public async execute(versao: ICriarVersao): Promise<IVersao> {
    const versaoExiste = await this.VersaoRepository.buscarPorNome(versao.nm_versao);

    if (versaoExiste) {
      throw new AppError("Já existe um versao com este nome.", 409);
    }

    const versaoResponse = await this.VersaoRepository.criar(versao);

    return versaoResponse;
  }
}
