# Plataforma Anjos de Resgate

Prototipo Web/PWA para apoio a ONG Anjos de Resgate, de Sao Sebastiao do Paraiso/MG.

A primeira entrega foi preparada para demonstracao em 17/06/2026 com portal,
animais e administracao inicial. A base evoluiu incrementalmente para interesse
em adocao e, no Prototipo 3, para doacoes e apoios.

O incremento do Prototipo 1, previsto para validacao em 01/07/2026, adiciona paginas institucionais, contato, login administrativo simulado, edicao de animais no frontend e execucao orientada por Docker.

O incremento do Prototipo 2.1 adiciona o registro inicial de interesse em adocao a partir da pagina de detalhe do animal. O interesse fica vinculado ao animal e aparece para revisao administrativa, mas ainda nao implementa o processo completo de adocao.

O Prototipo 3 adiciona upload de fotos, contato por e-mail, doacao geral,
campanhas, apadrinhamento, necessidades por animal, doadores e historico de
apoio. O Pix permanece informativo e cada apoio depende de confirmacao humana.

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
  api/       NestJS com animais, interesses, apoios, contato e uploads
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

O caminho recomendado para demonstracao do prototipo atual e:

```bash
sh scripts/docker-prototype.sh up
```

Servicos:

- Web: `http://localhost:3000`
- API: `http://localhost:3333`
- Health check da API: `http://localhost:3333/health`
- Admin: `http://localhost:3000/admin/animais`
- Apoios: `http://localhost:3000/apoie`
- Administracao de apoios: `http://localhost:3000/admin/apoios`
- Caixa local de e-mails: `http://localhost:8025`

Codigo administrativo simulado: `anjos2026`.

Comandos uteis:

```bash
sh scripts/docker-prototype.sh status
sh scripts/docker-prototype.sh logs
sh scripts/docker-prototype.sh down
sh scripts/docker-prototype.sh reset
```

Use `reset` quando quiser recriar o banco local do zero com os dados de demonstracao.

Detalhes de execucao, verificacao e troubleshooting estao em `docs/16-execucao-prototipo-docker.md`.

## Documentacao do prototipo

- Funcionalidades implementadas e como foram construidas: `docs/17-funcionalidades-implementadas.md`.
- Prints de tela para validacao: `docs/18-prints-telas-prototipo-1.md`.
- Execucao com Docker: `docs/16-execucao-prototipo-docker.md`.
- Evidencias ArcAssist-Web do Prototipo 1: `docs/15-prototipo-1-arcassist-web/`.
- Evidencias ArcAssist-Web do Prototipo 2.1: `docs/21-prototipo-2-interesse-adocao/`.
- Evidencias ArcAssist-Web do Prototipo 3: `docs/22-prototipo-3-apoios/`.
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
completa, pagamento integrado ou autenticacao real, devem ser discutidas em uma
Issue antes da implementacao.

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

Os testes cobrem dominio de animais e apoios, services de animais, interesses e
apoios, alem do componente `AnimalCard`.

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

## Escopo do Prototipo 2.1

- Feed publico compacto para dezenas de animais.
- Seed de demonstracao ampliado com muitos perfis ficticios.
- Inventario administrativo compacto para muitos animais.
- Telas administrativas separadas para inventario, cadastro, edicao e
  solicitacoes de interesse.
- Formulario publico de interesse em adocao na pagina de detalhe do animal.
- Registro persistente de interesse vinculado ao animal.
- Regra de aplicacao: bloquear interesse apenas quando o animal esta
  `IN_ADOPTION_PROCESS`.
- Listagem administrativa dos interesses recebidos, com quantidade por animal.
- Contagem de interesses no resumo de cada animal do inventario administrativo.
- Revisao humana antes de qualquer continuidade do processo de adocao.

## Limitacoes conhecidas

- Autenticacao esta simulada.
- O interesse em adocao e apenas uma manifestacao inicial e deve usar dados ficticios em validacoes.
- Fluxo de adocao estilo Tinder ainda nao foi implementado.
- Doacoes, campanhas e apadrinhamento usam registro e confirmacao manual; nao
  existe processamento automatico de pagamento.
- Autenticacao, autorizacao, privacidade formal e auditoria financeira ainda
  precisam ser implementadas antes de uso publico com dados reais.
- Parcerias e relatorios consolidados ainda estao planejados.
- Edicao administrativa de conteudo ainda nao foi implementada; por enquanto,
  textos e imagens sao alterados por Pull Request.

## Escopo do Prototipo 3

- Upload de imagem JPG, PNG ou WebP de ate 5 MB.
- Contato por SMTP, com Mailpit no Docker.
- Doacao geral e informacoes configuraveis de Pix.
- Campanhas de arrecadacao e progresso confirmado.
- Apadrinhamento unico ou mensal de animal.
- Necessidades por animal.
- Registro de doadores e historico administrativo.
- Confirmacao ou cancelamento manual de apoios.
