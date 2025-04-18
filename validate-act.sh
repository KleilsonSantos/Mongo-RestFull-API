#!/bin/bash

EVENT_FILE=".github/event-payloads/pull_request.json"
SECRETS_FILE=".secrets"

echo "🔍 Validando arquivos necessários..."

# Verifica se o .secrets existe
if [ ! -f "$SECRETS_FILE" ]; then
  echo "❌ Arquivo .secrets não encontrado."
  exit 1
fi

# Verifica se o evento JSON existe
if [ ! -f "$EVENT_FILE" ]; then
  echo "❌ Arquivo de evento pull_request.json não encontrado."
  exit 1
fi

# Extrai campos do JSON
PR_NUMBER=$(jq -r '.pull_request.number' "$EVENT_FILE")
REPO_NAME=$(jq -r '.repository.name' "$EVENT_FILE")
REPO_OWNER=$(jq -r '.repository.owner.login' "$EVENT_FILE")

if [ "$PR_NUMBER" == "null" ] || [ "$REPO_NAME" == "null" ] || [ "$REPO_OWNER" == "null" ]; then
  echo "❌ Campo(s) ausente(s) no JSON:"
  echo "   PR Number: $PR_NUMBER"
  echo "   Repo Name: $REPO_NAME"
  echo "   Repo Owner: $REPO_OWNER"
  exit 1
fi

echo "✅ Arquivos verificados com sucesso!"
echo "🔧 Rodando act com o evento pull_request.json..."

act pull_request -e "$EVENT_FILE" -s GITHUB_TOKEN=$ACT_TOKEN

