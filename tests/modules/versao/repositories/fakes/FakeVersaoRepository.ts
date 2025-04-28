import { v4 as uuidv4 } from "uuid";
import { IVersaoRepository } from "../../../../../src/modules/versao/domain/repositories/IVersaoRepository";
import { ICriarVersao } from "../../../../../src/modules/versao/domain/models/ICriarVersao";
import { IListarVersao } from "../../../../../src/modules/versao/domain/models/IListarVersao";
import { IVersao } from "../../../../../src/modules/versao/domain/models/IVersao";
import { Versao } from "../../../../../src/modules/versao/infra/typeorm/entities/VersaoEntity";

export class FakeVersaoRepository implements IVersaoRepository {
  private versoes: Versao[] = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async listar(versao: IListarVersao): Promise<IVersao[]> {
    return this.versoes;
  }
  public async criar({ nm_versao, ds_versao }: ICriarVersao): Promise<Versao> {
    const versao = new Versao();
    versao.id_versao = uuidv4();
    versao.nm_versao = nm_versao;
    versao.ds_versao = ds_versao;

    this.versoes.push(versao);
    return versao;
  }

  public async alterar(versao: Versao): Promise<Versao> {
    Object.assign(this.versoes, versao);
    return versao;
  }

  public async remover(versao: Versao): Promise<void> {
    this.versoes = this.versoes.filter((a) => a.id_versao !== versao.id_versao);
  }

  public async buscarPorNome(nm_versao: string): Promise<Versao | null> {
    const versao = this.versoes.find((versao) => versao.nm_versao === nm_versao);
    return versao == undefined ? null : versao;
  }

  public async buscarPorId(id_versao: string): Promise<Versao | null> {
    const versao = this.versoes.find((versao) => versao.id_versao === id_versao);
    return versao == undefined ? null : versao;
  }
}
