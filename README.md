# Mongo Rest API 🚀

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

## 📌 **Descrição**

Esta é uma **API RESTful** construída com **TypeScript**, **Express** e **MongoDB** para gerenciar filmes e usuários.  
Ela permite operações CRUD (Create, Read, Update, Delete) de usuários e filmes, além de autenticação JWT.

## 📌 **Funcionalidades**

- **Autenticação JWT**: Usuários podem se autenticar e obter um token JWT para acessar recursos protegidos.
- **Usuários**: Criação, leitura, atualização e exclusão de usuários.
- **Filmes**: Criação, leitura, atualização e exclusão de filmes.
- **Documentação Swagger**: Documentação detalhada da API.
- **Docker**: Ambiente de desenvolvimento com Docker.
- **TypeScript**: Código de alta qualidade com tipagem estática.
- **MongoDB**: Banco de dados NoSQL para armazenamento de dados.
- **Mongoose**: ORM para interagir com o MongoDB.
- **Winston**: Gerenciamento de logs.
- **Morgan**: Registro de solicitações HTTP.
- **Docker Compose**: Configuração de ambiente de desenvolvimento com Docker.
- **Logger**: Registro de logs detalhados.

## ⚙️ **Configuração**

### 1️⃣ **Variáveis de Ambiente**

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=3000
API_URL=/api/v1
MONGODB_URI=mongodb://localhost:27017/nome-do-banco
JWT_SECRET=secret
JWT_EXPIRES_IN=1h
NODE_ENV=development
DB_NAME=myFirstDataBase
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_URI=mongodb+srv://seu_usuario:sua_senha@cluster.mongodb.net/seu_banco?retryWrites=true&w=majority
```

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

✅ **Imagem oficial do MongoDB**
✅ **Mapeamento de portas (`27017:27017`)**
✅ **Persistência de dados via `volumes`**

### 📌 Pré-requisitos:

- **Docker** instalado em sua máquina. Caso não tenha, baixe e instale pelo site oficial: [Docker](https://www.docker.com/)
- **Docker Compose** instalado (já incluso no Docker Desktop)

### 1️⃣ Requisitos

    Docker instalado → Download Docker
    Docker Compose instalado (já vem no Docker Desktop)

### 2️⃣ Executando o MongoDB com Docker

```bash
docker run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=1234 mongo
```

### 3️⃣ Executando o Docker Compose

```bash
docker-compose up -d
```

### ✅ Explicação:

    up → Sobe os containers
    -d → Roda em background

## 📜 Configuração de Logger

Para garantir um monitoramento eficaz e um **debugging** mais eficiente, utilizamos o **Winston**, uma biblioteca de logging robusta e flexível para **Node.js**.

### 🔥 Recursos do Logger:

✅ **Geração de logs detalhados (info, warn, error, debug, http)**
✅ **Armazenamento de logs em arquivos separados**
✅ **Saída colorida no console durante o desenvolvimento**
✅ **Registros de exceções e rejeições de promessas**

### 📌 Pré-requisitos:

Certifique-se de instalar o **Winston** no projeto antes de utilizá-lo:

🏗️ Estrutura dos Logs:

Os logs são armazenados na pasta logs/, e separados por nível de severidade:

📂 logs/
├── all.log # Todos os logs
├── error.log # Erros críticos
├── warn.log # Avisos importantes
├── info.log # Informações gerais
├── debug.log # Logs detalhados para debugging
├── http.log # Logs de requisições HTTP
├── exceptions.log # Logs de exceções não tratadas
├── rejections.log # Logs de rejeições de Promises

### 🚀 Como configurar o Logger:

Para configurar o logger, siga as instruções abaixo:

```bash
npm install winston
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

- Logger.info("🚀 Servidor iniciado com sucesso!");
- Logger.warn("⚠️ Isso é um aviso importante!");
- Logger.error("❌ Ocorreu um erro crítico no sistema!");
- Logger.debug("🔧 Debugging detalhado para fins de desenvolvimento!");
- Logger.http("📡 Requisição HTTP recebida com sucesso!");
- Logger.exceptions("❗️ Exceção nao tratada!");
- Logger.rejections("⚠️ Rejeicao de promisse nao tratada!");

## 📜 Configuração do Swagger

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

## Autor

[Kleilson Santos](https://github.com/KleilsonSantos)

## 📌 Endpoints

### 🧑‍💻 Usuários

| Método  | Rota                | Descrição                 |
|---------|---------------------|---------------------------|
| **POST**   | `/api/v1/login`     | Login do usuário         |
| **POST**   | `/api/v1/create`    | Criar usuário           |
| **GET**    | `/api/v1/users`     | Listar usuários         |
| **GET**    | `/api/v1/users/:id` | Buscar usuário por ID   |
| **PUT**    | `/api/v1/users/:id` | Atualizar usuário por ID |
| **DELETE** | `/api/v1/users/:id` | Deletar usuário por ID  |

## 📌 Endpoints

### 🎬 Filmes

| Método  | Rota                 | Descrição               |
|---------|----------------------|-------------------------|
| **POST**   | `/api/v1/movies`      | Criar novo filme       |
| **GET**    | `/api/v1/movies`      | Listar filmes         |
| **GET**    | `/api/v1/movies/:id`  | Buscar filme por ID   |
| **PUT**    | `/api/v1/movies/:id`  | Atualizar filme por ID |
| **DELETE** | `/api/v1/movies/:id`  | Deletar filme por ID  |

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


## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhe