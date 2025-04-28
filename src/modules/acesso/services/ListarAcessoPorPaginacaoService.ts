import { inject, injectable } from "tsyringe";
import { IAcessoRepository } from "../domain/repositories/IAcessoRepository";
import { IAcessoPaginacao } from "../domain/models/IAcessoPaginacao";

interface ISearchParams {
  nm_acesso: string;
  page: number;
  limit: number;
}
@injectable()
export class ListarAcessoPorPaginacaoService {
  constructor(
    @inject("AcessoRepository")
    private acessoRepository: IAcessoRepository,
  ) {}

  public async execute({ nm_acesso, page, limit }: ISearchParams): Promise<IAcessoPaginacao> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const acessos = await this.acessoRepository.listarPorPaginacao({
      nm_acesso,
      page,
      skip,
      take,
    });

    return acessos;
  }
}
