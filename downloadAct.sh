#!/bin/sh
ARCH=$(uname -m)
VERSION=$(curl -s https://api.github.com/repos/nektos/act/releases/latest | grep tag_name | cut -d '"' -f 4)
echo ${ARCH}
echo ${VERSION}
#if [[ "$ARCH" == "x86_64" ]]; then
#  curl -Lo act.tar.gz "https://github.com/nektos/act/releases/download/${VERSION}/act_Linux_x86_64.tar.gz"
#elif [[ "$ARCH" == "aarch64" ]]; then
#  curl -Lo act.tar.gz "https://github.com/nektos/act/releases/download/${VERSION}/act_Linux_arm64.tar.gz"
#else
#  echo "Arquitetura não suportada automaticamente: $ARCH"
#  exit 1
#fi
