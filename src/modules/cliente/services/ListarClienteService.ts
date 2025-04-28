import { inject, injectable } from "tsyringe";
import RedisCache from "@shared/cache/RedisCache";
import { IClienteRepository } from "../domain/repositories/IClienteRepository";
import { IListarCliente } from "../domain/models/IListarCliente";
import { ICliente } from "../domain/models/ICliente";
const keyRedis = "cliente";

@injectable()
export class ListarClienteService {
  constructor(
    @inject("ClienteRepository")
    private clienteRepository: IClienteRepository,
  ) {}

  public async execute(cliente: IListarCliente): Promise<ICliente[]> {
    const clientesRedis = await RedisCache.recuperar(keyRedis + JSON.stringify(cliente));
    if (clientesRedis) return clientesRedis as ICliente[];
    const clientes = await this.clienteRepository.listar(cliente);
    if (clientes.length > 0) RedisCache.salvar(keyRedis + JSON.stringify(cliente), clientes);
    return clientes;
  }
}
