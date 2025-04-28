export interface ICliente {
  id_cliente: string;
  ds_login: string;
  ds_email: string;
  nr_cpf: string;
  nr_telefoneprincipal: string;
  nm_cliente: string;
  in_ativo: boolean;
  ds_senha: string;
  ds_senha2: string;
  ds_senha3: string;
  created_at: Date;
  updated_at: Date;
}
