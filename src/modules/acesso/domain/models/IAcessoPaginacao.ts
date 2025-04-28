import { IAcesso } from "./IAcesso";
export interface IAcessoPaginacao {
  data: IAcesso[];
  per_page: number;
  total: number;
  current_page: number;
}
