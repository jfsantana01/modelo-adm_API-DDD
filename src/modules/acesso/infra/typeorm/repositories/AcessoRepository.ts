import { FindOptionsWhere, ILike, In, Repository } from "typeorm";
import { dataSource } from "@shared/infra/typeorm";
import { IAcessoRepository, ISearchParams } from "../../../domain/repositories/IAcessoRepository";
import { ICriarAcesso } from "../../../domain/models/ICriarAcesso";
import { IAcessoPaginacao } from "@modules/acesso/domain/models/IAcessoPaginacao";
import { Acesso } from "../entities/AcessoEntity";
import { IListarAcesso } from "@modules/acesso/domain/models/IListarAcesso";
import { IAcesso } from "@modules/acesso/domain/models/IAcesso";
import AppError from "@shared/errors/AppError";

export class AcessoRepository implements IAcessoRepository {
  private ormRepository: Repository<Acesso>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Acesso);
  }
  public async listar(acessoRequest: IListarAcesso): Promise<IAcesso[]> {
    const condicao: FindOptionsWhere<Acesso> = {};

    if (acessoRequest.ds_acesso) {
      condicao.ds_acesso = ILike(`%${acessoRequest.ds_acesso?.toString()}%`);
    }
    if (acessoRequest.nm_acesso) {
      condicao.nm_acesso = ILike(`%${acessoRequest.nm_acesso?.toString()}%`);
    }
    if (acessoRequest.id_acesso) {
      condicao.id_acesso = acessoRequest.id_acesso;
    }
    if (acessoRequest.perfis) {
      condicao.perfis = {
        nm_perfil: In(acessoRequest.perfis),
      };
    }
    const result = await this.ormRepository.find({
      where: condicao,
      relations: { perfis: true },
      order: {
        nm_acesso: "ASC",
      },
    });
    if (result.length == 0) throw new AppError("Acesso não encontrado para o filtro informado.", 404);

    return result;
  }
  public async criar(acessoRequest: ICriarAcesso): Promise<Acesso> {
    const acesso = this.ormRepository.create(acessoRequest);
    await this.ormRepository.save(acesso);
    return acesso;
  }

  public async listarPorPaginacao({ nm_acesso, page, skip, take }: ISearchParams): Promise<IAcessoPaginacao> {
    const condicao: FindOptionsWhere<Acesso> = {};

    if (nm_acesso) {
      condicao.nm_acesso = ILike(`%${nm_acesso?.toString()}%`);
    }
    const queryBuilder = this.ormRepository.createQueryBuilder("acesso");
    if (condicao) {
      queryBuilder.where(condicao);
    }
    const [acessos, count] = await queryBuilder.skip(skip).take(take).getManyAndCount();
    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: acessos,
    };
    if (result.data.length == 0) throw new AppError("Acesso não Encontrado.", 404);

    return result;
  }

  public async alterar(acesso: Acesso): Promise<Acesso> {
    await this.ormRepository.save(acesso);
    return acesso;
  }

  public async remover(acesso: Acesso): Promise<void> {
    await this.ormRepository.remove(acesso);
  }

  public async buscarPorNome(nm_acesso: string): Promise<Acesso | null> {
    const acesso = await this.ormRepository.findOneBy({
      nm_acesso,
    });

    return acesso;
  }

  public async buscarPorId(id_acesso: string): Promise<Acesso | null> {
    const acesso = await this.ormRepository.findOneBy({
      id_acesso,
    });

    return acesso;
  }
}
