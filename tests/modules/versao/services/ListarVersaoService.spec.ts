import FakeRedisCache from "../../../shared/cache/fakes/FakeRedisCache";
import { FakeVersaoRepository } from "../repositories/fakes/FakeVersaoRepository";
import { ListarVersaoService } from "../../../../src/modules/versao/services/ListarVersaoService";
import RedisCache from "../../../../src/shared/cache/RedisCache";

describe("ListarVersaoService", () => {
  let fakeVersaoRepository: FakeVersaoRepository;
  let listarVersaoService: ListarVersaoService;
  let fakeRedisCache: FakeRedisCache;

  beforeEach(() => {
    fakeVersaoRepository = new FakeVersaoRepository();
    listarVersaoService = new ListarVersaoService(fakeVersaoRepository);
    fakeRedisCache = new FakeRedisCache();

    // Mockando os métodos do RedisCache para usar o fake no lugar do Redis real
    jest.spyOn(RedisCache, "salvar").mockImplementation(fakeRedisCache.salvar.bind(fakeRedisCache));
    jest.spyOn(RedisCache, "recuperar").mockImplementation(fakeRedisCache.recuperar.bind(fakeRedisCache));
    jest.spyOn(RedisCache, "invalidar").mockImplementation(fakeRedisCache.invalidar.bind(fakeRedisCache));
  });

  it("Deve ser capaz de listar os versoes", async () => {
    // Criando versoes para a lista
    await fakeVersaoRepository.criar({
      nm_versao: "Versao 1",
      ds_versao: "Descrição 1",
    });

    await fakeVersaoRepository.criar({
      nm_versao: "Versao 2",
      ds_versao: "Descrição 2",
    });

    // Listando os versoes pela primeira vez (não estarão no cache)
    const versoes = await listarVersaoService.execute({
      nm_versao: "Versao",
    });

    // Verificando se os versoes foram retornados corretamente
    expect(versoes).toHaveLength(2);
    expect(versoes[0].nm_versao).toBe("Versao 1");
    expect(versoes[1].nm_versao).toBe("Versao 2");

    // Verificando se os versoes foram salvos no cache
    const cachedVersaos = await fakeRedisCache.recuperar("versao" + JSON.stringify({ nm_versao: "Versao" }));
    expect(cachedVersaos).toHaveLength(2);
  });

  it("Não deve ser capaz de listar versoes quando não houver resultados", async () => {
    // Tentando listar versoes com nome que não existe
    const versoes = await listarVersaoService.execute({
      nm_versao: "NomeInexistente",
    });

    // Esperando que o resultado seja um array vazio
    expect(versoes).toHaveLength(0);

    // Verificando se o cache também não tem nada salvo
    const cachedVersaos = await fakeRedisCache.recuperar("versao" + JSON.stringify({ nm_versao: "NomeInexistente" }));
    expect(cachedVersaos).toBeNull();
  });
});
