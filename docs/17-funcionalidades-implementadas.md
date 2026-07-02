# Prototipo 1 - Guia visual para validacao

Documento resumido para a reuniao de validacao de funcionalidades de
01/07/2026, seguindo o cronograma do projeto da Plataforma Anjos de Resgate.

## Objetivo da validacao

Validar se o Prototipo 1 comunica bem a proposta da plataforma e se a gestao
inicial de animais atende ao fluxo minimo da ONG antes de avancar para o
Prototipo 2, focado em adocao estilo Tinder.

## Acessos rapidos

Com o Docker Compose em execucao:

```bash
docker compose up --build
```

| Tela | Link local | Finalidade |
|---|---|---|
| Inicio | http://localhost:3000 | Apresentar a plataforma e destacar animais |
| Sobre | http://localhost:3000/sobre | Explicar finalidade da ONG e do prototipo |
| Contato | http://localhost:3000/contato | Mostrar canais iniciais de contato |
| Animais | http://localhost:3000/animais | Listar animais disponiveis/publicados |
| Detalhe do animal | http://localhost:3000/animais/demo-mel | Exibir perfil individual |
| Admin | http://localhost:3000/admin/animais | Gerir cadastro e status de animais |

Codigo administrativo simulado:

```text
anjos2026
```

Galeria estruturada de prints: [docs/18-prints-telas-prototipo-1.md](18-prints-telas-prototipo-1.md).

## Visao do que ja foi implementado

![BPMN simplificado do status do cronograma](assets/prototipo-1/bpmn-status-cronograma.svg)

Resumo:

- Implementado no prototipo inicial: tela inicial, listagem publica, detalhe de
  animal, card reutilizavel, cadastro basico, API de animais e documentacao.
- Implementado no Prototipo 1: pagina sobre, pagina de contato, login
  administrativo simulado, edicao de animais e execucao com Docker.
- Proximo passo no cronograma: fluxo de adocao estilo Tinder, registro de
  interesse, cadastro de adotante e painel de interessados.

## Arquitetura e infraestrutura

![Arquitetura e infraestrutura do Prototipo 1](assets/prototipo-1/arquitetura-infraestrutura.svg)

Como esta organizado:

- Interface: paginas Next.js e componentes React.
- Aplicacao: API NestJS com `AnimalsService`.
- Dominio: entidade `Animal`, enums e validacoes independentes de framework.
- Infraestrutura: Prisma, PostgreSQL, repositorio em memoria para prototipo e
  Docker Compose.
- Evidencias: documentacao, ADRs, diagramas e registros ArcAssist-Web.

## Funcionalidades para demonstrar

### 1. Portal inicial

Link: http://localhost:3000

O que validar:

- A proposta da plataforma esta clara?
- Os botoes principais levam para a listagem e para o admin?
- Os animais em destaque ajudam a comunicar o objetivo?

<img src="assets/prototipo-1/01-home.jpg" alt="Print da tela inicial" width="100%">

### 2. Pagina sobre a ONG

Link: http://localhost:3000/sobre

O que validar:

- O texto explica bem a finalidade da plataforma?
- A evolucao planejada esta compreensivel?
- Falta alguma informacao institucional importante?

<img src="assets/prototipo-1/02-sobre.jpg" alt="Print da pagina sobre" width="100%">

### 3. Pagina de contato

Link: http://localhost:3000/contato

O que validar:

- Os canais de contato estao adequados?
- O formulario desabilitado deixa claro que envio automatico e futuro?
- Quais dados reais devem aparecer nessa pagina?

<img src="assets/prototipo-1/03-contato.jpg" alt="Print da pagina contato" width="100%">

### 4. Listagem publica de animais

Link: http://localhost:3000/animais

O que validar:

- Os cards exibem as informacoes essenciais?
- Status, idade, porte e especie estao claros?
- A lista ajuda a ONG a divulgar os animais?

<img src="assets/prototipo-1/04-animais.jpg" alt="Print da listagem de animais" width="100%">

### 5. Detalhe do animal

Link: http://localhost:3000/animais/demo-mel

O que validar:

- O perfil individual tem informacoes suficientes?
- O botao `Tenho interesse` esta bem posicionado para a proxima iteracao?
- Que campos devem entrar antes do fluxo de adocao?

<img src="assets/prototipo-1/05-detalhe-animal.jpg" alt="Print do detalhe do animal" width="100%">

### 6. Acesso administrativo simulado

Link: http://localhost:3000/admin/animais

O que validar:

- O acesso simulado e suficiente para a validacao de hoje?
- A mensagem deixa claro que ainda nao e autenticacao real?
- A equipe entende que usuarios e permissoes entram depois?

<img src="assets/prototipo-1/06-admin-acesso.jpg" alt="Print do acesso administrativo" width="100%">

### 7. Painel administrativo de animais

Link: http://localhost:3000/admin/animais

O que validar:

- O cadastro tem os campos minimos corretos?
- A edicao de animais esta intuitiva?
- A alteracao de status cobre a rotina atual da ONG?
- Falta upload de imagem, filtros ou outros campos?

<img src="assets/prototipo-1/07-admin-painel.jpg" alt="Print do painel administrativo" width="100%">

## O que foi implementado tecnicamente

| Area | Implementado | Arquivos principais |
|---|---|---|
| Web/PWA | Paginas inicio, sobre, contato, animais, detalhe e admin | `apps/web/src/app` |
| Componentes | Card de animal, formulario, status updater e acesso admin | `apps/web/src/components`, `packages/ui` |
| Conteudo | Textos, links e imagem principal centralizados para edicao por PR | `packages/shared/src/site-content.ts` |
| API | CRUD inicial de animais e health check | `apps/api/src/animals`, `apps/api/src/health.controller.ts` |
| Dominio | Entidade `Animal`, enums e validacoes basicas | `packages/domain/src/animal.ts` |
| Dados | Prisma/PostgreSQL, SQLite opcional e seed | `apps/api/prisma` |
| Docker | Web, API e Postgres em Compose | `docker-compose.yml`, `apps/*/Dockerfile` |
| Evidencias | Registro ArcAssist-Web do incremento | `docs/15-prototipo-1-arcassist-web` |

## O que ainda falta

Ainda nao foi implementado:

- autenticacao real;
- permissoes por perfil;
- auditoria administrativa;
- upload de imagem;
- filtros avancados de animais;
- fluxo completo de adocao;
- registro persistente de interesse;
- experiencia estilo Tinder;
- painel administrativo para editar textos e imagens do portal;
- doacoes e apadrinhamento;
- campanhas e parcerias;
- dashboard e relatorios.

## Roteiro sugerido para a reuniao

1. Abrir a tela inicial e explicar o objetivo do Prototipo 1.
2. Passar por Sobre e Contato para validar o portal institucional.
3. Abrir a listagem e o detalhe de um animal.
4. Entrar no admin com `anjos2026`.
5. Cadastrar ou editar um animal de exemplo.
6. Alterar o status de um animal.
7. Registrar feedbacks em `docs/06-validacoes.md`.
8. Decidir prioridades para o Prototipo 2.

## Evidencias ja registradas

- Build Docker das imagens `api` e `web`.
- Execucao com PostgreSQL, API e Web.
- API validada via `/health`.
- Seed validado com 3 animais: Luna, Bento e Mel.
- Web validada com resposta HTTP 200 dentro do container.
- Registro em `docs/15-prototipo-1-arcassist-web/run-log.md`.
