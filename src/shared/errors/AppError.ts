export const SUCCESS = 200; //Sucesso
export const SUCCESS_NO_CHANGE = 202; //Sucesso sem alterações
export const BAD_REQUEST = 400; // parametros invalidos enviados no rquest
export const UNAUTHORIZED = 401; // erro de senha ou autenticações inválidas
export const FORBIDDEN = 403; // ausencia de token na requisição
export const NOT_FOUND = 404; // conteudo não encontrado
export const CONFLICT = 409; // conflito , arquivo ja existe entre outros
export const CONTENT_TOO_LARGE = 413; // conteudo muito longo, arquivo muito grande,
export const MANY_REQUESTS = 429; // muitas requisições, usado no rateLimit,
export const INTERNAL_SERVER_ERROR = 500; // erro interno, exceções do cath;
export const UNAVAILABLE = 503; // Serviço indisponível;
export const PAYMENT_REQUIRED = 402; // Recebimento pendente;

export type StatuscodeType =
  | typeof SUCCESS
  | typeof BAD_REQUEST
  | typeof UNAUTHORIZED
  | typeof FORBIDDEN
  | typeof NOT_FOUND
  | typeof CONFLICT
  | typeof CONTENT_TOO_LARGE
  | typeof INTERNAL_SERVER_ERROR
  | typeof MANY_REQUESTS
  | typeof UNAVAILABLE
  | typeof PAYMENT_REQUIRED
  | typeof SUCCESS_NO_CHANGE;

export default class AppError {
  public readonly message: string;
  public readonly statusCode: StatuscodeType;
  public readonly errors?: unknown[];

  constructor(message: string, statusCode: StatuscodeType, errors?: unknown[]) {
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
