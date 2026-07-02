# Arquitetura

## Visao inicial

O projeto usa um monorepo simples com duas aplicacoes e pacotes compartilhados:

- `apps/web`: frontend Next.js/PWA.
- `apps/api`: API NestJS.
- `packages/domain`: entidades e regras de dominio.
- `packages/shared`: constantes, labels, dados de demonstracao e conteudo
  editavel do portal.
- `packages/ui`: componentes reutilizaveis.

## Separacao de responsabilidades

- Interface: paginas Next.js e componentes React.
- Aplicacao: services NestJS que orquestram casos de uso.
- Dominio: entidade `Animal`, enums e validacoes independentes de framework.
- Infraestrutura: Prisma, banco de dados e implementacoes de repositorio.
- Conteudo: textos, links e imagens publicas centralizados em
  `packages/shared/src/site-content.ts`.
- Documentacao: Markdown, ADRs, Mermaid e prompts versionados.

## Modulo implementado

O modulo de animais possui:

- Entidade `Animal` no dominio.
- DTOs de criacao, atualizacao e status na API.
- `AnimalsService` como camada de aplicacao.
- `AnimalsRepository` como contrato.
- `PrismaAnimalsRepository` como infraestrutura principal.
- `InMemoryAnimalsRepository` para demonstracao sem banco.
- `AnimalCard` como componente reutilizavel.

## Ambientacao

O projeto pode ser executado localmente de duas formas:

- Ambiente de desenvolvimento com Node.js, API e Web em processos locais.
- Ambiente Docker com PostgreSQL, API NestJS e Web Next.js.

No Docker, a Web usa `API_INTERNAL_URL` para chamadas server-side entre containers e `NEXT_PUBLIC_API_URL` para chamadas feitas pelo navegador. Essa separacao evita que a renderizacao server-side da Web dependa de `localhost` dentro do container.

## Modulos futuros

Os modulos de adocao, adotantes, interesses, doacoes, apadrinhamento, campanhas, parcerias, dashboard, usuarios/permissoes, gestao administrativa de conteudo e relatorios devem ser adicionados incrementalmente, com ADRs quando introduzirem novas decisoes relevantes.

## Decisoes iniciais

- Web/PWA antes de app nativo.
- Monorepo com separacao entre frontend, backend, dominio e infraestrutura.
- Documentacao versionada com ADRs, Mermaid e prompts.
- PostgreSQL como alvo arquitetural, com SQLite e memoria como alternativas de prototipo.
- Conteudo do portal centralizado em arquivo compartilhado nesta fase, com
  evolucao futura para gestao administrativa.
