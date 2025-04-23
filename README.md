# Mongo Rest API 🚀 _(Em Desenvolvimento 🚧)_

![Node.js](https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) 🍃
![Express](https://img.shields.io/badge/-Express-000000?style=for-the-badge&logo=express&logoColor=white) 🚂
![JWT](https://img.shields.io/badge/-JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white) 🔐
![Winston](https://img.shields.io/badge/-Winston-000000?style=for-the-badge&logo=winston&logoColor=white) 🐺
![Morgan](https://img.shields.io/badge/-Morgan-000000?style=for-the-badge&logo=morgan&logoColor=white) 📝
![Logger](https://img.shields.io/badge/-Logger-000000?style=for-the-badge&logo=logger&logoColor=white) 📜
![Swagger](https://img.shields.io/badge/-Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black) 📝
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) 🍃
![Mongoose](https://img.shields.io/badge/-Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white) 🐍
![Docker](https://img.shields.io/badge/-Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) 🐳
![Docker Compose](https://img.shields.io/badge/-Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white) 📦
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) 📘


## Estrutura do Projeto

```plaintext
meu-projeto
├──  src
│   ├──  config
│   │   ├── db.ts
│   │   ├── logger.ts
│   │   ├── swagger.ts
│   ├──  controllers
│   │   ├── user-controller.ts
│   │   ├── movie-controller.ts
│   ├──  enum
│   │   ├── UserRole.enum
│   ├──  middlewares
│   │   ├── authMiddleware.ts
│   │   ├── morgan-middleware.ts
│   │   ├── swaggerAuth.ts
│   ├──  models
│   │   ├── User.ts
│   │   ├── Movie.ts
│   │   ├── Payload.interface.ts
│   ├──  routes
│   │   ├── router.ts
│   │   ├── user-router.ts
│   ├──  utils
│   │   ├── generate-token.ts
│   ├── server.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 📌 **Descrição**

Esta é uma **API RESTful** construída com **TypeScript**, **Express** e **MongoDB** para gerenciar filmes e usuários.  
Ela permite operações CRUD (Create, Read, Update, Delete) de usuários e filmes, além de autenticação JWT.

## 📌 **Funcionalidades**

# 🚀 Features and Tools Overview

## 🔒 Authentication
- **JWT Authentication**: Users can authenticate and obtain a JWT token to access protected resources.

---

## 👥 User and Movie Management
- **Users**: 👤 Create, 🧐 Read, ✏️ Update, and 🗑️ Delete users.
- **Movies**: 🎥 Create, 📖 Read, ✏️ Update, and 🗑️ Delete movies.

---

## 📚 Documentation
- **Swagger Documentation**: 📝 Detailed API documentation with Swagger.

---

## 📈 Metrics and Logging
- **Prometheus Metrics**: 📊 Monitor HTTP requests and 🧠 memory usage.
- **Advanced Logger**: 📜 Detailed logging with 🪵 Winston and 📑 Morgan.

---

## 🛠️ Development and Deployment
- **Docker**: 🐳 Development and production environments with Docker.
- **Docker Compose**: ⚙️ Configuring development environments with Docker Compose.

---

## 💎 Code Quality and CI/CD
- **TypeScript**: 📜 Write high-quality code with static typing.
- **MongoDB**: 💾 NoSQL database for data storage.
- **Mongoose**: 🧩 ORM for interacting with MongoDB.
- **CI/CD**: 🔄 Continuous integration with GitHub Actions.
- **SonarQube**: 🔍 Code quality analysis and 🧪 test coverage.
- **Husky**: 🐶 Git hooks to ensure quality before commits and pushes.


## ⚙️ **Configuração**

### 1️⃣ **Variáveis de Ambiente**

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Configuration Variables

## API Settings
```env
# Port on which the API will run
PORT=3000

# Base URL for the API
API_URL=/api/v1

# Current environment (development, production, etc.)
NODE_ENV=development

# Local MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/nome-do-banco

# MongoDB database name
DB_NAME=myFirstDataBase

# MongoDB user credentials
DB_USER=seu_usuario
DB_PASS=sua_senha

# MongoDB Atlas connection URI
DB_URI=mongodb+srv://seu_usuario:sua_senha@cluster.mongodb.net/seu_banco?retryWrites=true&w=majority

# Admin credentials for MongoDB initialization
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=1234

# Secret key used to sign JWT tokens
JWT_SECRET=sua-chave-secreta

# Expiration time for JWT tokens
JWT_EXPIRES_IN=1h

# API key for Swagger documentation access
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
- `src/middlewares/morgan-middleware.ts`: Arquivo de configuração do middleware de log.
- `src/config/db.ts`: Arquivo de configuração da conexão com o banco de dados.
- `src/config/logger.ts`: Arquivo de configuração do logger.
- `src/config/swagger.ts`: Arquivo de configuração do Swagger.
- `src/utils/generate-token.ts`: Arquivo de configuração da função generateToken.

## 🚀 Instalação

### 🛠️ 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/seu-projeto.git
cd seu-projeto
```

## 📦 2. Instalar Dependências

Para instalar o projeto, execute o seguinte comando:

```bash
npm install
```

## 🏗 3. Rodar o Servidor

Para rodar o servidor, execute o seguinte comando:

```bash
npm run dev
```

## 🐳 Configuração do Docker

Para facilitar a execução do banco de dados **MongoDB** em um ambiente isolado, utilizamos **Docker** e **Docker Compose**.

### ⚙️ Configuração do `docker-compose.yml`:

O arquivo `docker-compose.yml` já está configurado para subir um contêiner com o **MongoDB**. Ele contém:
```
✅ Imagem oficial do MongoDB
✅ Mapeamento de portas (`27017:27017`)
✅ Persistência de dados via `volumes`
```

### 📌 Pré-requisitos:

- **Docker** instalado em sua máquina. Caso não tenha, baixe e instale pelo site oficial: [Docker](https://www.docker.com/)
- **Docker Compose** instalado (já incluso no Docker Desktop)

### 1️⃣ Requisitos

    Docker instalado → Download Docker
    Docker Compose instalado (já vem no Docker Desktop)

### 2️⃣ Executando o Docker Compose

```bash
docker build -t mongo-rest-api .
docker-compose up -d
```

### 🏗️ 3. Rodar o Servidor

#### Ambiente de Desenvolvimento:
```bash
npm run dev
```

#### Ambiente de Produção:
```bash
npm run build
npm start
```

### ✅ Explicação:

    up → Sobe os containers
    -d → Roda em background

## 📜 Configuração de Logger

Para garantir um monitoramento eficaz e um **debugging** mais eficiente, utilizamos o **Winston**, uma biblioteca de logging robusta e flexível para **Node.js**.

### 🔥 Recursos do Logger:

```plaintext
✅ **Geração de logs detalhados (info, warn, error, debug, http)**
✅ **Armazenamento de logs em arquivos separados**
✅ **Saída colorida no console durante o desenvolvimento**
✅ **Registros de exceções e rejeições de promessas**
```

### 📌 Pré-requisitos:

Certifique-se de instalar o **Winston** no projeto antes de utilizá-lo:

🏗️ Estrutura dos Logs:

Os logs são armazenados na pasta logs/, e separados por nível de severidade:

```plaintext
📂 logs/
├── all.log # Todos os logs
├── error.log # Erros críticos
├── warn.log # Avisos importantes
├── info.log # Informações gerais
├── debug.log # Logs detalhados para debugging
├── http.log # Logs de requisições HTTP
├── exceptions.log # Logs de exceções não tratadas
├── rejections.log # Logs de rejeições de Promises
```

### 🚀 Como configurar o Logger:

Para configurar o logger, siga as instruções abaixo:

```bash
npm install winston
```
# 🪵 Advanced Logging System

## Overview
This logger is designed to provide a robust and flexible logging mechanism for applications running in **Node.js**. It supports various log levels, colorized console output in development environments, and file-based logging for production environments. The system helps in monitoring, debugging, and analyzing application behavior effectively.

---

## 📜 Features
### 🌍 Environment Awareness
- Automatically detects the environment (`NODE_ENV`) and adjusts logging levels accordingly:
  - **Development**: Enables detailed logs including `debug` messages.
  - **Production**: Focuses on higher-level logs like `info` and `error`.

### 📁 Directory Management
- Automatically creates a `logs` directory if it doesn't exist to store log files.

### 🚦 Log Levels
Defines multiple levels of logging for granular control:
- **error**: Critical issues that require immediate attention (🛑).
- **warn**: Potential problems or warnings (⚠️).
- **info**: General information and process updates (ℹ️).
- **http**: HTTP request details for monitoring (🌐).
- **debug**: Detailed debugging information (🐞).

### 🎨 Log Formatting and Colors
- Timestamps (`YYYY-MM-DD HH:mm:ss:ms`) for every log entry.
- Custom color-coded log levels for better readability in the console:
  - **error**: Red 🔴
  - **warn**: Yellow 🟡
  - **info**: Green 🟢
  - **http**: Magenta 🟣
  - **debug**: Cyan 🔵

### 🚚 Log Storage
- Stores logs in dedicated files based on levels:
  - **all.log**: Contains all log entries.
  - **error.log**: Captures only `error` level logs.
  - **debug.log**: Contains `debug` messages for troubleshooting.
  - **info.log**: Logs general information.
  - **warn.log**: Logs warnings.
  - **http.log**: Tracks HTTP requests.

### 💻 Console Output (Development Only)
- Provides real-time, colorized log output to the console during development for improved debugging.

### 🛑 Exception and Rejection Handlers
- Captures uncaught exceptions and rejected promises for analysis:
  - **exceptions.log**: Logs uncaught exceptions.
  - **rejections.log**: Logs promise rejections.

---

## ✨ Benefits
- **Improved Debugging**: Detailed logs and granular control simplify troubleshooting.
- **Error Tracking**: Logs critical issues separately to prioritize fixes.
- **Monitoring**: Tracks HTTP requests and application metrics.
- **Environment-Specific Behavior**: Tailors logging output to suit development and production needs.
- **File Organization**: Keeps logs organized and easily accessible.

---

## 🚀 Usage
Simply import the logger into your project:
```javascript
import Logger from './path/to/logger';

// Example usage
Logger.info('Application started successfully');
Logger.error('Database connection failed');
Logger.debug('Fetching data from API');


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

## 📜 Configuração do Swagger

# 📚 Swagger Integration

## Overview
The Swagger integration in your project enables comprehensive and interactive API documentation using **Swagger UI** and **swagger-jsdoc**. It ensures your API is easily understood and accessible to developers and stakeholders, while adding secure access control to the documentation.

---

## 📜 Features
### ⚙️ Configuration
- **OpenAPI 3.0 Specification**: Defines your API using the latest OpenAPI standards.
- **Info Section**: Includes metadata like:
  - Title: *API Node + Express + MongoDB + Mongoose + TypeScript + JWT + Swagger + Docker*.
  - Version: *1.0.2*.
  - Description: *API Documentation*.

### 📁 Documentation Source
- Automatically scans and includes routes (`./src/routers/*.ts`) and controllers (`./src/controllers/*.ts`) in the documentation.

### 🔒 Middleware Authentication
- Adds access control to the Swagger UI:
  - Uses a custom authentication middleware (`swaggerAuthMiddleware`) to restrict access.

### 🛠️ Setup and Hosting
- **Swagger UI Hosting**: Serves the documentation at the `/api/v1/api-docs` endpoint.
- **Dynamic Documentation**: Provides an interactive interface for testing and exploring API endpoints.

---

## ✨ Benefits
- **Enhanced Accessibility**: Simplifies understanding of API routes and usage for developers.
- **Interactive API Testing**: Allows real-time testing directly from the documentation.
- **Secure Access**: Ensures only authorized users can access the API documentation.
- **Streamlined Workflow**: Automatically includes all relevant files for documentation.

---

## 🚀 Usage

Simply call the `setupSwagger` function in your app initialization to configure and serve the documentation:
```javascript
import setupSwagger from './path/to/swagger-setup';
import express from 'express';

const app = express();

// Example usage
setupSwagger(app);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});


Para configurar o Swagger, execute o seguinte comando:

```bash
npm run build
```

Depois, execute o seguinte comando:

```bash
npm run dev
```

## Documentação

A documentação da API está disponível em http://localhost:3000/api/v1/api-docs.

## 📜 **Documentação da API**

A documentação da API está disponível em:  
[http://localhost:3000/api/v1/api-docs](http://localhost:3000/api/v1/api-docs)

---

## 📊 **Métricas Prometheus**

A API coleta métricas de desempenho, como:
- Total de requisições HTTP.
- Duração das requisições.
- Uso de memória.

As métricas estão disponíveis em:  
[http://localhost:3000/metrics](http://localhost:3000/metrics)

---

## 📌 Endpoints

### 🧑‍💻 Usuários

| Método     | Rota                | Descrição                |
| ---------- | ------------------- | ------------------------ |
| **POST**   | `/api/v1/login`     | Login do usuário         |
| **POST**   | `/api/v1/create/user`    | Criar usuário            |
| **GET**    | `/api/v1/users`     | Listar usuários          |
| **GET**    | `/api/v1/users/:id` | Buscar usuário por ID    |
| **PUT**    | `/api/v1/users/:id` | Atualizar usuário por ID |
| **DELETE** | `/api/v1/users/:id` | Deletar usuário por ID   |

## 📌 Endpoints

### 🎬 Filmes

| Método     | Rota                 | Descrição              |
| ---------- | -------------------- | ---------------------- |
| **POST**   | `/api/v1/create/movie`     | Criar novo filme       |
| **GET**    | `/api/v1/movies`     | Listar filmes          |
| **GET**    | `/api/v1/movies/:id` | Buscar filme por ID    |
| **PUT**    | `/api/v1/movies/:id` | Atualizar filme por ID |
| **DELETE** | `/api/v1/movies/:id` | Deletar filme por ID   |

## 📦 Dependências

As seguintes bibliotecas são utilizadas no projeto:

- **config**: `^3.3.12` – Gerenciamento de configurações
- **dotenv**: `^16.4.7` – Carregamento de variáveis de ambiente
- **express**: `^4.21.2` – Framework web para Node.js
- **express-validator**: `^7.2.1` – Middleware para validação de requisições
- **mongoose**: `^8.12.1` – ODM para MongoDB
- **morgan**: `^1.10.0` – Middleware para logs de requisições
- **winston**: `^3.17.0` – Biblioteca para logging

## 🛠️ Dependências de Desenvolvimento

Ferramentas utilizadas para desenvolvimento e tipagem:

- **@types/config**: `^3.3.5` – Tipagens para a biblioteca config
- **@types/express**: `^5.0.0` – Tipagens para Express
- **@types/mongoose**: `^5.11.96` – Tipagens para Mongoose
- **@types/morgan**: `^1.9.9` – Tipagens para Morgan
- **@types/node**: `^22.13.9` – Tipagens para Node.js
- **ts-node-dev**: `^2.0.0` – Reinicialização automática do servidor em TypeScript
- **typescript**: `^5.8.2` – Compilador TypeScript

## 🛠️ **Ferramentas e Tecnologias**

- **Node.js**: Plataforma para execução de JavaScript no servidor.
- **Express**: Framework web minimalista para Node.js.
- **TypeScript**: Superset de JavaScript com tipagem estática.
- **MongoDB**: Banco de dados NoSQL.
- **Mongoose**: ODM para MongoDB.
- **JWT**: Autenticação baseada em tokens.
- **Winston**: Gerenciamento de logs.
- **Morgan**: Middleware para logs HTTP.
- **Swagger**: Documentação interativa da API.
- **Prometheus**: Monitoramento de métricas.
- **Docker**: Contêineres para desenvolvimento e produção.
- **SonarQube**: Análise de qualidade de código.


# 📊 Análise Técnica: Estrutura de CI/CD com GitHub Actions

Este documento apresenta uma análise crítica e estratégica da estrutura de CI/CD adotada neste projeto, destacando os benefícios, boas práticas aplicadas e o impacto profissional que isso representa.

---

## 🚀 Objetivo

Tornar este projeto pessoal mais profissional, aplicando práticas reais de DevOps e Engenharia de Software:

- Automatizar testes, lint, análise de qualidade e deploy.
- Aplicar padrões de modularidade e legibilidade nos workflows.
- Demonstrar maturidade técnica e compromisso com qualidade.

---

## 🧱 Arquitetura do Workflow

Este projeto utiliza dois arquivos principais no GitHub Actions:

| Arquivo | Finalidade |
|--------|------------|
| `.github/workflows/ci-core.yml` | Lint, Prettier, Testes (Jest + Supertest) e SonarQube |
| `.github/workflows/deploy.yml`  | Deploy automatizado com `workflow_run` pós CI bem-sucedido |

---

## ✅ Boas Práticas Aplicadas

### 🎯 CI Modular com `needs` e `workflow_run`
- Permite pipelines reutilizáveis e separação de responsabilidades.
- Melhora a manutenção e a legibilidade dos workflows.

### 🧪 Testes Automatizados com Cobertura
- Utilização de Jest e Supertest.
- Cobertura reportada no formato `lcov` para SonarQube.

### 🔍 Análise Estática com ESLint + Prettier
- Garante consistência e qualidade de código.
- Impede erros simples antes de chegar à produção.

### 🧠 SonarQube para Qualidade de Código
- Detecta code smells, duplicações e complexidade.
- Integra com cobertura de testes.

### 🐳 Docker para Ambientes Consistentes
- Facilita testes locais e preparação para produção real.

### 🦮 Husky para Git Hooks
- Impede commits quebrados (pre-commit lint/test).
- Cria uma camada de segurança antes do push.

### 📄 Logging com Morgan + Winston
- Padrão profissional de logs para debug e produção.

---

## 📈 **CI/CD com GitHub Actions**

O projeto utiliza **GitHub Actions** para:
- Lint e formatação de código.
- Execução de testes automatizados.
- Análise de qualidade com SonarQube.
- Deploy automatizado.

---

## 🧠 O Que Isso Reflete Sobre o Profissional

| Competência | Evidência |
|------------|-----------|
| ✔️ Maturidade Técnica | Organização da pipeline, automações e separação de responsabilidades. |
| ✔️ Qualidade de Código | ESLint, Prettier e SonarQube integrados ao ciclo de vida. |
| ✔️ Visão DevOps | Uso de Docker, workflows automatizados e deploy contínuo. |
| ✔️ Confiabilidade | Testes com Jest e Supertest com cobertura. |
| ✔️ Colaboração Profissional | Husky e Git standards mantêm o projeto pronto para múltiplos contribuidores. |

---

## 🏆 Impacto no GitHub

- Aumenta credibilidade do repositório.
- Transforma projeto pessoal em **portfólio técnico real**.
- Atrai recrutadores, contribuidores e parceiros.
- Facilita onboarding e manutenção contínua.

---

## 📌 Próximos Passos (Sugestões)

- [ ] Adicionar badges de build, cobertura e SonarQube no `README.md`.
- [ ] Automatizar deploy real (e.g., Vercel, Render, Heroku ou Docker Compose + VPS).
- [ ] Criar teste end-to-end básico com `supertest` ou `Playwright`.

---

> 💡 Se você chegou até aqui e achou útil, não esqueça de deixar uma ⭐ no projeto!


## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhe

## 👤 **Autor**

[Kleilson Santos](https://github.com/KleilsonSantos)