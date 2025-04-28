import { CONFLICT, FORBIDDEN, INTERNAL_SERVER_ERROR, UNAUTHORIZED } from "@shared/errors/AppError";

export function sucesso(data: unknown, message?: string) {
  return { statuscode: 200, message: message || "OK", data: data || [] };
}
export function naoAutorizado(message?: string) {
  return {
    statuscode: UNAUTHORIZED,
    message: message || "Você não está autorizado.",
    data: [],
  };
}
export function naoAutenticado(message?: string) {
  return {
    statuscode: FORBIDDEN,
    message: message || "Você não está autenticado.",
    data: [],
  };
}
export function conflito(message?: string, details?: unknown[]) {
  return {
    statuscode: CONFLICT,
    message: message || "Já existe um registro com os mesmos dados.",
    details: details,
  };
}
export function erro(message?: string, details?: unknown[]) {
  return {
    statuscode: INTERNAL_SERVER_ERROR,
    message: message || "Internal server error",
    details: details,
  };
}
