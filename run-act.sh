#!/bin/bash

set -e

# Caminhos dos arquivos
EVENT_FILE=".github/event-payloads/pull_request.json"
SECRETS_FILE=".secrets"

echo "🔍 Validando arquivos necessários..."

# Verificação do arquivo .secrets
if [ ! -f "$SECRETS_FILE" ]; then
  echo "❌ Arquivo .secrets não encontrado."
  exit 1
fi

# Verificação do arquivo de evento
if [ ! -f "$EVENT_FILE" ]; then
  echo "❌ Arquivo de evento $EVENT_FILE não encontrado."
  exit 1
fi

# Leitura de campos obrigatórios
PR_NUMBER=$(jq -r '.pull_request.number // empty' "$EVENT_FILE")
REPO_NAME=$(jq -r '.repository.name // empty' "$EVENT_FILE")
REPO_OWNER=$(jq -r '.repository.owner.login // empty' "$EVENT_FILE")

# Validação dos campos extraídos
if [[ -z "$PR_NUMBER" || -z "$REPO_NAME" || -z "$REPO_OWNER" ]]; then
  echo "❌ Campo(s) ausente(s) no JSON:"
  echo "   ➤ PR Number: $PR_NUMBER"
  echo "   ➤ Repo Name: $REPO_NAME"
  echo "   ➤ Repo Owner: $REPO_OWNER"
  exit 1
fi

echo "✅ JSON verificado com sucesso!"
echo "📄 Pull Request: #$PR_NUMBER | Repositório: $REPO_OWNER/$REPO_NAME"

# Carrega variáveis do arquivo .secrets, se desejar
source "$SECRETS_FILE"

# Usa ACT_TOKEN se estiver definido, senão tenta o GITHUB_TOKEN do ambiente
TOKEN_TO_USE="${ACT_TOKEN:-$GITHUB_TOKEN}"

if [[ -z "$TOKEN_TO_USE" ]]; then
  echo "❌ Nenhum token encontrado nas variáveis ACT_TOKEN ou GITHUB_TOKEN."
  exit 1
fi

echo "🚀 Executando 'act' com evento pull_request.json..."
act pull_request -e $EVENT_FILE -s GITHUB_TOKEN=$TOKEN_TO_USE
