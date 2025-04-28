import Redis, { Redis as RedisClient } from "ioredis";
import cacheConfig from "@config/cache";

export default new (class RedisCache {
  private client: RedisClient | null;

  constructor() {
    if (process.env.REDIS_ATIVO === "true") {
      this.client = new Redis(cacheConfig.config.redis);
      console.log("Redis habilitado e conectado");
    } else {
      this.client = null;
      console.warn("Redis desativado pelo ambiente");
    }
  }

  public async salvar(key: string, value: unknown): Promise<void> {
    if (!this.client) {
      console.warn(`Redis desativado: chave ${key} não foi salva.`);
      return;
    }

    const aliasKey = cacheConfig.config.alias + ":" + key;
    await this.client.set(aliasKey, JSON.stringify(value), "EX", cacheConfig.config.expiration);
  }

  public async recuperar<T>(key: string): Promise<T | null> {
    if (!this.client) {
      console.warn(`Redis desativado: chave ${key} não foi recuperada.`);
      return null;
    }

    const aliasKey = cacheConfig.config.alias + ":" + key;
    const data = await this.client.get(aliasKey);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidar(key: string): Promise<void> {
    if (!this.client) {
      console.warn(`Redis desativado: chave ${key} não foi invalidada.`);
      return;
    }

    const aliasKey = cacheConfig.config.alias + ":" + key;
    await this.client.del(aliasKey);
  }

  public async recuperaKeys(key: string): Promise<string[]> {
    if (!this.client) {
      console.warn(`Redis desativado: chaves ${key} não foram recuperadas.`);
      return [];
    }

    const aliasKey = cacheConfig.config.alias + ":" + key;
    return await this.client.keys(aliasKey);
  }

  public async invalidarTodasAsKeys(key: string): Promise<void> {
    if (!this.client) {
      console.warn(`Redis desativado: chaves ${key} não foram invalidadas.`);
      return;
    }

    const keysRedis = await this.recuperaKeys(key + "*");
    if (keysRedis.length > 0) {
      await this.client.del(keysRedis);
    }
  }
})();
