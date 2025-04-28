import { ITokenPayload } from "@shared/domain/models/ITokenPayload";

declare module "express" {
  interface Request {
    token?: ITokenPayload;
  }
}
