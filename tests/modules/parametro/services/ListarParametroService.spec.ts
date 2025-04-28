import FakeRedisCache from "../../../shared/cache/fakes/FakeRedisCache";
import { FakeParametroRepository } from "../repositories/fakes/FakeParametroRepository";
import { ListarParametroService } from "../../../../src/modules/parametro/services/ListarParametroService";
import RedisCache from "../../../../src/shared/cache/RedisCache";

describe("ListarParametroService", () => {
  let fakeParametroRepository: FakeParametroRepository;
  let listarParametroService: ListarParametroService;
  let fakeRedisCache: FakeRedisCache;

  beforeEach(() => {
    fakeParametroRepository = new FakeParametroRepository();
    listarParametroService = new ListarParametroService(fakeParametroRepository);
    fakeRedisCache = new FakeRedisCache();

    // Mockando os métodos do RedisCache para usar o fake no lugar do Redis real
    jest.spyOn(RedisCache, "salvar").mockImplementation(fakeRedisCache.salvar.bind(fakeRedisCache));
    jest.spyOn(RedisCache, "recuperar").mockImplementation(fakeRedisCache.recuperar.bind(fakeRedisCache));
    jest.spyOn(RedisCache, "invalidar").mockImplementation(fakeRedisCache.invalidar.bind(fakeRedisCache));
  });

  it("Deve ser capaz de listar os versoes", async () => {
    // Criando versoes para a lista
    await fakeParametroRepository.criar({
      nm_parametro: "Parametro 1",
      vl_parametro1: "Descrição 1",
    });

    await fakeParametroRepository.criar({
      nm_parametro: "Parametro 2",
      vl_parametro1: "Descrição 2",
    });

    // Listando os versoes pela primeira vez (não estarão no cache)
    const versoes = await listarParametroService.execute({
      nm_parametro: "Parametro",
    });

    // Verificando se os versoes foram retornados corretamente
    expect(versoes).toHaveLength(2);
    expect(versoes[0].nm_parametro).toBe("Parametro 1");
    expect(versoes[1].nm_parametro).toBe("Parametro 2");

    // Verificando se os versoes foram salvos no cache
    const cachedParametros = await fakeRedisCache.recuperar("parametro" + JSON.stringify({ nm_parametro: "Parametro" }));
    expect(cachedParametros).toHaveLength(2);
  });

  it("Não deve ser capaz de listar versoes quando não houver resultados", async () => {
    // Tentando listar versoes com nome que não existe
    const versoes = await listarParametroService.execute({
      nm_parametro: "NomeInexistente",
    });

    // Esperando que o resultado seja um array vazio
    expect(versoes).toHaveLength(0);

    // Verificando se o cache também não tem nada salvo
    const cachedParametros = await fakeRedisCache.recuperar("parametro" + JSON.stringify({ nm_parametro: "NomeInexistente" }));
    expect(cachedParametros).toBeNull();
  });
});
