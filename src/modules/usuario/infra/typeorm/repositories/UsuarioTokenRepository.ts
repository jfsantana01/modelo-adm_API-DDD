import { Repository } from "typeorm";
import { UsuarioToken } from "../entities/UsuarioTokenEntity";
import { dataSource } from "@shared/infra/typeorm";
import { IUsuarioTokenRepository } from "@modules/usuario/domain/repositories/IUsuarioTokenRepository";

export class UsuarioTokenRepository implements IUsuarioTokenRepository {
  private ormRepository: Repository<UsuarioToken>;

  constructor() {
    this.ormRepository = dataSource.getRepository(UsuarioToken);
  }

  public async buscarPorToken(token: string): Promise<UsuarioToken | null> {
    const userToken = await this.ormRepository.findOneBy({
      token,
    });

    return userToken;
  }

  public async gerar(id_usuario: string): Promise<UsuarioToken> {
    const userToken = this.ormRepository.create({
      id_usuario,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}
