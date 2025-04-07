# Daily Diet API - Guia de Configuração

## Sumário
1. [Requisitos](#requisitos)
2. [Configuração do Ambiente](#configuração-do-ambiente)
   - [macOS](#macos)
   - [Windows](#windows)
   - [Linux](#linux)
3. [Banco de Dados](#banco-de-dados)
4. [Desenvolvimento](#desenvolvimento)
5. [Testando a API](#testando-a-api)
6. [Solução de Problemas](#solução-de-problemas)

## Requisitos

Antes de começar, você precisa ter instalado:

- Node.js (versão 16.x ou superior)
- Yarn (versão 1.22.x ou superior)
- Postman (para testar a API)

## Configuração do Ambiente

### macOS

1. Instale as dependências:
```bash
yarn
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

### Windows

1. Instale as dependências:
```batch
yarn
```

2. Configure as variáveis de ambiente:
```batch
copy .env.example .env
```

### Linux

1. Instale as dependências:
```bash
yarn
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

## Banco de Dados

1. Execute as migrações:
```bash
yarn knex migrate:latest
```

2. Para reverter as migrações:
```bash
yarn knex migrate:rollback
```

## Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
yarn dev
```

A API estará disponível em http://localhost:3333

## Testando a API

1. Abra o Postman
2. Importe o arquivo `daily-diet-collection.json`
3. Configure o ambiente "Dev" com a variável `baseURL=http://localhost:3333`
4. Teste os endpoints disponíveis:
   - POST /users/ - Criar usuário
   - GET /users/ - Listar usuários
   - GET /users/metrics - Métricas do usuário
   - POST /meals/ - Criar refeição
   - GET /meals/ - Listar refeições
   - GET /meals/:id - Ver refeição
   - PUT /meals/:id - Editar refeição
   - DELETE /meals/:id - Deletar refeição

## Solução de Problemas

### Erros Comuns

1. **Porta 3333 em uso**
   - Verifique se não há outro processo usando a porta
   - Altere a porta no arquivo .env

2. **Erro no banco de dados**
   - Verifique se o diretório `db` existe
   - Execute `yarn knex migrate:latest` novamente

3. **Erro ao iniciar o servidor**
   - Verifique se todas as dependências foram instaladas
   - Tente reinstalar com `yarn`

4. **Erro ao importar coleção no Postman**
   - Verifique se o arquivo da coleção existe
   - Tente criar as requisições manualmente

### Logs e Debug

Para ver logs mais detalhados:

macOS/Linux:
```bash
DEBUG=* yarn dev
```

Windows:
```batch
set DEBUG=* && yarn dev
```
