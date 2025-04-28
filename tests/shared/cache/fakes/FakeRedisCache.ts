
class FakeRedisCache {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private cache: Map<string, any>;

  constructor() {
    this.cache = new Map();
  }

  public async salvar(key: string, value: unknown): Promise<void> {
    const aliasKey = "alias:" + key; // Simulando o alias no fake
    this.cache.set(aliasKey, JSON.stringify(value));
  }

  public async recuperar<T>(key: string): Promise<T | null> {
    const aliasKey = "alias:" + key; // Simulando o alias no fake
    const data = this.cache.get(aliasKey);

    if (!data) {
      return null;
    }

    return JSON.parse(data) as T;
  }

  public async invalidar(key: string): Promise<void> {
    const aliasKey = "alias:" + key; // Simulando o alias no fake
    this.cache.delete(aliasKey);
  }

  public async recuperaKeys(key: string): Promise<string[]> {
    const aliasKey = "alias:" + key;
    const keys = [...this.cache.keys()].filter((k) => k.startsWith(aliasKey));
    return keys;
  }

  public async invalidarTodasAsKeys(key: string): Promise<void> {
    const keys = await this.recuperaKeys(key);
    keys.forEach((key) => this.cache.delete(key));
  }
}

export default FakeRedisCache;
