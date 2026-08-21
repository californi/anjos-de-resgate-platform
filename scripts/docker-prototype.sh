#!/usr/bin/env sh

set -eu

PROJECT_NAME="anjos-de-resgate"
COMPOSE="docker compose -p ${PROJECT_NAME}"

print_usage() {
  cat <<'USAGE'
Uso:
  sh scripts/docker-prototype.sh up       Sobe Web, API e PostgreSQL
  sh scripts/docker-prototype.sh down     Para os containers sem apagar dados
  sh scripts/docker-prototype.sh reset    Recria containers e apaga o banco local
  sh scripts/docker-prototype.sh status   Mostra estado dos servicos
  sh scripts/docker-prototype.sh logs     Mostra logs da Web e da API

Depois de subir:
  Web:   http://localhost:3000
  API:   http://localhost:3333/health
  Admin: http://localhost:3000/admin/animais
  Codigo administrativo simulado: anjos2026
USAGE
}

wait_for_url() {
  label="$1"
  url="$2"
  attempts=60

  printf "Aguardando %s em %s" "$label" "$url"
  while [ "$attempts" -gt 0 ]; do
    if curl -fsS "$url" >/dev/null 2>&1; then
      printf "\n%s disponivel.\n" "$label"
      return 0
    fi
    printf "."
    attempts=$((attempts - 1))
    sleep 2
  done

  printf "\n%s ainda nao respondeu. Veja os logs com: sh scripts/docker-prototype.sh logs\n" "$label"
  return 1
}

command="${1:-up}"

case "$command" in
  up)
    $COMPOSE up --build -d
    $COMPOSE ps
    wait_for_url "API" "http://localhost:3333/health"
    wait_for_url "Web" "http://localhost:3000"
    printf "\nAmbiente pronto para validacao.\n"
    printf "Abra http://localhost:3000 e use o admin em http://localhost:3000/admin/animais.\n"
    ;;
  down)
    $COMPOSE down --remove-orphans
    ;;
  reset)
    $COMPOSE down --remove-orphans -v
    $COMPOSE up --build -d
    $COMPOSE ps
    wait_for_url "API" "http://localhost:3333/health"
    wait_for_url "Web" "http://localhost:3000"
    printf "\nAmbiente recriado do zero.\n"
    ;;
  status)
    $COMPOSE ps
    ;;
  logs)
    $COMPOSE logs --tail=120 api web
    ;;
  help|-h|--help)
    print_usage
    ;;
  *)
    print_usage
    exit 1
    ;;
esac
