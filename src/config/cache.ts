import { RedisOptions } from "ioredis";

interface ICacheConfig {
  config: {
    redis: RedisOptions;
    expiration: number;
    alias: string;
  };
  driver: string;
}

export default {
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS || undefined,
    },
    expiration: process.env.REDIS_EXPIRATION || 3600,
    alias: process.env.REDIS_ALIAS || "unamed",
  },
  driver: "redis",
} as ICacheConfig;
