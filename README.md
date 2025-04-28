# 🛠️ Modelo de API Administrativa com TypeORM, SOLID.

Este modelo define uma estrutura de pastas, métodos, retornos e outros componentes, com o objetivo de padronizar APIs e facilitar o entendimento de toda a equipe. Alguns estão em portugès para facilitar o entendimento. Futuramente refatorar para inglês.

## 📄 Pré-requisitos

### Node.js

É necessário ter o **Node.js 18** ou superior instalado. Você pode baixá-lo [aqui](https://nodejs.org/en/download/current).

### PostgreSQL

Você precisará configurar um banco de dados e um schema de administração. A API está pré-configurada para usar **PostgreSQL**, que pode ser baixado [aqui](https://www.postgresql.org/download/).

### Ferramentas para Consumo de API

Você precisará de uma aplicação para consumir os Endpoints da API, como Postman, Bruno ou Insomnia. O [Postman](https://www.postman.com/downloads/) pode ser baixado no link.

> **Nota**: Em versões futuras, planejo implantar Docker.

## 📋 UML - Estrutura das Tabelas

Abaixo está um exemplo da estrutura das entidades e da tabela :

![Diagrama UML](/documents/uml/bancoDeDados.drawio.svg)

Os arquivos UML estão disponíveis [aqui](https://github.com/jfsantana01/modelo-adm_API/tree/master/documents/uml) e podem ser editados usando o plugin **Draw.io Integration**.

## 🔧 Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento:

1. Crie o banco de dados necessários para que o ORM crie as tabelas.
2. Baixe a versão mais recente do projeto clicando **[aqui](https://github.com/jfsantana01/modelo-adm_API/archive/refs/heads/master.zip)**.
3. Extraia o conteúdo do arquivo `master.zip`.
4. Abra o projeto com o editor de código de sua escolha.
5. Renomeie o arquivo **.env_example** para **.env**. Neste arquivo, você deve configurar as variáveis de ambiente, como as credenciais do banco de dados.
6. Substitua os valores das variáveis de ambiente conforme o seu ambiente de banco de dados.
7. No terminal, execute `npm i` para instalar as dependências do projeto.

## 🚀 Começando

Após configurar o ambiente, siga os comandos abaixo para iniciar a aplicação:

- Execute `npm run migration:run` para rodar a migração **1727638232666-start**, que irá criar o schema **adm** e as [Tabelas](https://github.com/jfsantana01/modelo-adm_API/tree/master/documents/uml). Também irá inserir os usuários, perfis e acessos iniciais.

### `npm start`

- Inicia a API e reinicia automaticamente em caso de alterações (via **Nodemon**).

### `npm run start:sync`

- Inicia a API e sincroniza as tabelas do banco de dados com as entidades (**Entities**).

> **⚠️ Atenção!**
> O comando `npm run start:sync` executa o **TypeORM** com `synchronize=true`, o que sincroniza as tabelas do banco de dados com as **Entities** da API.
> Em bancos de dados legados, altere o arquivo `data-source.ts` para `synchronize=false` e utilize **Migrations** para evitar perda de dados.

## ⚙️ ESLint

### `npm run lint`

- Executa o linter configurado no projeto para analisar o código e verificar se ele está em conformidade com as regras de estilo e boas práticas definidas.

## 🔄 Migrations

### `npm run migration:generate`

- Gera automaticamente uma nova migration com base nas alterações detectadas nas entidades do projeto.

### `npm run migration:create **NomeMigracao**`

- Cria um arquivo de migration vazio, com um modelo básico, para que você possa escrever manualmente as alterações que deseja aplicar ao banco de dados, como a criação de tabelas, colunas ou índices.

### `npm run migration:run`

- O comando npm run migration:run executa todas as migrations pendentes no banco de dados, aplicando alterações como criação de tabelas, adição de colunas, ou modificações no esquema. Ele garante que o banco de dados esteja sincronizado com as últimas mudanças definidas nas migrations.

## 🧪 Executando Testes com Jest

- Execute o comando `npm run test` para realizar os testes de todos serviços.

## 🔩 Testando os Endpoints com Postman

Você pode testar os endpoints da API utilizando ferramentas como **Postman**, **Insomnia** ou **Bruno**.
A coleção de requests para o [Postman](https://www.postman.com/downloads/) está disponível para download **[aqui](/documents/collections/ADM_API.postman_collection.json)**.
