import { sign, verify } from "jsonwebtoken";

export function codificarToken(data: string | Buffer | object, secretKey: string, time: string) {
  const token: string = sign(data, secretKey, {
    expiresIn: Number(time),
  });
  return token;
}
export function decodificarToken(token: string, secretKey: string) {
  const decoded = verify(token, secretKey || "");
  return decoded;
}
