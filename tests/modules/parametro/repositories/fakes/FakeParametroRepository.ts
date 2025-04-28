import { v4 as uuidv4 } from "uuid";
import { IParametroRepository } from "../../../../../src/modules/parametro/domain/repositories/IParametroRepository";
import { ICriarParametro } from "../../../../../src/modules/parametro/domain/models/ICriarParametro";
import { IListarParametro } from "../../../../../src/modules/parametro/domain/models/IListarParametro";
import { IParametro } from "../../../../../src/modules/parametro/domain/models/IParametro";
import { Parametro } from "../../../../../src/modules/parametro/infra/typeorm/entities/ParametroEntity";

export class FakeParametroRepository implements IParametroRepository {
  private parametros: Parametro[] = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async listar(parametro: IListarParametro): Promise<IParametro[]> {
    return this.parametros;
  }
  public async criar(parametro: ICriarParametro): Promise<Parametro> {
    const parametroResponse = new Parametro();
    parametroResponse.id_parametro = uuidv4();
    parametroResponse.nm_parametro = parametro.nm_parametro;
    parametroResponse.vl_parametro1 = parametro.vl_parametro1;

    this.parametros.push(parametroResponse);
    return parametroResponse;
  }

  public async alterar(parametro: Parametro): Promise<Parametro> {
    Object.assign(this.parametros, parametro);
    return parametro;
  }

  public async remover(parametro: Parametro): Promise<void> {
    this.parametros = this.parametros.filter((a) => a.id_parametro !== parametro.id_parametro);
  }

  public async buscarPorNome(nm_parametro: string): Promise<Parametro | null> {
    const parametro = this.parametros.find((parametro) => parametro.nm_parametro === nm_parametro);
    return parametro == undefined ? null : parametro;
  }

  public async buscarPorId(id_parametro: string): Promise<Parametro | null> {
    const parametro = this.parametros.find((parametro) => parametro.id_parametro === id_parametro);
    return parametro == undefined ? null : parametro;
  }
}
