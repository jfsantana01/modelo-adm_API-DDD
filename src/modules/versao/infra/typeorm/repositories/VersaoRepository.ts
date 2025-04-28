import { FindOptionsWhere, ILike, Repository } from "typeorm";
import { dataSource } from "@shared/infra/typeorm";
import { IVersaoRepository } from "../../../domain/repositories/IVersaoRepository";
import { ICriarVersao } from "../../../domain/models/ICriarVersao";
import { Versao } from "../entities/VersaoEntity";
import { IListarVersao } from "@modules/versao/domain/models/IListarVersao";
import { IVersao } from "@modules/versao/domain/models/IVersao";
import AppError from "@shared/errors/AppError";

export class VersaoRepository implements IVersaoRepository {
  private ormRepository: Repository<Versao>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Versao);
  }
  public async listar(versao: IListarVersao): Promise<IVersao[]> {
    const condicao: FindOptionsWhere<Versao> = {};

    if (versao.nm_versao) {
      condicao.nm_versao = ILike(`%${versao.nm_versao?.toString()}%`);
    }
    const result = await this.ormRepository.find({
      where: condicao,
    });
    if (result.length == 0) throw new AppError("Versao não Encontrada.", 404);

    return result;
  }
  public async criar({ nm_versao, ds_versao }: ICriarVersao): Promise<Versao> {
    const versao = this.ormRepository.create({
      nm_versao: nm_versao?.toUpperCase(),
      ds_versao: ds_versao?.toUpperCase(),
    });
    await this.ormRepository.save(versao);
    return versao;
  }

  public async alterar(versao: Versao): Promise<Versao> {
    await this.ormRepository.save(versao);
    return versao;
  }

  public async remover(versao: Versao): Promise<void> {
    await this.ormRepository.remove(versao);
  }

  public async buscarPorNome(nm_versao: string): Promise<Versao | null> {
    const versao = await this.ormRepository.findOneBy({
      nm_versao,
    });

    return versao;
  }

  public async buscarPorId(id_versao: string): Promise<Versao | null> {
    const versao = await this.ormRepository.findOneBy({
      id_versao,
    });

    return versao;
  }
}
