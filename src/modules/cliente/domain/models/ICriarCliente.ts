export interface ICriarCliente {
  ds_login: string;
  ds_email?: string;
  nr_cpf?: string;
  nr_telefoneprincipal?: string;
  nm_cliente: string;
  in_ativo?: boolean;
  ds_senha?: string;
}
