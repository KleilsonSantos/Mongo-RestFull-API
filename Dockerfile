# # 📦 Imagem base
# FROM node:23.0.0-alpine3.18

# ENV NODE_VERSION 18.20.7

# # 📁 Diretório de trabalho
# WORKDIR /app

# # 🔐 Copia os arquivos essenciais
# COPY package*.json ./
# COPY tsconfig*.json ./
# COPY .eslintrc.js .prettierrc babel.config.js ./

# # 📦 Instala dependências
# RUN npm install

# # 📁 Copia código fonte
# COPY ./src ./src

# # 🔨 Build
# RUN npm run build

# # 🚀 Inicia aplicação
# CMD ["node", "dist/app.js"]
FROM node:18

RUN apt-get update && \
    apt-get install -y curl && \
    curl -s https://raw.githubusercontent.com/nektos/act/master/install.sh | bash

WORKDIR /github/workspace

CMD ["node", "--trace-deprecation", "index.js"]