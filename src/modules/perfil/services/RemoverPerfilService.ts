import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IRemoverPerfil } from "../domain/models/IRemoverPerfil";
import { IPerfilRepository } from "../domain/repositories/IPerfilRepository";

@injectable()
export class RemoverPerfilService {
  constructor(
    @inject("PerfilRepository")
    private PerfilRepository: IPerfilRepository,
  ) {}

  public async execute({ id_perfil }: IRemoverPerfil): Promise<void> {
    const Perfil = await this.PerfilRepository.buscarPorId(id_perfil);

    if (!Perfil || !id_perfil) {
      throw new AppError("Perfil não encontrado.", 404);
    }
    await this.PerfilRepository.remover(Perfil);
  }
}
