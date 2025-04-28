import { FindOptionsWhere, ILike, In, Repository } from "typeorm";
import { dataSource } from "@shared/infra/typeorm";
import { IPerfilRepository } from "../../../domain/repositories/IPerfilRepository";
import { ICriarPerfil } from "../../../domain/models/ICriarPerfil";
import { IListarPerfil } from "@modules/perfil/domain/models/IListarPerfil";
import { IPerfil } from "@modules/perfil/domain/models/IPerfil";
import AppError from "@shared/errors/AppError";
import { Perfil } from "../entities/PerfilEntity";
import { Acesso } from "@modules/acesso/infra/typeorm/entities/AcessoEntity";

export class PerfilRepository implements IPerfilRepository {
  private perfilRepository: Repository<Perfil>;
  //private acessoRepository: Repository<Acesso>;

  constructor() {
    this.perfilRepository = dataSource.getRepository(Perfil);
   // this.acessoRepository = dataSource.getRepository(Acesso);
  }
  public async listar(perfilRequest: IListarPerfil): Promise<IPerfil[]> {
    const condicao: FindOptionsWhere<Perfil> = {};

    if (perfilRequest.ds_perfil) {
      condicao.ds_perfil = ILike(`%${perfilRequest.ds_perfil?.toString()}%`);
    }
    if (perfilRequest.nm_perfil) {
      condicao.nm_perfil = ILike(`%${perfilRequest.nm_perfil?.toString()}%`);
    }
    if (perfilRequest.id_perfil) {
      condicao.id_perfil = perfilRequest.id_perfil;
    }
    if (perfilRequest.acessos) {
      condicao.acessos = {
        nm_acesso: In(perfilRequest.acessos),
      };
    }

    const result = await this.perfilRepository.find({
      where: condicao,
      relations: { acessos: true },
      order: {
        nm_perfil: "ASC",
      },
    });
    if (result.length == 0) throw new AppError("Perfil não encontrado para o filtro informado.", 404);

    return result;
  }
  public async criar(perfilRequest: ICriarPerfil): Promise<Perfil> {
    const perfil = this.perfilRepository.create(perfilRequest);
    await this.perfilRepository.save(perfil);
    return perfil;
  }

  public async alterar(perfil: Perfil): Promise<Perfil> {
    await this.perfilRepository.save(perfil);
    return perfil;
  }

  public async remover(perfil: Perfil): Promise<void> {
    await this.perfilRepository.remove(perfil);
  }

  public async buscarPorNome(nm_perfil: string): Promise<Perfil | null> {
    const perfil = await this.perfilRepository.findOne({
      where: { nm_perfil: nm_perfil },
      relations: { acessos: true },
    });

    return perfil;
  }

  public async buscarPorId(id_perfil: string): Promise<Perfil | null> {
    const perfil = await this.perfilRepository.findOne({
      where: { id_perfil: id_perfil },
      relations: { acessos: true },
    });

    return perfil;
  }
}
