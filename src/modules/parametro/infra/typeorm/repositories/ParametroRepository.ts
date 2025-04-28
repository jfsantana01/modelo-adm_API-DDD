import { FindOptionsWhere, ILike, Repository } from "typeorm";
import { dataSource } from "@shared/infra/typeorm";
import { IParametroRepository } from "../../../domain/repositories/IParametroRepository";
import { ICriarParametro } from "../../../domain/models/ICriarParametro";
import { Parametro } from "../entities/ParametroEntity";
import { IListarParametro } from "@modules/parametro/domain/models/IListarParametro";
import { IParametro } from "@modules/parametro/domain/models/IParametro";
import AppError from "@shared/errors/AppError";

export class ParametroRepository implements IParametroRepository {
  private ormRepository: Repository<Parametro>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Parametro);
  }
  public async listar(parametro: IListarParametro): Promise<IParametro[]> {
    const condicao: FindOptionsWhere<Parametro> = {};

    if (parametro.nm_parametro) {
      condicao.nm_parametro = ILike(`%${parametro.nm_parametro?.toString()}%`);
    }
    const result = await this.ormRepository.find({
      where: condicao,
    });
    if (result.length == 0) throw new AppError("Parametro não Encontrado.", 404);

    return result;
  }
  public async criar(parametroRequest: ICriarParametro): Promise<Parametro> {
    const parametro = this.ormRepository.create({
      nm_parametro: parametroRequest.nm_parametro?.toUpperCase(),
      vl_parametro1: parametroRequest.vl_parametro1,
      vl_parametro2: parametroRequest.vl_parametro2,
      vl_parametro3: parametroRequest.vl_parametro3,
    });
    await this.ormRepository.save(parametro);
    return parametro;
  }

  public async alterar(parametro: Parametro): Promise<Parametro> {
    await this.ormRepository.save(parametro);
    return parametro;
  }

  public async remover(parametro: Parametro): Promise<void> {
    await this.ormRepository.remove(parametro);
  }

  public async buscarPorNome(nm_parametro: string): Promise<Parametro | null> {
    const parametro = await this.ormRepository.findOneBy({
      nm_parametro,
    });

    return parametro;
  }

  public async buscarPorId(id_parametro: string): Promise<Parametro | null> {
    const parametro = await this.ormRepository.findOneBy({
      id_parametro,
    });

    return parametro;
  }
}
