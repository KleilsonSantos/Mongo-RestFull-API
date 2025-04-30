# 🐳 Use a minimal Node.js image with security updates
FROM node:18-alpine as builder

# ��️ Add specific tags for better traceability
LABEL maintainer="devops@example.com" \
      version="1.0.0" \
      description="Secure Node.js application container"

# 📁 Define the working directory inside the container
WORKDIR /usr/src/app

# 📄 Copy the rest of the source code and build
COPY --chown=nodejs:nodejs . .
USER nodejs
RUN npm run build

# 🚀 Production image
FROM alpine:3.19.1


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