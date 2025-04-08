# Daily Diet API

API RESTful para o aplicativo Daily Diet, um sistema de acompanhamento de dieta diária que permite aos usuários registrar suas refeições e acompanhar seu desempenho alimentar.

<p align="center">
  <img src="https://img.shields.io/static/v1?label=Daily&message=Diet&color=blueviolet&style=for-the-badge"/>
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/ldiasm/daily-diet-api?color=blueviolet&logo=TypeScript&logoColor=white&style=for-the-badge">
  <img alt="License" src="https://img.shields.io/github/license/ldiasm/daily-diet-api?color=blueviolet&logo=License&style=for-the-badge"/>
</p>

<p align="center">
  <a href="#sobre">Sobre</a> •
  <a href="#funcionalidades">Funcionalidades</a> •
  <a href="#tecnologias">Tecnologias</a> •
  <a href="#rotas">Rotas</a> •
  <a href="#instalação">Instalação</a> •
  <a href="#testes">Testes</a> •
  <a href="#desenvolvimento">Desenvolvimento</a> •
  <a href="#licença">Licença</a>
</p>

## Sobre

O Daily Diet API é um backend completo desenvolvido com Node.js, Fastify e TypeScript que fornece uma API RESTful para gerenciar refeições e acompanhar dietas. Este projeto implementa práticas modernas de desenvolvimento como autenticação com cookies, criptografia de senha, validação de dados com Zod e banco de dados com SQLite e Knex.

## Funcionalidades

### 👤 Usuários
- ✅ Criação de conta com nome, email e senha (senha criptografada)
- ✅ Login com email e senha
- ✅ Autenticação via cookies HTTP-only
- ✅ Refresh token para sessões
- ✅ Proteção de rotas com middleware de autenticação

### 🍽️ Refeições
- ✅ Criar, listar, visualizar, editar e excluir refeições
- ✅ Registrar nome, descrição, data e hora da refeição
- ✅ Marcar refeição como dentro ou fora da dieta
- ✅ Associar refeições ao usuário autenticado

### 📊 Métricas
- ✅ Total de refeições registradas
- ✅ Total de refeições dentro da dieta
- ✅ Total de refeições fora da dieta
- ✅ Melhor sequência de refeições dentro da dieta

## Tecnologias

- **[Node.js](https://nodejs.org/)** - Ambiente de execução JavaScript
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[Fastify](https://www.fastify.io/)** - Framework web rápido e de baixo overhead
- **[Knex](http://knexjs.org/)** - Query builder SQL flexível
- **[SQLite](https://www.sqlite.org/)** - Banco de dados SQL leve
- **[Zod](https://github.com/colinhacks/zod)** - Validação de esquemas TypeScript-first
- **[Bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Biblioteca para hashing de senhas
- **[@fastify/cookie](https://github.com/fastify/fastify-cookie)** - Plugin Fastify para gerenciamento de cookies

## Rotas

### Autenticação e Usuários

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| POST | `/users` | Criar novo usuário | Não |
| POST | `/sessions` | Login (criar sessão) | Não |
| GET | `/users` | Buscar perfil do usuário | Sim |
| PUT | `/users` | Atualizar perfil | Sim |

### Refeições

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| POST | `/meals` | Criar refeição | Sim |
| GET | `/meals` | Listar refeições | Sim |
| GET | `/meals/:id` | Buscar refeição específica | Sim |
| PUT | `/meals/:id` | Atualizar refeição | Sim |
| DELETE | `/meals/:id` | Excluir refeição | Sim |

### Métricas

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| GET | `/meals/metrics` | Buscar métricas do usuário | Sim |

## Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

### Passos para instalação

1. Clone o repositório:
```bash
git clone https://github.com/ldiasm/daily-diet-api.git
cd daily-diet-api
```

2. Instale as dependências:
```bash
yarn
# ou
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Execute as migrações do banco de dados:
```bash
yarn knex migrate:latest
# ou
npm run knex migrate:latest
```

5. Inicie o servidor:
```bash
yarn dev
# ou
npm run dev
```

O servidor estará disponível em: http://localhost:3333

## Testando a API

Para testar a API, você pode usar o Postman, Insomnia ou qualquer outro cliente HTTP:

1. Importe a coleção `daily-diet-collection.json` para o Postman/Insomnia
2. Configure a variável de ambiente `baseURL=http://localhost:3333`
3. Siga o fluxo das requisições:
   - Crie um usuário
   - Faça login para obter o cookie de sessão
   - Acesse os endpoints de refeições

### Exemplo de requisição para criar usuário:

```http
POST http://localhost:3333/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "senha123"
}
```

### Exemplo de login:

```http
POST http://localhost:3333/sessions
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "senha123"
}
```

## Testes

Para adicionar testes ao projeto, você pode seguir estas etapas:

1. Instale as dependências de teste:
```bash
yarn add -D jest @types/jest ts-jest supertest @types/supertest
```

2. Configure o Jest no package.json:
```json
"scripts": {
  "test": "jest",
  "test:coverage": "jest --coverage"
}
```

3. Os exemplos de testes podem ser encontrados na pasta de exemplos:
```
docs/testing/api-tests/examples/
```

## Desenvolvimento

### Scripts disponíveis

- `yarn dev` - Inicia o servidor de desenvolvimento
- `yarn build` - Compila o projeto para produção
- `yarn lint` - Executa o linter
- `yarn knex` - Executa comandos do Knex.js

### Estrutura do projeto

```
src/
  ├── @types/            # Definições de tipos TypeScript
  ├── database/          # Migrações e seeds do banco de dados
  ├── env/               # Configuração de variáveis de ambiente
  ├── middlewares/       # Middlewares do Fastify
  ├── routes/            # Definições de rotas da API
  ├── app.ts             # Configuração da aplicação Fastify
  ├── database.ts        # Configuração do banco de dados
  └── server.ts          # Ponto de entrada da aplicação
```

## Solução de Problemas

### Porta 3333 em uso

Altere a porta no arquivo `.env`:
```
PORT=3334
```

### Erro nas migrações

Verifique se o diretório `db` existe e tem permissões adequadas:
```bash
mkdir -p db
yarn knex migrate:latest
```

### Cookies não funcionando

Verifique se está testando com um cliente que suporta cookies (como Postman) e se a opção de armazenar cookies está habilitada.

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
