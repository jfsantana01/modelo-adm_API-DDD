import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IAlterarCliente } from "../domain/models/IAlterarCliente";
import { IClienteRepository } from "../domain/repositories/IClienteRepository";
import { ICliente } from "../domain/models/ICliente";
import RedisCache from "@shared/cache/RedisCache";
import { IHashProvider } from "@shared/providers/hashProvider/models/IHashPovider";
const keyRedis = "cliente";

@injectable()
export class AlterarClienteService {
  constructor(
    @inject("ClienteRepository")
    private ClienteRepository: IClienteRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider,
  ) {}

  public async execute(cliente: IAlterarCliente): Promise<ICliente> {
    const clienteResponse = await this.ClienteRepository.buscarPorId(cliente.id_cliente);

    if (!clienteResponse || !cliente.id_cliente) {
      throw new AppError("Cliente não Encontrado.", 404);
    }

    if (cliente.nm_cliente) clienteResponse.nm_cliente = cliente.nm_cliente?.trim().toUpperCase();
    if (cliente.nr_telefoneprincipal)
      clienteResponse.nr_telefoneprincipal = cliente.nr_telefoneprincipal?.trim().toUpperCase();
    if (cliente.ds_login) clienteResponse.ds_login = cliente.ds_login?.trim().toUpperCase();
    if (cliente.ds_email) clienteResponse.ds_email = cliente.ds_email?.trim().toUpperCase();
    if (cliente.nr_cpf) clienteResponse.nr_cpf = cliente.nr_cpf?.trim();
    if (cliente.ds_senha) {
      const hashSenha = await this.hashProvider.generateHash(cliente.ds_senha.trim());
      clienteResponse.ds_senha = hashSenha;
    }

    if (typeof cliente.in_ativo === "boolean") clienteResponse.in_ativo = cliente.in_ativo;

    await this.ClienteRepository.alterar(clienteResponse);
    RedisCache.invalidarTodasAsKeys(keyRedis);
    return clienteResponse;
  }
}
