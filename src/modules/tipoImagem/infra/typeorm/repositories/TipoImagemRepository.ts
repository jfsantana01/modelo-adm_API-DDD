import { FindOptionsWhere, ILike, In, Repository } from "typeorm";
import { dataSource } from "@shared/infra/typeorm";
import { ITipoImagemRepository } from "../../../domain/repositories/ITipoImagemRepository";
import { ICriarTipoImagem } from "../../../domain/models/ICriarTipoImagem";
import { TipoImagem } from "../entities/TipoImagemEntity";
import { IListarTipoImagem } from "@modules/tipoImagem/domain/models/IListarTipoImagem";
import { ITipoImagem } from "@modules/tipoImagem/domain/models/ITipoImagem";
import AppError from "@shared/errors/AppError";

export class TipoImagemRepository implements ITipoImagemRepository {
  private ormRepository: Repository<TipoImagem>;

  constructor() {
    this.ormRepository = dataSource.getRepository(TipoImagem);
  }
  public async listar(tipoimagemRequest: IListarTipoImagem): Promise<ITipoImagem[]> {
    const condicao: FindOptionsWhere<TipoImagem> = {};

    if (tipoimagemRequest.ds_tipoimagem) {
      condicao.ds_tipoimagem = ILike(`%${tipoimagemRequest.ds_tipoimagem?.toString()}%`);
    }
    if (tipoimagemRequest.nm_tipoimagem) {
      condicao.nm_tipoimagem = ILike(`%${tipoimagemRequest.nm_tipoimagem?.toString()}%`);
    }
    if (tipoimagemRequest.id_tipoimagem) {
      condicao.id_tipoimagem = tipoimagemRequest.id_tipoimagem;
    }
    if (tipoimagemRequest.imagens) {
      condicao.imagens = {
        nm_imagem: In(tipoimagemRequest.imagens),
      };
    }
    const result = await this.ormRepository.find({
      where: condicao,
      relations: { imagens: true },
      order: {
        nm_tipoimagem: "ASC",
      },
    });
    if (result.length == 0) throw new AppError("TipoImagem não encontrado para o filtro informado.", 404);

    return result;
  }
  public async criar(tipoimagemRequest: ICriarTipoImagem): Promise<TipoImagem> {
    const tipoimagem = this.ormRepository.create(tipoimagemRequest);
    await this.ormRepository.save(tipoimagem);
    return tipoimagem;
  }

  public async alterar(tipoimagem: TipoImagem): Promise<TipoImagem> {
    await this.ormRepository.save(tipoimagem);
    return tipoimagem;
  }

  public async remover(tipoimagem: TipoImagem): Promise<void> {
    await this.ormRepository.remove(tipoimagem);
  }

  public async buscarPorNome(nm_tipoimagem: string): Promise<TipoImagem | null> {
    const tipoimagem = await this.ormRepository.findOneBy({
      nm_tipoimagem,
    });

    return tipoimagem;
  }

  public async buscarPorId(id_tipoimagem: string): Promise<TipoImagem | null> {
    const tipoimagem = await this.ormRepository.findOneBy({
      id_tipoimagem,
    });

    return tipoimagem;
  }
}
