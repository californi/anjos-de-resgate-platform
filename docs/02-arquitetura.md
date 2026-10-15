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
- `AnimalFeed` como visualizacao publica compacta para muitos animais.
- `AdminAnimalsInventory` como visualizacao administrativa compacta.
- Contagem administrativa de interesses por animal derivada na Web a partir da
  lista de `AdoptionInterest`.
- Rotas administrativas separadas para inventario, cadastro e edicao de
  animais.

O feed publico usa tiles quadrados de midia para preparar a interface para
dezenas de animais e para uma possivel evolucao futura com videos. O Prototipo 3
adicionou upload local de imagens; videos reais, storage externo, paginacao e
filtros avancados ainda nao foram implementados.

## Modulo de interesses de adocao

O incremento Prototipo 2.1 adiciona um modulo pequeno para registrar interesse
inicial em adocao:

- Entidade `AdoptionInterest` no dominio.
- DTOs de criacao e atualizacao de status na API.
- `AdoptionInterestsService` como camada de aplicacao.
- `AdoptionInterestsRepository` como contrato.
- `PrismaAdoptionInterestsRepository` como infraestrutura principal.
- `InMemoryAdoptionInterestsRepository` para testes e prototipo sem banco.
- Formulario publico no detalhe do animal.
- Tela administrativa propria para solicitacoes de interesse.
- Resumo administrativo de quantidade de interesses por animal.

A regra de aplicacao atual bloqueia interesse apenas quando o animal esta em
`IN_ADOPTION_PROCESS`. O registro nao altera automaticamente o status do animal
e nao conclui nenhuma etapa de adocao.

No prototipo atual, a contagem de interesses exibida no inventario admin e uma
agregacao de interface. Ela reutiliza a consulta de solicitacoes existente e
nao introduz endpoint agregado ou relatorio dedicado.

## Ambientacao

O projeto pode ser executado localmente de duas formas:

- Ambiente de desenvolvimento com Node.js, API e Web em processos locais.
- Ambiente Docker com PostgreSQL, API NestJS e Web Next.js.

No Docker, a Web usa `API_INTERNAL_URL` para chamadas server-side entre containers e `NEXT_PUBLIC_API_URL` para chamadas feitas pelo navegador. Essa separacao evita que a renderizacao server-side da Web dependa de `localhost` dentro do container.

O Compose de demonstracao publica Web, API, PostgreSQL e Mailpit somente em
`127.0.0.1`. Essa contencao evita exposicao acidental na rede local, mas nao
substitui autenticacao, autorizacao ou limitacao de requisicoes. O ambiente nao
deve ser exposto na Internet nem receber dados reais.

Uma configuracao separada publica uma demo remota no Render. Nela, Next.js e
NestJS executam no mesmo container, a API permanece interna e a Web encaminha
`/api/*`. A demo exige credencial HTTP compartilhada, usa repositorios em
memoria e aceita somente dados ficticios. O desenho reduz custo e superficie
exposta, mas nao representa a topologia operacional futura. Consulte o
[guia de publicacao](25-publicacao-demo-e-cicd.md) e a ADR-013.

## Modulos futuros

Os modulos de adocao completa, adotantes, parcerias, dashboard,
usuarios/permissoes, gestao administrativa de conteudo e relatorios devem ser
adicionados incrementalmente, com ADRs quando introduzirem novas decisoes
relevantes.

## Modulo de doacoes e apoios

O Prototipo 3 adiciona um modulo coeso de apoio financeiro:

- dominio independente com `Campaign`, `AnimalNeed`, `Donor` e `SupportRecord`;
- `SupportService` para validar destino, vinculos e confirmacao;
- `SupportRepository` com implementacoes Prisma e em memoria;
- API para campanhas, necessidades, doadores e historico;
- pagina publica `/apoie`;
- pagina administrativa `/admin/apoios`;
- progresso calculado somente a partir de apoios `CONFIRMED`.

O modulo registra intencoes e confirmacoes. O Pix e informativo; nao existe
processamento automatico nem acesso a conta bancaria.

## Upload e contato

- `UploadsModule` valida e persiste imagens em diretorio/volume configuravel.
- `ContactModule` valida mensagens e as encaminha por SMTP.
- O Docker inclui Mailpit apenas para demonstracao local do envio.

## Decisoes iniciais

- Web/PWA antes de app nativo.
- Monorepo com separacao entre frontend, backend, dominio e infraestrutura.
- Documentacao versionada com ADRs, Mermaid e prompts.
- PostgreSQL como alvo arquitetural, com SQLite e memoria como alternativas de prototipo.
- Conteudo do portal centralizado em arquivo compartilhado nesta fase, com
  evolucao futura para gestao administrativa.
- Feed compacto para muitos animais, com suporte visual a midias quadradas e
  videos reais adiados para decisao futura.
- Upload local de imagens com limite e volume persistente no prototipo.
- Contato desacoplado por SMTP, com Mailpit no ambiente de demonstracao.
- Apoios registrados antes da confirmacao humana, sem antecipar gateway.
- Portas do Compose restritas ao host local enquanto o acesso administrativo e
  os endpoints permanecem proprios de prototipo.
- Demo remota protegida, efemera e alimentada apenas por dados ficticios, com
  CI/CD apos validacao automatizada.
