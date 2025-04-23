# 🐳 Use a minimal Node.js image with security updates
FROM node:20.11.1-alpine3.19@sha256:0c2e2e8c1d4c27b4a2b8a91bdc7fe4d5b8e05e0f3bbb3f0e3960fbf4fde8e56 AS builder

# ��️ Add specific tags for better traceability
LABEL maintainer="devops@example.com" \
      version="1.0.0" \
      description="Secure Node.js application container"

# 🔒 Update system packages and install security essentials
RUN apk update && apk upgrade --no-cache && \
    apk add --no-cache dumb-init && \
    apk add --no-cache --virtual .build-deps g++ make python3 && \
    npm install -g npm@latest && \
    npm cache clean --force && \
    groupadd -r nodejs && useradd -r -g nodejs nodejs

# 📁 Define the working directory inside the container
WORKDIR /usr/src/app

# 📦 Copy dependency files and install as non-root
COPY --chown=nodejs:nodejs package*.json ./
USER nodejs
RUN npm ci --only=production

# 📄 Copy the rest of the source code and build
COPY --chown=nodejs:nodejs . .
RUN npm run build

# 🚀 Production image
FROM alpine:3.19.1@sha256:c5c5fda71656f07c8ef65da2c4a1f7f95e32e4e3f43c1bf40f7ba5a6e6f6af4

# Install Node.js runtime only
RUN apk add --no-cache dumb-init nodejs shadow && \
    groupadd -r nodejs && useradd -r -g nodejs nodejs

USER nodejs
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist /usr/src/app/dist
COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=builder /usr/bin/dumb-init /usr/bin/dumb-init

# 🔌 Expose the application port
EXPOSE 3000

# 🚀 Use dumb-init as entrypoint
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "dist/server.js"]