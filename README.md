# Plataforma Anjos de Resgate

Prototipo Web/PWA para apoio a ONG Anjos de Resgate, de Sao Sebastiao do Paraiso/MG.

A primeira entrega foi preparada para demonstracao em 17/06/2026 e cobre apenas o portal inicial, a listagem publica de animais, cards reutilizaveis, cadastro administrativo basico e API inicial de animais. Os modulos de adocao, doacoes, apadrinhamento, campanhas, parcerias, dashboard, usuarios e relatorios estao documentados como evolucao futura.

O incremento do Prototipo 1, previsto para validacao em 01/07/2026, adiciona paginas institucionais, contato, login administrativo simulado, edicao de animais no frontend e execucao orientada por Docker.

## Stack

- Frontend: Next.js, React e TypeScript.
- Estilo: Tailwind CSS.
- Backend/API: NestJS e TypeScript.
- Banco/ORM: Prisma com PostgreSQL como alvo arquitetural.
- Alternativa local: SQLite para prototipo quando nao houver PostgreSQL disponivel.
- Validacao: class-validator na API e regras de dominio em `@anjos/domain`.
- Testes: Vitest.
- Documentacao: Markdown, ADRs e Mermaid.

## Estrutura

```text
apps/
  web/       Next.js com portal publico e admin inicial
  api/       NestJS com modulo de animais
packages/
  domain/    Entidades e regras de dominio
  shared/    Labels, opcoes, dados de demonstracao e conteudo do portal
  ui/        Componentes reutilizaveis
docs/        Documentacao funcional, tecnica e de pesquisa
diagrams/    Diagramas Mermaid
prompts/     Prompts ArqAssisWeb reutilizaveis
```

## Instalar

```bash
pnpm install
```

Se usar `pnpm` em ambiente novo, aprove os build scripts necessarios quando solicitado para Prisma, esbuild e sharp.

## Executar com banco em memoria

Modo mais simples para demonstracao local:

```bash
cp .env.example .env
DATABASE_URL=file:./dev.db npm run db:generate:sqlite
DATABASE_URL=file:./dev.db USE_IN_MEMORY_REPOSITORY=true npm run dev
```

Web: `http://localhost:3000`

API: `http://localhost:3333`

## Executar com PostgreSQL

```bash
cp .env.example .env
docker compose up -d postgres
npm run db:generate
npm run db:migrate:dev
npm run db:seed
npm run dev
```

## Executar tudo com Docker

O caminho recomendado para demonstracao do Prototipo 1 e:

```bash
docker compose up --build
```

Servicos:

- Web: `http://localhost:3000`
- API: `http://localhost:3333`
- Health check da API: `http://localhost:3333/health`
- Admin: `http://localhost:3000/admin/animais`

Codigo administrativo simulado: `anjos2026`.

Detalhes de execucao, verificacao e troubleshooting estao em `docs/16-execucao-prototipo-docker.md`.

## Documentacao do prototipo

- Funcionalidades implementadas e como foram construidas: `docs/17-funcionalidades-implementadas.md`.
- Prints de tela para validacao: `docs/18-prints-telas-prototipo-1.md`.
- Execucao com Docker: `docs/16-execucao-prototipo-docker.md`.
- Evidencias ArcAssist-Web do Prototipo 1: `docs/15-prototipo-1-arcassist-web/`.
- Gestao de textos e imagens do portal: `docs/20-gestao-de-conteudo.md`.

## Validacao e contribuicoes via GitHub

Este repositorio esta preparado para receber feedbacks e pequenas contribuicoes
por Issues e Pull Requests.

- Roteiro para validar o prototipo: `VALIDATION.md`.
- Guia para contribuir com codigo ou documentacao: `CONTRIBUTING.md`.
- Registro das validacoes quinzenais: `docs/06-validacoes.md`.
- Estrutura sugerida para publicacao no GitHub: `docs/19-repositorio-github-colaborativo.md`.
- Conteudo editavel do portal: `packages/shared/src/site-content.ts`.

Use Issues para registrar problemas, sugestoes e percepcoes de validacao. Use
Pull Requests para mudancas pequenas e focadas. Mudancas de escopo, como adocao
completa, doacoes ou autenticacao real, devem ser discutidas em uma Issue antes
da implementacao.

## Executar com SQLite para prototipo

Edite `.env` e use:

```env
DATABASE_URL=file:./dev.db
```

Depois:

```bash
npm run db:generate:sqlite
npm run db:migrate:dev:sqlite
npm run db:seed
npm run dev
```

## Testes

```bash
npm test
```

Os testes iniciais cobrem criacao/validacao de Animal, servico de listagem/criacao e componente `AnimalCard`.

Pendente nesta primeira base: teste HTTP/e2e dos endpoints. A camada de service ja esta coberta com repositorio em memoria, mas o teste de endpoint deve entrar quando o fluxo de banco/Prisma estiver estabilizado no ambiente local.

## Escopo da primeira iteracao

- Tela inicial da plataforma.
- Listagem publica de animais.
- Card basico de animal.
- Detalhe simples de animal.
- Admin inicial com cadastro e alteracao de status.
- API CRUD inicial para animais.
- Prisma com PostgreSQL e alternativa SQLite.
- Seed com animais ficticios.
- Documentacao arquitetural, ADRs, diagramas e prompts.

## Escopo do Prototipo 1

- Pagina sobre a ONG.
- Pagina de contato com canais iniciais.
- Edicao administrativa de animais.
- Login administrativo simulado para validacao.
- Docker Compose com Web, API e PostgreSQL.
- Conteudo textual e imagem principal centralizados em `packages/shared`.
- Registro de evidencias ArcAssist-Web para o incremento.

## Limitacoes conhecidas

- Autenticacao esta simulada.
- Botao "Tenho interesse" e apenas visual.
- Fluxo de adocao estilo Tinder ainda nao foi implementado.
- Doacoes, apadrinhamento, campanhas, parcerias e relatorios estao apenas planejados.
- Edicao administrativa de conteudo ainda nao foi implementada; por enquanto,
  textos e imagens sao alterados por Pull Request.
