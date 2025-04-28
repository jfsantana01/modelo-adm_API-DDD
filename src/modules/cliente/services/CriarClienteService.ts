import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICriarCliente } from "../domain/models/ICriarCliente";
import { ICliente } from "../domain/models/ICliente";
import { IClienteRepository } from "../domain/repositories/IClienteRepository";
import { IHashProvider } from "@shared/providers/hashProvider/models/IHashPovider";
import RedisCache from "@shared/cache/RedisCache";
const keyRedis = "cliente";

@injectable()
export class CriarClienteService {
  constructor(
    @inject("ClienteRepository")
    private ClienteRepository: IClienteRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider,
  ) {}

  public async execute(cliente: ICriarCliente): Promise<ICliente> {
    const clienteExiste = await this.ClienteRepository.buscarPorLogin(cliente.ds_login);

    if (clienteExiste) {
      throw new AppError("Já existe um Cliente com este login.", 409);
    }

    cliente.nm_cliente = cliente.nm_cliente?.trim().toUpperCase();

    cliente.nr_cpf = cliente.nr_cpf ? cliente.nr_cpf?.trim() : undefined;

    cliente.nr_telefoneprincipal = cliente.nr_telefoneprincipal?.trim();
    cliente.ds_login = cliente.ds_login?.trim().toUpperCase();
    cliente.ds_email = cliente.ds_email?.trim().toUpperCase();

    if (cliente.ds_senha) {
      cliente.ds_senha = await this.hashProvider.generateHash(cliente.ds_senha.trim());
    } else {
      cliente.ds_senha = undefined;
    }

    const clienteResponse = await this.ClienteRepository.criar(cliente);
    RedisCache.invalidarTodasAsKeys(keyRedis);
    return clienteResponse;
  }
}
