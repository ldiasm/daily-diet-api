<p align="center">
  <img src=".github/logo.png" alt="Logo" width="300"/>
  <br>
</p>
<h3 align="center">
Você no controle da sua dieta!
</h3>

<p align="center">
  <img src="https://img.shields.io/static/v1?label=Daily&message=Diet&color=blueviolet&style=for-the-badge"/>
  <img src="https://img.shields.io/github/license/MrRioja/daily-diet-api?color=blueviolet&logo=License&style=for-the-badge"/>
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/MrRioja/daily-diet-api?color=blueviolet&logo=TypeScript&logoColor=white&style=for-the-badge">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/MrRioja/daily-diet-api?color=blueviolet&style=for-the-badge">
</p>

<p align="center">
  <a href="#sobre">Sobre</a> •
  <a href="#daily-diet-api">Daily Diet API</a> •
  <a href="#instalação">Instalação</a> •
  <a href="#tecnologias">Tecnologias</a> •
  <a href="#autor">Autor</a>
</p>

## Sobre

Projeto desenvolvido durante o desafio do módulo II do bootcamp Ignite da Rocketseat cujo objetivo foi colocar em prática todo o conteúdo estudado durante o módulo.

## Daily Diet API

API para o aplicativo Daily Diet, um sistema de acompanhamento de dieta diária.

## Funcionalidades

### Autenticação
- Criação de conta com email e senha
- Login com email e senha
- Autenticação via cookies
- Atualização de perfil
- Exclusão de conta

### Perfil do Usuário
- Nome e sobrenome
- Email
- Foto de perfil
- Peso
- Altura
- Meta de peso

### Refeições
- Criação de refeições
- Atualização de refeições
- Exclusão de refeições
- Listagem de refeições
- Detalhes de uma refeição
- Registro de calorias

### Métricas
- Total de refeições
- Refeições dentro/fora da dieta
  - Melhor sequência de refeições dentro da dieta
- Métricas diárias (refeições e calorias)

## Rotas

### Usuários
- `POST /users` - Criar conta
- `POST /users/login` - Login
- `PUT /users` - Atualizar perfil
- `GET /users` - Buscar dados do usuário
- `DELETE /users` - Excluir conta

### Refeições
- `POST /meals` - Criar refeição
- `PUT /meals/:id` - Atualizar refeição
- `DELETE /meals/:id` - Excluir refeição
- `GET /meals` - Listar refeições
- `GET /meals/:id` - Buscar refeição
- `GET /meals/metrics` - Buscar métricas gerais
- `GET /meals/metrics/daily` - Buscar métricas diárias

## Instalação

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
Além disso é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).

### 🎲 Rodando o Back End (servidor)

```bash
# Clone este repositório
$ git clone git@github.com:MrRioja/daily-diet-api.git

# Acesse a pasta do projeto no terminal/cmd
$ cd daily-diet-api

# Instale as dependências
$ npm install
# Caso prefira usar o Yarn execute o comando abaixo
$ yarn

# Execute a aplicação em modo de desenvolvimento
$ npm run dev
# Caso prefira usar o Yarn execute o comando abaixo
$ yarn dev

# O servidor iniciará na porta 3333 ou na porta definida no arquivo .env na variável PORT - acesse <http://localhost:3333>
```

## Tecnologias

[![My Skills](https://skillicons.dev/icons?i=nodejs,express,js,jest,postgres,ts&perline=10&theme=dark)](https://skillicons.dev)

## Autor

<div align="center">
<img src="https://images.weserv.nl/?url=avatars.githubusercontent.com/u/55336456?v=4&h=100&w=100&fit=cover&mask=circle&maxage=7d" />
<h1>Luiz Rioja</h1>
<strong>Backend Developer</strong>
<br/>
<br/>

<a href="https://linkedin.com/in/luizrioja" target="_blank">
<img alt="LinkedIn" src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white"/>
</a>

<a href="https://github.com/mrrioja" target="_blank">
<img alt="GitHub" src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"/>
</a>

<a href="mailto:lulyrioja@gmail.com?subject=Fala%20Dev" target="_blank">
<img alt="Gmail" src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" />
</a>

<a href="https://api.whatsapp.com/send?phone=5511933572652" target="_blank">
<img alt="WhatsApp" src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white"/>
</a>

<a href="https://join.skype.com/invite/tvBbOq03j5Uu" target="_blank">
<img alt="Skype" src="https://img.shields.io/badge/SKYPE-%2300AFF0.svg?style=for-the-badge&logo=Skype&logoColor=white"/>
</a>

<br/>
<br/>
</div>
