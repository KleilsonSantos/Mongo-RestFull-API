#!/bin/bash

# -----------------------------------------------
# Script para rodar workflows GitHub localmente com act
# -----------------------------------------------

# Verifica se o GITHUB_TOKEN está setado
if [ -z $ACT_TOKEN ]; then
  echo "❌ GITHUB_TOKEN não está definido. Por favor, exporte-o antes de executar."
  echo "Exemplo: export GITHUB_TOKEN=ghp_seu_token_aqui"
  exit 1
fi

# Define o evento do GitHub a ser simulado (padrão: push)
EVENT="push"

# Caminho do executável do act
ACT_BIN="/usr/bin/act"

# Verifica se o act está disponível
if [ ! -f "$ACT_BIN" ]; then
  echo "❌ act não encontrado em $ACT_BIN. Deseja baixar automaticamente? (s/n)"
  read -r RESP
  if [[ "$RESP" == "s" ]]; then
    mkdir -p bin
    curl -s https://raw.githubusercontent.com/nektos/act/master/install.sh | bash -s -- -b ./bin
  else
    echo "🚫 Instalação cancelada. Por favor, baixe o act manualmente ou corrija o caminho."
    exit 1
  fi
fi

# Executa o act com o token como segredo
echo "🚀 Executando workflow local com evento: $EVENT"
$ACT_BIN $EVENT -s GITHUB_TOKEN=$ACT_TOKEN

