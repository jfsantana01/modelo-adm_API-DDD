import { FindOptionsWhere, ILike, Repository } from "typeorm";
import { dataSource } from "@shared/infra/typeorm";
import { IClienteRepository } from "../../../domain/repositories/IClienteRepository";
import { ICriarCliente } from "../../../domain/models/ICriarCliente";
import { Cliente } from "../entities/ClienteEntity";
import { IListarCliente } from "@modules/cliente/domain/models/IListarCliente";
import { ICliente } from "@modules/cliente/domain/models/ICliente";
import AppError from "@shared/errors/AppError";

export class ClienteRepository implements IClienteRepository {
  private ormRepository: Repository<Cliente>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Cliente);
  }
  public async listar(clienteRequest: IListarCliente): Promise<ICliente[]> {
    const condicao: FindOptionsWhere<Cliente> = {};

    if (clienteRequest.nm_cliente) {
      condicao.nm_cliente = ILike(`%${clienteRequest.nm_cliente?.toString()}%`);
    }
    if (clienteRequest.id_cliente) {
      condicao.id_cliente = clienteRequest.id_cliente;
    }

    const result = await this.ormRepository.find({
      where: condicao,
      order: {
        nm_cliente: "ASC",
      },
    });
    if (result.length == 0) throw new AppError("Cliente não encontrado para o filtro informado.", 404);

    return result;
  }
  public async criar(clienteRequest: ICriarCliente): Promise<Cliente> {
    const cliente = this.ormRepository.create(clienteRequest);
    await this.ormRepository.save(cliente);
    return cliente;
  }

  public async alterar(cliente: Cliente): Promise<Cliente> {
    await this.ormRepository.save(cliente);
    return cliente;
  }

  public async buscarPorLogin(ds_login: string): Promise<Cliente | null> {
    const cliente = await this.ormRepository.findOneBy({
      ds_login,
    });

    return cliente;
  }

  public async buscarPorId(id_cliente: string): Promise<Cliente | null> {
    const cliente = await this.ormRepository.findOneBy({
      id_cliente,
    });

    return cliente;
  }
}
