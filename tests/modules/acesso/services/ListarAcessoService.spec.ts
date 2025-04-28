import FakeRedisCache from "../../../shared/cache/fakes/FakeRedisCache";
import { FakeAcessoRepository } from "../repositories/fakes/FakeAcessoRepository";
import { ListarAcessoService } from "../../../../src/modules/acesso/services/ListarAcessoService";
import RedisCache from "../../../../src/shared/cache/RedisCache";

describe("ListarAcessoService", () => {
  let fakeAcessoRepository: FakeAcessoRepository;
  let listarAcessoService: ListarAcessoService;
  let fakeRedisCache: FakeRedisCache;

  beforeEach(() => {
    fakeAcessoRepository = new FakeAcessoRepository();
    listarAcessoService = new ListarAcessoService(fakeAcessoRepository);
    fakeRedisCache = new FakeRedisCache();

    // Mockando os métodos do RedisCache para usar o fake no lugar do Redis real
    jest.spyOn(RedisCache, "salvar").mockImplementation(fakeRedisCache.salvar.bind(fakeRedisCache));
    jest.spyOn(RedisCache, "recuperar").mockImplementation(fakeRedisCache.recuperar.bind(fakeRedisCache));
    jest.spyOn(RedisCache, "invalidar").mockImplementation(fakeRedisCache.invalidar.bind(fakeRedisCache));
  });

  it("Deve ser capaz de listar os acessos", async () => {
    // Criando acessos para a lista
    await fakeAcessoRepository.criar({
      nm_acesso: "Acesso 1",
      ds_acesso: "Descrição 1",
      in_ativo: true,
    });

    await fakeAcessoRepository.criar({
      nm_acesso: "Acesso 2",
      ds_acesso: "Descrição 2",
      in_ativo: false,
    });

    // Listando os acessos pela primeira vez (não estarão no cache)
    const acessos = await listarAcessoService.execute({
      nm_acesso: "Acesso",
    });

    // Verificando se os acessos foram retornados corretamente
    expect(acessos).toHaveLength(2);
    expect(acessos[0].nm_acesso).toBe("Acesso 1");
    expect(acessos[1].nm_acesso).toBe("Acesso 2");

    // Verificando se os acessos foram salvos no cache
    const cachedAcessos = await fakeRedisCache.recuperar("acesso" + JSON.stringify({ nm_acesso: "Acesso" }));
    expect(cachedAcessos).toHaveLength(2);
  });

  it("Não deve ser capaz de listar acessos quando não houver resultados", async () => {
    // Tentando listar acessos com nome que não existe
    const acessos = await listarAcessoService.execute({
      nm_acesso: "NomeInexistente",
    });

    // Esperando que o resultado seja um array vazio
    expect(acessos).toHaveLength(0);

    // Verificando se o cache também não tem nada salvo
    const cachedAcessos = await fakeRedisCache.recuperar("acesso" + JSON.stringify({ nm_acesso: "NomeInexistente" }));
    expect(cachedAcessos).toBeNull();
  });
});
