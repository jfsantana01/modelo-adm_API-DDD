import { Request, Response, NextFunction } from "express";
import { createClient } from "redis";
import { RateLimiterRedis } from "rate-limiter-flexible";
import AppError from "@shared/errors/AppError";

let client: ReturnType<typeof createClient> | null = null;

if (process.env.REDIS_ATIVO === "true") {
  client = createClient({
    password: process.env.REDIS_PASS || undefined,
    socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
  });

  client
    .connect()
    .then(() => {
      console.log("Connected to Redis");
    })
    .catch((err) => {
      console.error("Failed to connect to Redis", err);
    });
}

export default function rateLimiter(points: number, duration: number) {
  if (!client) {
    // Retorna um middleware que apenas avança caso o Redis não esteja habilitado
    return (req: Request, res: Response, next: NextFunction) => next();
  }

  const limiter = new RateLimiterRedis({
    storeClient: client,
    keyPrefix: "ratelimit",
    points,
    duration,
  });

  return async function (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Consumir pontos do IP do cliente
      await limiter.consume(req.ip! + req.baseUrl!);
      console.log("req.ip! + req.url!:", req.ip! + req.url!);

      return next();
    } catch (err) {
      console.log(err);
      // Caso os pontos sejam excedidos, retorna um erro 429 (Too many requests)
      throw new AppError("Muitas requisições. Tente novamente mais tarde.", 429);
    }
  };
}
