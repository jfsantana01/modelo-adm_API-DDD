import { v4 as uuidv4 } from "uuid";
import {
  IAcessoRepository,
  ISearchParams,
} from "../../../../../src/modules/acesso/domain/repositories/IAcessoRepository";
import { ICriarAcesso } from "../../../../../src/modules/acesso/domain/models/ICriarAcesso";
import { IAcessoPaginacao } from "@modules/acesso/domain/models/IAcessoPaginacao";

import { IListarAcesso } from "@modules/acesso/domain/models/IListarAcesso";
import { IAcesso } from "@modules/acesso/domain/models/IAcesso";
import { Acesso } from "@modules/acesso/infra/typeorm/entities/AcessoEntity";

export class FakeAcessoRepository implements IAcessoRepository {
  private acessos: Acesso[] = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async listar(acesso: IListarAcesso): Promise<IAcesso[]> {
    return this.acessos;
  }
  public async criar({ nm_acesso, ds_acesso, in_ativo }: ICriarAcesso): Promise<Acesso> {
    const acesso = new Acesso();
    acesso.id_acesso = uuidv4();
    acesso.nm_acesso = nm_acesso;
    acesso.ds_acesso = ds_acesso;
    if (in_ativo) acesso.in_ativo = in_ativo;

    this.acessos.push(acesso);
    return acesso;
  }

  public async listarPorPaginacao({ nm_acesso, page, skip, take }: ISearchParams): Promise<IAcessoPaginacao> {
    // Filtro por nome de acesso se fornecido
    let acessosFiltrados = this.acessos;

    if (nm_acesso) {
      acessosFiltrados = this.acessos.filter((acesso) =>
        acesso.nm_acesso.toLowerCase().includes(nm_acesso.toLowerCase()),
      );
    }

    // Paginação: slice para pegar a "página" correta
    const total = acessosFiltrados.length;
    const data = acessosFiltrados.slice(skip, skip + take); // Dados da página atual

    // Montando a resposta de paginação
    const acessosPaginacao: IAcessoPaginacao = {
      current_page: page, // Aqui o valor da página já deve ser o esperado
      per_page: take,
      total,
      data,
    };

    return acessosPaginacao;
  }

  public async alterar(acesso: Acesso): Promise<Acesso> {
    Object.assign(this.acessos, acesso);
    return acesso;
  }

  public async remover(acesso: Acesso): Promise<void> {
    this.acessos = this.acessos.filter((a) => a.id_acesso !== acesso.id_acesso);
  }

  public async buscarPorNome(nm_acesso: string): Promise<Acesso | null> {
    const acesso = this.acessos.find((acesso) => acesso.nm_acesso === nm_acesso);
    return acesso == undefined ? null : acesso;
  }

  public async buscarPorId(id_acesso: string): Promise<Acesso | null> {
    const acesso = this.acessos.find((acesso) => acesso.id_acesso === id_acesso);
    return acesso == undefined ? null : acesso;
  }
}
