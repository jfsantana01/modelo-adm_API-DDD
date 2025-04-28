import { FakeAcessoRepository } from "../repositories/fakes/FakeAcessoRepository";
import { ListarAcessoPorPaginacaoService } from "../../../../src/modules/acesso/services/ListarAcessoPorPaginacaoService";
import { IAcessoPaginacao } from "../../../../src/modules/acesso/domain/models/IAcessoPaginacao";

describe("ListarAcessoPorPaginacaoService", () => {
  let fakeAcessoRepository: FakeAcessoRepository;
  let listarAcessoPorPaginacaoService: ListarAcessoPorPaginacaoService;
  beforeEach(() => {
    fakeAcessoRepository = new FakeAcessoRepository();
    listarAcessoPorPaginacaoService = new ListarAcessoPorPaginacaoService(fakeAcessoRepository);
  });

  it("Deve ser capaz de listar acessos paginados", async () => {
    // Criando 15 acessos para testar a paginação
    for (let i = 1; i <= 15; i++) {
      await fakeAcessoRepository.criar({
        nm_acesso: `Acesso ${i}`,
        ds_acesso: `Descrição ${i}`,
        in_ativo: i % 2 === 0, // Ativos e inativos alternados
      });
    }

    // Solicitando a página 2 com limite de 5 acessos por página
    const pagina = 2;
    const limite = 5;
    const result: IAcessoPaginacao = await listarAcessoPorPaginacaoService.execute({
      nm_acesso: "Acesso",
      page: pagina,
      limit: limite,
    });

    // Verificando a estrutura da resposta e o conteúdo
    expect(result).toHaveProperty("current_page", pagina);
    expect(result).toHaveProperty("per_page", limite);
    expect(result).toHaveProperty("total", 15); // Total de acessos criados
    expect(result).toHaveProperty("data");
    expect(result.data).toHaveLength(limite); // A página 2 deve ter 5 registros

    // Verificando os dados da página 2
    expect(result.data[0].nm_acesso).toBe("Acesso 6");
    expect(result.data[4].nm_acesso).toBe("Acesso 10");
  });

  it("Deve retornar uma página vazia quando não houver acessos para a página solicitada", async () => {
    // Criando 5 acessos para testar
    for (let i = 1; i <= 5; i++) {
      await fakeAcessoRepository.criar({
        nm_acesso: `Acesso ${i}`,
        ds_acesso: `Descrição ${i}`,
        in_ativo: true,
      });
    }

    // Solicitando a página 3 com limite de 5 acessos por página (não há dados para esta página)
    const pagina = 3;
    const limite = 5;
    const result: IAcessoPaginacao = await listarAcessoPorPaginacaoService.execute({
      nm_acesso: "Acesso",
      page: pagina,
      limit: limite,
    });

    // Verificando que a página não tem dados
    expect(result.data).toHaveLength(0); // Nenhum acesso na página 3
    expect(result.current_page).toBe(pagina);
  });

  it("Deve retornar a primeira página corretamente quando não houver filtros de busca", async () => {
    // Criando 8 acessos para testar
    for (let i = 1; i <= 8; i++) {
      await fakeAcessoRepository.criar({
        nm_acesso: `Acesso ${i}`,
        ds_acesso: `Descrição ${i}`,
        in_ativo: true,
      });
    }

    // Solicitando a primeira página com limite de 5 acessos por página
    const pagina = 1;
    const limite = 5;
    const result: IAcessoPaginacao = await listarAcessoPorPaginacaoService.execute({
      nm_acesso: "",
      page: pagina,
      limit: limite,
    });

    // Verificando que a página 1 tem 5 acessos
    expect(result.data).toHaveLength(limite);
    expect(result.data[0].nm_acesso).toBe("Acesso 1");
    expect(result.data[4].nm_acesso).toBe("Acesso 5");
  });
});
