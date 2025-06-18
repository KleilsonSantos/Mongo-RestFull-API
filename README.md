 <h1 align="center">🚀 API REST Profissional | Node.js + TypeScript + MongoDB 🍃</h3>

<div align="center">
<p align="center">

  <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnNnd3RnN3FpZDNseG4xcjh0OGJ6bXV6eDJmNWhwZXZmZXRsMXpkcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GZgWC4ViLxPYJhWy1B/giphy.gif" alt="API REST com MongoDB" width="600"/>
  <br>
  <strong>API REST com TypeScript e MongoDB</strong><br>
  <p align="center">
  <em>Autenticação JWT • Documentação Swagger • Docker • CI/CD • Logs Estruturados</em>
</p>

<p ><h3 align="center">🚀 _(Em Desenvolvimento 🚧)_</h3></p>
</p>
</div>

## 🛠️ Tecnologias Utilizadas

<div align="center">
  
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Winston](https://img.shields.io/badge/Winston-000000?style=for-the-badge&logo=winston&logoColor=white)
![Morgan](https://img.shields.io/badge/Morgan-000000?style=for-the-badge&logo=morgan&logoColor=white)
![API REST](https://img.shields.io/badge/API-REST-FF6B6B?style=for-the-badge)
  ![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow?style=for-the-badge)
</div>


## 📌 Descrição

Esta é uma **API RESTful** robusta, construída com **TypeScript**, **Express** e **MongoDB**, projetada para gerenciar filmes e usuários. Ela oferece funcionalidades completas de **CRUD (Criar, Ler, Atualizar, Deletar)** para ambas as entidades, além de um sistema de **autenticação e autorização robusto** utilizando **JWT (JSON Web Tokens)** para proteger as rotas da API.


## 🗂️ Estrutura do Projeto

```plaintext
meu-projeto
├── src
│   ├── config
│   │   ├── db.ts
│   │   ├── logger.ts
│   │   └── swagger.ts
│   ├── controllers
│   │   ├── user-controller.ts
│   │   └── movie-controller.ts
│   ├── enum
│   │   └── UserRole.enum.ts
│   ├── middlewares
│   │   ├── authMiddleware.ts
│   │   ├── morgan.middleware.ts
│   │   ├── swaggerAuth.ts
│   ├──  models
│   │   ├── morgan.middleware.ts
│   │   └── swaggerAuth.ts
│   ├── models
│   │   ├── User.ts
│   │   ├── Movie.ts
│   │   └── Payload.interface.ts
│   ├── routes
│   │   ├── router.ts
│   │   ├── user-router.ts
│   │   └── movie-router.ts # Adicionado para consistência
│   ├── utils
│   │   └── generate-token.ts
│   └── server.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Visão Geral das Funcionalidades e Ferramentas

### 🔒 Autenticação e Autorização

- **Autenticação JWT**: Usuários podem autenticar e obter um token JWT para acessar recursos protegidos.
- **Autorização Baseada em Papéis**: Diferentes níveis de acesso para usuários (e.g., administradores vs. usuários comuns) podem ser implementados e controlados através de papéis (se aplicável).

### 👥 Gerenciamento de Dados

- **Usuários**: Operações CRUD completas para gerenciamento de usuários.
- **Filmes**: Operações CRUD completas para gerenciamento de filmes.

### 📝 Documentação

- **Documentação Swagger**: Documentação interativa e detalhada da API, facilitando o entendimento e teste dos endpoints.

### 📈 Monitoramento e Logs

- **Métricas Prometheus**: Monitoramento de requisições HTTP e uso de memória para análise de performance e saúde da aplicação.
- **Logger Avançado (Winston e Morgan)**: Geração de logs detalhados para depuração, auditoria e monitoramento em diferentes níveis (info, warn, error, debug, http).

### 🛠️ Desenvolvimento e Deploy

- **Docker**: Containerização da aplicação para ambientes de desenvolvimento e produção consistentes.
- **Docker Compose**: Configuração simplificada de múltiplos serviços Docker para orquestração de ambiente.

### 💎 Qualidade de Código e CI/CD

- **TypeScript**: Utilização de tipagem estática para maior segurança e manutenibilidade do código.
- **MongoDB**: Banco de dados NoSQL flexível e escalável.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB, facilitando a interação com o banco de dados.
- **CI/CD (GitHub Actions)**: Fluxo de trabalho automatizado para integração contínua, garantindo que o código seja testado e validado a cada push.
- **SonarQube**: Análise de qualidade de código estática e medição de cobertura de testes para identificar e corrigir problemas.
- **Husky**: Ganchos de Git (pre-commit, pre-push) para impor padrões de código e executar testes antes de cada commit/push.


## 📄 Principais Arquivos

- `package.json`: Gerenciamento de dependências e scripts do projeto.
- `tsconfig.json`: Configurações do compilador TypeScript.
- `src/server.ts`: Ponto de entrada da aplicação e configuração do servidor Express.
- `src/routes/router.ts`: Agrega todas as rotas da API.
- `src/routes/user-router.ts`: Define as rotas relacionadas aos usuários.
- `src/routes/movie-router.ts`: Define as rotas relacionadas aos filmes.
- `src/controllers/user-controller.ts`: Lógica de negócio para operações de usuário.
- `src/controllers/movie-controller.ts`: Lógica de negócio para operações de filme.
- `src/models/User.ts`: Definição do esquema e modelo Mongoose para usuários.
- `src/models/Movie.ts`: Definição do esquema e modelo Mongoose para filmes.
- `src/models/Payload.interface.ts`: Interface para o payload do token JWT.
- `src/middlewares/authMiddleware.ts`: Middleware para autenticação JWT.
- `src/middlewares/morgan.middleware.ts`: Middleware para logging de requisições HTTP.
- `src/config/db.ts`: Configuração da conexão com o banco de dados.
- `src/config/logger.ts`: Configuração do logger Winston.
- `src/config/swagger.ts`: Configuração do Swagger para documentação da API.
- `src/utils/generate-token.ts`: Função utilitária para gerar tokens JWT.


## ⚙️ Configuração

### 1️⃣ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```env
PORT=3000
API_URL=/api/v1
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/nome-do-banco
DB_NAME=myFirstDataBase
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_URI=mongodb+srv://seu_usuario:sua_senha@cluster.mongodb.net/seu_banco?retryWrites=true&w=majority
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=1234
JWT_SECRET=sua-chave-secreta
JWT_EXPIRES_IN=1h
SWAGGER_API_KEY=sua-api-key
```

### O projeto possui os seguintes arquivos:

- `package.json`: Arquivo de configuração do projeto.
- `tsconfig.json`: Arquivo de configuração do TypeScript.
- `src/server.ts`: Arquivo de configuração do servidor Express.
- `src/routes.ts`: Arquivo de configuração das rotas da API.
- `src/controllers/user-controller.ts`: Arquivo de configuração dos controladores de usuários.
- `src/controllers/movie-controller.ts`: Arquivo de configuração dos controladores de filmes.
- `src/models/user-model.ts`: Arquivo de configuração do modelo de usuários.
- `src/model/User.schema.ts`: Arquivo de configuração do esquema de usuários.
- `src/model/User.interface.ts`: Arquivo de configuração da interface User.
- `src/model/Payload.interface.ts`: Arquivo de configuração da interface Payload.
- `src/routes/user-router.ts`: Arquivo de configuração das rotas de usuários.
- `src/middlewares/authMiddleware.ts`: Arquivo de configuração do middleware de autenticação.
- `src/middlewares/morgan.middleware.ts`: Arquivo de configuração do middleware de log.
- `src/config/db.ts`: Arquivo de configuração da conexão com o banco de dados.
- `src/config/logger.ts`: Arquivo de configuração do logger.
- `src/config/swagger.ts`: Arquivo de configuração do Swagger.
- `src/utils/generate-token.ts`: Arquivo de configuração da função generateToken.



## 🚀 Instalação

Para configurar e rodar o projeto localmente, siga os passos abaixo:

### 1\. Clonar o Repositório

```bash
git clone [https://github.com/KleilsonSantos/Mongo-RestFull-API.git](https://github.com/KleilsonSantos/Mongo-RestFull-API.git)
cd Mongo-RestFull-API
```

### 2\. Instalar Dependências

Certifique-se de ter o Node.js e o npm (ou Yarn) instalados em sua máquina.

```bash
npm install
# ou
yarn install
```

### 3\. Rodar o Servidor

Após a instalação das dependências e a configuração do arquivo `.env`:

- **Ambiente de Desenvolvimento:**
  Com `ts-node-dev` para recarregar automaticamente as alterações.
  ```bash
  npm run dev
  # ou
  yarn dev
  ```
- **Ambiente de Produção:**
  Primeiro compile o código TypeScript para JavaScript, depois inicie o servidor.
  ```bash
  npm run build
  npm start
  # ou
  yarn build
  yarn start
  ```


## 🐳 Docker e Docker Compose

Para facilitar a execução do banco de dados **MongoDB** em um ambiente isolado, utilizamos **Docker** e **Docker Compose**.

### Pré-requisitos

- Docker instalado ([Guia de instalação do Docker](https://docs.docker.com/get-docker/))
- Docker Compose instalado (geralmente incluso no Docker Desktop)

### Executando com Docker Compose

O arquivo `docker-compose.yml` (que deve ser criado, se ainda não existir) já pode estar configurado para subir um contêiner com o **MongoDB**. Para construir a imagem Docker e iniciar os serviços definidos, execute:

```bash
docker-compose up --build -d
```

- `--build`: Reconstrói as imagens dos serviços.
- `-d`: Executa os contêineres em segundo plano (detached mode).


## 🪵 Sistema de Logs

A API utiliza as bibliotecas **Winston** e **Morgan** para um sistema de logs completo e configurável, que inclui:

- **Níveis de Log**: Geração de logs detalhados em diferentes níveis (info, warn, error, debug, http).
- **Armazenamento de Arquivos**: Logs persistidos em arquivos separados por nível de severidade na pasta `logs/`.
- **Saída no Console**: Logs coloridos no console durante o desenvolvimento para melhor depuração.
- **Tratamento de Exceções**: Captura e registro de exceções não tratadas (`exceptions.log`) e rejeições de promessas (`rejections.log`).

**Estrutura dos Logs:**

```plaintext
📂 logs/
├── all.log       # Contém todos os logs.
├── error.log     # Exclusivo para logs de erro críticos.
├── warn.log      # Logs de avisos importantes.
├── info.log      # Informações gerais.
├── debug.log     # Logs detalhados para depuração.
├── http.log      # Registra todas as requisições HTTP.
├── exceptions.log # Logs de exceções não tratadas.
├── rejections.log # Logs de rejeições de Promises.
```

**Como Utilizar:**

Basta importar o logger e chamar os métodos conforme necessário.

```javascript
import Logger from './path/to/logger';

// Example usage
Logger.info('Application started successfully');
Logger.error('Database connection failed');
Logger.debug('Fetching data from API');
```

1. Instale o **Winston**:
2. Crie um arquivo `logger.ts` na pasta `src/config` com o seguinte conteúdo:
3. Importe o logger em qualquer arquivo onde deseja utilizar:
4. Utilize o logger para registrar logs:
5. O logger padrão para o projeto ser utilizado na pasta `src/config/logger.ts`

## ⚙️ Configuração Automática:

    O logger cria automaticamente a pasta logs/ caso ela não exista.
    No modo de desenvolvimento, os logs são exibidos no console com cores para facilitar a leitura.
    Em produção, os logs são escritos apenas nos arquivos, garantindo performance e persistência.

## 🚀 Como Utilizar:

Para usar o Logger dentro do projeto, basta importá-lo e chamar os métodos conforme necessário.
import { Logger } from "./config/logger";

```plaintext
Logger.info("🚀 Servidor iniciado com sucesso!");
Logger.warn("⚠️ Isso é um aviso importante!");
Logger.error("❌ Ocorreu um erro crítico no sistema!");
Logger.debug("🔧 Debugging detalhado para fins de desenvolvimento!");
Logger.http("📡 Requisição HTTP recebida com sucesso!");
Logger.exceptions("❗️ Exceção nao tratada!");
Logger.rejections("⚠️ Rejeicao de promisse nao tratada!");
```

O logger cria automaticamente a pasta `logs/` caso ela não exista.


## 📝 Documentação Swagger

A integração do Swagger no projeto oferece uma documentação de API abrangente e interativa, utilizando **Swagger UI** e **swagger-jsdoc**. Isso garante que sua API seja facilmente compreendida e acessível a desenvolvedores e partes interessadas, ao mesmo tempo em que adiciona controle de acesso seguro à documentação.

**Funcionalidades:**

- **Especificação OpenAPI 3.0**: Define sua API usando os padrões OpenAPI mais recentes.
- **Informações da API**: Inclui metadados como Título, Versão e Descrição.
- **Origem da Documentação**: Escaneia e inclui rotas e controladores relevantes (`./src/routes/*.ts`, `./src/controllers/*.ts`) automaticamente na documentação.
- **Autenticação por Middleware**: Restringe o acesso ao Swagger UI usando um middleware de autenticação (`swaggerAuthMiddleware`).
- **Hospedagem da UI**: Serve a documentação interativa no endpoint `/api/v1/api-docs`.

**Acesse a documentação interativa da API via Swagger:**

- **URL:** `http://localhost:3000/api/v1/api-docs` (A porta pode variar dependendo da sua configuração).
- Teste e visualize os endpoints diretamente pela interface do usuário.
- A documentação é protegida por uma **API Key** que deve ser configurada na variável de ambiente `SWAGGER_API_KEY`.


## 📊 Métricas Prometheus

A API coleta métricas de desempenho para monitoramento via Prometheus, facilitando a análise e identificação de gargalos. As métricas estão disponíveis em:

- **URL:** `http://localhost:3000/metrics`

As métricas incluem:

- **Requisições HTTP**: Total de requisições, duração e erros.
- **Uso de Memória**: Consumo de memória da aplicação.

## 📚 Endpoints da API

### Autenticação

| Método | Rota                 | Descrição                 |
| ------ | -------------------- | ------------------------- |
| POST   | `/api/v1/auth/login` | Realizar login de usuário |

### Usuários

| Método | Rota                | Descrição                      |
| ------ | ------------------- | ------------------------------ |
| POST   | `/api/v1/users`     | Criar um novo usuário          |
| GET    | `/api/v1/users`     | Listar todos os usuários       |
| GET    | `/api/v1/users/:id` | Buscar um usuário por ID       |
| PUT    | `/api/v1/users/:id` | Atualizar um usuário existente |
| DELETE | `/api/v1/users/:id` | Remover um usuário             |

### Filmes

| Método | Rota                 | Descrição                    |
| ------ | -------------------- | ---------------------------- |
| POST   | `/api/v1/movies`     | Criar um novo filme          |
| GET    | `/api/v1/movies`     | Listar todos os filmes       |
| GET    | `/api/v1/movies/:id` | Buscar um filme por ID       |
| PUT    | `/api/v1/movies/:id` | Atualizar um filme existente |
| DELETE | `/api/v1/movies/:id` | Remover um filme             |


## 📦 Dependências e Ferramentas

O projeto utiliza as seguintes bibliotecas e ferramentas:

### Dependências Principais

- **config**: Gerenciamento de configurações.
- **dotenv**: Carregamento de variáveis de ambiente.
- **express**: Framework web para Node.js.
- **express-validator**: Middleware para validação de requisições.
- **mongoose**: ODM (Object Data Modeling) para MongoDB.
- **morgan**: Middleware para logs de requisições HTTP.
- **winston**: Biblioteca robusta para logging.
- **jsonwebtoken**: Para autenticação baseada em tokens (JWT).
- **swagger-ui-express**: Integração do Swagger UI com Express.
- **swagger-jsdoc**: Geração de documentação Swagger a partir de comentários JSDoc.

### Dependências de Desenvolvimento

- **@types/** (config, express, mongoose, morgan, node): Tipagens para TypeScript.
- **ts-node-dev**: Reinicialização automática do servidor em TypeScript.
- **typescript**: Compilador TypeScript.

### Ferramentas Adicionais

- **Node.js**: Plataforma de execução.
- **MongoDB**: Banco de dados NoSQL.
- **Docker**: Containerização de aplicações.
- **Docker Compose**: Orquestração de ambientes Docker.
- **Prometheus**: Monitoramento de métricas.
- **SonarQube**: Análise de qualidade de código estática e cobertura de testes.
- **Husky**: Ganchos de Git para automação de tarefas (`pre-commit`, `pre-push`).
- **GitHub Actions**: Plataforma de CI/CD para automação de workflows.


## 🔄 CI/CD com GitHub Actions

Este projeto integra um pipeline de **Integração Contínua (CI)** e **Entrega Contínua (CD)** utilizando **GitHub Actions**. O objetivo é profissionalizar o processo de desenvolvimento, garantindo qualidade e automação:

### Arquitetura do Workflow

O projeto utiliza dois arquivos principais no GitHub Actions para modularidade:

- `.github/workflows/ci-core.yml`: Responsável por lint, Prettier, Testes (Jest + Supertest) e SonarQube.
- `.github/workflows/deploy.yml`: Gerencia o deploy automatizado, acionado após um CI bem-sucedido via `workflow_run`.

### Boas Práticas Aplicadas

- **CI Modular**: Utiliza `needs` e `workflow_run` para pipelines reutilizáveis e separação de responsabilidades.
- **Testes Automatizados**: Implementa testes com Jest e Supertest, com cobertura reportada no formato `lcov` para SonarQube.
- **Análise Estática**: Garante consistência e qualidade de código com ESLint e Prettier.
- **Qualidade de Código**: Integração com SonarQube para detectar code smells, duplicações e complexidade.
- **Contêineres Consistentes**: Uso de Docker para ambientes de teste e produção consistentes.
- **Git Hooks**: Husky impede commits e pushes que violem padrões de qualidade ou testes.
- **Logging Profissional**: Padrão de logs com Morgan e Winston para debug e produção.

### Impacto Profissional

A adoção dessas práticas reflete:

- **Maturidade Técnica**: Demonstra organização e automação no ciclo de vida do projeto.
- **Qualidade de Código**: Compromisso com altos padrões de qualidade e manutenção.
- **Visão DevOps**: Aplicação de princípios de DevOps através de automação e contêineres.
- **Confiabilidade**: Garante a estabilidade da aplicação através de testes contínuos.
- **Colaboração**: Facilita a contribuição e o onboarding de novos desenvolvedores.

## 🏆 Impacto no GitHub

- Aumenta a credibilidade do repositório.
- Transforma o projeto pessoal em um **portfólio técnico real**.
- Atrai recrutadores, contribuidores e parceiros.
- Facilita o onboarding e a manutenção contínua.


## 📌 Próximos Passos (Sugestões)

- [ ] Adicionar badges de build, cobertura e SonarQube no `README.md`.
- [ ] Automatizar deploy real (e.g., Vercel, Render, Heroku ou Docker Compose + VPS).
- [ ] Criar teste end-to-end básico com `supertest` ou `Playwright`.

## Licença

Este projeto está licenciado sob a licença [MIT](https://www.google.com/search?q=https://github.com/KleilsonSantos/Mongo-RestFull-API/blob/main/LICENSE).

### 📬 Contato

---

- 📧 Email: kleilson@icloud.com
- 🔗 LinkedIn: [linkedin.com/in/kleilson-dev-full-stack](https://linkedin.com/in/kleilson-dev-full-stack)
- 💻 GitHub: [Kleilson Santos](https://github.com/KleilsonSantos)

<p align="center">
  <b>⭐️ Se este projeto te ajudou, deixe uma estrela!</b><br><br>
  <img src="https://media.giphy.com/media/26ufnwz3wDUli7GU0/giphy.gif" width="120"/>
</p>

<p align="center"><b>⚡ Construa com segurança, teste com propósito, automatize com clareza.<br>by Kleilson Santos 🚀</b></p>
