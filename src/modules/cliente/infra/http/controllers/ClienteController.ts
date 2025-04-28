import { Request, Response } from "express";
import { container } from "tsyringe";
import { CriarClienteService } from "@modules/cliente/services/CriarClienteService";
import { AlterarClienteService } from "@modules/cliente/services/AlterarClienteService";
import { ListarClienteService } from "@modules/cliente/services/ListarClienteService";
import { sucesso } from "@shared/responses/AppResponse";
import { ICriarCliente } from "@modules/cliente/domain/models/ICriarCliente";
import { IAlterarCliente } from "@modules/cliente/domain/models/IAlterarCliente";
import { IListarCliente } from "@modules/cliente/domain/models/IListarCliente";
import { instanceToPlain } from "class-transformer";

export class ClienteController {
  public async listar(req: Request, res: Response): Promise<Response> {
    const cliente: IListarCliente = {
      id_cliente: req.query.id_cliente as string,
      nm_cliente: req.query.nm_cliente as string,
      ds_login: req.query.ds_login as string,
      nr_telefoneprincipal: req.query.nr_telefoneprincipal as string,
    };
    const listarCliente = container.resolve(ListarClienteService);
    const clienteResponse = await listarCliente.execute(cliente);

    return res.json(sucesso(instanceToPlain(clienteResponse)));
  }

  public async criar(req: Request, res: Response): Promise<Response> {
    const cliente: ICriarCliente = {
      nm_cliente: req.body.nm_cliente,
      in_ativo: req.body.in_ativo,
      ds_email: req.body.ds_email,
      ds_login: req.body.ds_login,
      ds_senha: req.body.ds_senha,
      nr_cpf: req.body.nr_cpf,
      nr_telefoneprincipal: req.body.nr_telefoneprincipal,
    };

    const criarCliente = container.resolve(CriarClienteService);
    const clienteResponse = await criarCliente.execute(cliente);

    return res.json(sucesso(instanceToPlain(clienteResponse)));
  }

  public async alterar(req: Request, res: Response): Promise<Response> {
    const cliente: IAlterarCliente = {
      id_cliente: req.body.id_cliente,
      nm_cliente: req.body.nm_cliente,
      in_ativo: req.body.in_ativo,
      ds_email: req.body.ds_email,
      ds_login: req.body.ds_login,
      ds_senha: req.body.ds_senha,
      nr_cpf: req.body.nr_cpf,
      nr_telefoneprincipal: req.body.nr_telefoneprincipal,
    };

    const alterarCliente = container.resolve(AlterarClienteService);
    const clienteResponse = await alterarCliente.execute(cliente);
    return res.json(sucesso(instanceToPlain(clienteResponse)));
  }
}
