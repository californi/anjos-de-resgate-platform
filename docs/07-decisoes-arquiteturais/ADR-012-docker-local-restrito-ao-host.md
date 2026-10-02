# ADR-012 - Restringir o ambiente Docker ao host local

## Status

Aceita em 02/10/2026.

## Contexto

O ambiente Docker atual serve para desenvolvimento e demonstracao. A barreira
administrativa e simulada no navegador, e os endpoints de escrita ainda nao
possuem autenticacao, autorizacao ou limitacao de requisicoes. A publicacao das
portas em todas as interfaces da maquina permitiria acesso acidental por outros
dispositivos da rede.

## Decisao

Publicar Web, API, PostgreSQL e Mailpit somente em `127.0.0.1` no Compose do
prototipo. Documentar que esse ambiente nao deve ser exposto na Internet nem
utilizado com dados pessoais ou financeiros reais.

Esta decisao e uma contencao para o prototipo, nao substitui autenticacao,
autorizacao, rate limiting, protecao do formulario, gestao de segredos e demais
controles necessarios para implantacao.

## Consequencias

- A demonstracao continua acessivel no computador que executa o Docker.
- Outros dispositivos da rede nao acessam diretamente as portas publicadas.
- Demonstracoes remotas exigem um ambiente de implantacao projetado e protegido.
- Autenticacao, permissoes e protecao contra abuso permanecem no backlog antes
  de qualquer uso publico.

## Evidencias

- `docker-compose.yml`
- `README.md`
- `docs/16-execucao-prototipo-docker.md`
