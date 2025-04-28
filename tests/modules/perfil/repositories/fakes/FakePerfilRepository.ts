import { v4 as uuidv4 } from "uuid";
import { IPerfilRepository } from "../../../../../src/modules/perfil/domain/repositories/IPerfilRepository";
import { ICriarPerfil } from "../../../../../src/modules/perfil/domain/models/ICriarPerfil";

import { IPerfil } from "../../../../../src/modules/perfil/domain/models/IPerfil";
import { Perfil } from "../../../../../src/modules/perfil/infra/typeorm/entities/PerfilEntity";
import { IListarPerfil } from "../../../../../src/modules/perfil/domain/models/IListarPerfil";
import { Acesso } from "../../../../../src/modules/acesso/infra/typeorm/entities/AcessoEntity";

export class FakePerfilRepository implements IPerfilRepository {
  private perfis: Perfil[] = [];
  private acessos: Acesso[] = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async listar(perfil: IListarPerfil): Promise<IPerfil[]> {
    return this.perfis;
  }
  public async criar({ nm_perfil, ds_perfil, in_ativo, acessos }: ICriarPerfil): Promise<Perfil> {
    const perfil = new Perfil();

    perfil.id_perfil = uuidv4(); // Simula o ID
    perfil.nm_perfil = nm_perfil?.toUpperCase();
    perfil.ds_perfil = ds_perfil?.toUpperCase();
    perfil.acessos = [];
    if (in_ativo) perfil.in_ativo = in_ativo;

    if (acessos) Object.assign(perfil.acessos, acessos);

    this.perfis.push(perfil);

    return perfil;
  }
  // public async criar({ nm_perfil, ds_perfil, in_ativo, acessos }: ICriarPerfil): Promise<Perfil> {
  //   const perfil = new Perfil();
  //   perfil.id_perfil = uuidv4();
  //   perfil.nm_perfil = nm_perfil;
  //   perfil.ds_perfil = ds_perfil;
  //   perfil.in_ativo = in_ativo;
  //   perfil.acessos = [];

  //   if (acessos) {
  //     const acessosEncontrados = this.acessos.filter((acesso) => acessos.some((a) => a.id_acesso === acesso.id_acesso));
  //     perfil.acessos = acessosEncontrados;
  //   }

  //   this.perfis.push(perfil);
  //   return perfil;
  // }

  public async alterar(perfil: Perfil): Promise<Perfil> {
    Object.assign(this.perfis, perfil);
    return perfil;
  }

  public async remover(perfil: Perfil): Promise<void> {
    this.perfis = this.perfis.filter((a) => a.id_perfil !== perfil.id_perfil);
  }

  public async buscarPorNome(nm_perfil: string): Promise<Perfil | null> {
    const perfil = this.perfis.find((perfil) => perfil.nm_perfil === nm_perfil);
    return perfil == undefined ? null : perfil;
  }

  public async buscarPorId(id_perfil: string): Promise<Perfil | null> {
    const perfil = this.perfis.find((perfil) => perfil.id_perfil === id_perfil);
    return perfil == undefined ? null : perfil;
  }
}
