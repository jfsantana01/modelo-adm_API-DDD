import { FindOptionsWhere, ILike, In, Repository } from "typeorm";
import { dataSource } from "@shared/infra/typeorm";
import { IImagemRepository, ISearchParams } from "../../../domain/repositories/IImagemRepository";
import { ICriarImagem } from "../../../domain/models/ICriarImagem";
import { Imagem } from "../entities/ImagemEntity";
import { IListarImagem } from "@modules/imagem/domain/models/IListarImagem";
import { IImagem } from "@modules/imagem/domain/models/IImagem";
import AppError from "@shared/errors/AppError";

export class ImagemRepository implements IImagemRepository {
  private ormRepository: Repository<Imagem>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Imagem);
  }
  public async listar(imagemRequest: IListarImagem): Promise<IImagem[]> {
    const condicao: FindOptionsWhere<Imagem> = {};

    if (imagemRequest.ds_imagem) {
      condicao.ds_imagem = ILike(`%${imagemRequest.ds_imagem?.toString()}%`);
    }
    if (imagemRequest.nm_imagem) {
      condicao.nm_imagem = ILike(`%${imagemRequest.nm_imagem?.toString()}%`);
    }
    if (imagemRequest.id_imagem) {
      condicao.id_imagem = imagemRequest.id_imagem;
    }
    if (typeof imagemRequest.tiposimagem === "string" || Array.isArray(imagemRequest.tiposimagem)) {
      let itens: string[] = [];
      if (typeof imagemRequest.tiposimagem === "string") {
        itens = imagemRequest.tiposimagem.split(",");
      } else {
        itens = imagemRequest.tiposimagem;
      }
      condicao.tiposimagem = {
        nm_tipoimagem: In(itens),
      };
    }
    const result = await this.ormRepository.find({
      where: condicao,
      relations: { tiposimagem: true },
      order: {
        nm_imagem: "ASC",
      },
    });
    if (result.length == 0) throw new AppError("Imagem não encontrado para o filtro informado.", 404);

    return result;
  }
  public async criar(imagemRequest: ICriarImagem): Promise<Imagem> {
    const imagem = this.ormRepository.create(imagemRequest);
    await this.ormRepository.save(imagem);
    return imagem;
  }

  public async alterar(imagem: Imagem): Promise<Imagem> {
    await this.ormRepository.save(imagem);
    return imagem;
  }

  public async remover(imagem: Imagem): Promise<void> {
    await this.ormRepository.remove(imagem);
  }

  public async buscarPorNome(nm_imagem: string): Promise<Imagem | null> {
    const imagem = await this.ormRepository.findOneBy({
      nm_imagem,
    });

    return imagem;
  }

  public async buscarPorId(id_imagem: string): Promise<Imagem | null> {
    const imagem = await this.ormRepository.findOneBy({
      id_imagem,
    });

    return imagem;
  }
}
