import { IUsuarioToken } from "../models/IUsuarioToken";

export interface IUsuarioTokenRepository {
  buscarPorToken(token: string): Promise<IUsuarioToken | null>;
  gerar(id: string): Promise<IUsuarioToken>;
}
