# Execucao do Prototipo com Docker

Este guia descreve como executar o Prototipo 1 da Plataforma Anjos de Resgate com Docker Compose.

## O que sera executado

- `postgres`: banco PostgreSQL do prototipo.
- `api`: API NestJS com modulo de animais.
- `web`: frontend Next.js/PWA.

## Pre-requisitos

- Docker Desktop instalado e em execucao.
- Portas locais livres:
  - `3000` para a Web.
  - `3333` para a API.
  - `5432` para o PostgreSQL.

## Subir o ambiente

Na raiz do projeto:

```bash
docker compose up --build
```

O primeiro build pode demorar porque instala dependencias Node.js dentro das imagens.

## Acessar

- Web: `http://localhost:3000`
- API: `http://localhost:3333`
- Health check: `http://localhost:3333/health`
- Admin: `http://localhost:3000/admin/animais`

Codigo administrativo simulado:

```text
anjos2026
```

Esse codigo existe apenas para validacao do prototipo. Ele nao substitui autenticacao real.

## Dados iniciais

Ao iniciar a API pelo Docker Compose, o container executa:

```bash
npm run db:push -w @anjos/api
npm run db:seed -w @anjos/api
```

Isso cria a estrutura do banco e insere animais de demonstracao.

Se voce executou uma versao anterior do prototipo com o nome tecnico antigo,
recrie o ambiente local para evitar conflito entre bancos e containers:

```bash
docker compose down --remove-orphans
docker compose up --build
```

Em ambiente apenas de teste, `docker compose down -v` tambem pode ser usado
para apagar o banco local e recriar tudo do zero.

## Verificacao rapida

1. Abra `http://localhost:3333/health`.
2. Confirme que a resposta contem `status: ok`.
3. Abra `http://localhost:3000/animais`.
4. Confirme que a lista mostra os animais iniciais.
5. Abra `http://localhost:3000/admin/animais`.
6. Entre com o codigo `anjos2026`.
7. Cadastre um animal.
8. Edite o animal pela acao `Editar`.
9. Altere o status no seletor administrativo.

## Encerrar

```bash
docker compose down
```

Para remover tambem o volume do banco:

```bash
docker compose down -v
```

Use `down -v` apenas quando quiser apagar os dados locais do prototipo.

## Troubleshooting

### Porta ocupada

Se uma porta ja estiver em uso, encerre o processo local ou altere o mapeamento de portas no `docker-compose.yml`.

### Web mostra dados de demonstracao

A Web mostra dados demo quando a API nao responde. Verifique:

- se `api` esta de pe no Docker Compose;
- se `http://localhost:3333/health` responde;
- se `API_INTERNAL_URL` no servico `web` aponta para `http://api:3333`;
- se `NEXT_PUBLIC_API_URL` aponta para `http://localhost:3333`.

### Banco sem dados

Recrie a base local:

```bash
docker compose down -v
docker compose up --build
```

## Evidencias para validacao

Durante a validacao quinzenal, registre:

- data e versao avaliada;
- comando usado para executar;
- prints das telas principais;
- erros encontrados;
- campos que a ONG pediu para incluir, remover ou renomear;
- decisoes tomadas antes de avancar para o fluxo de adocao.
