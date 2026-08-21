# Prototipo 2.1 - Interesse Inicial em Adocao

## Objetivo

Validar a primeira parte do fluxo de adocao: uma pessoa visitante registra
interesse em um animal que nao esteja em processo de adocao, e a equipe
visualiza esse interesse no painel administrativo para revisao.

## Baseline usada

- Portal publico com listagem e detalhe de animais.
- API de animais.
- Painel administrativo com acesso simulado.
- PostgreSQL/Prisma no Docker.
- Conteudo e labels compartilhados.
- ADRs e diagramas existentes.

## Escopo implementado

- Entidade de dominio `AdoptionInterest`.
- Status `RECEIVED`, `CONTACTED` e `ARCHIVED`.
- Feed publico compacto de animais com tiles quadrados.
- Seed de demonstracao ampliado para dezenas de animais ficticios.
- Inventario administrativo compacto para muitos animais.
- Telas administrativas separadas para inventario, cadastro, edicao e
  solicitacoes de interesse.
- Quantidade de interesses exibida no resumo de cada animal no inventario
  administrativo.
- Modelo Prisma `AdoptionInterest`.
- API:
  - `GET /adoption-interests`
  - `GET /adoption-interests/animal/:animalId`
  - `POST /adoption-interests`
  - `PATCH /adoption-interests/:id/status`
- Formulario publico no detalhe do animal.
- Listagem administrativa dos interesses recebidos, com quantidade por animal.
- Testes de service para aceitar interesse em animal em tratamento e rejeitar
  animal em processo de adocao.

## Execucao para validacao

Na raiz do projeto:

```bash
sh scripts/docker-prototype.sh up
```

Depois, valide o fluxo em `http://localhost:3000/animais/demo-mel` e confira o
registro administrativo em `http://localhost:3000/admin/animais/interesses`.

## Fora do escopo

- Autenticacao real.
- Permissoes por perfil.
- Consentimento formal/LGPD.
- Upload e gestao real de videos.
- Paginacao, busca e filtros avancados.
- Cadastro completo de adotantes.
- Triagem.
- Swipe/Tinder.
- Notificacoes.
- Mudanca automatica de status do animal.
- Decisao automatica de adocao.

## Regra central

Um interesse publico so fica bloqueado quando o animal esta
`IN_ADOPTION_PROCESS`. O interesse nasce como `RECEIVED` e deve ser avaliado
pela equipe.

## Relacao com ArcAssist-Web

O incremento instancia os elementos usados nos artigos de apoio:

- **Interaction:** visitante navega por um feed com muitos animais e aciona
  `Tenho interesse`.
- **Web-System and Domain Context:** fronteira entre perfil publico, dados
  privados do interessado e revisao administrativa.
- **Context and Knowledge:** baseline de animais, ADRs e backlog.
- **Prompt/decision preparation:** incremento restrito para evitar antecipar
  adocao completa.
- **Validation and QA:** testes da regra de bloqueio em
  `IN_ADOPTION_PROCESS` e checagens TypeScript.
- **Knowledge Management:** ADR-005 registra o interesse com revisao humana;
  ADR-006 registra o feed compacto para muitos animais; ADR-007 registra a nova
  regra de elegibilidade e as telas administrativas separadas; ADR-008 registra
  a contagem de interesses no inventario administrativo; diagramas, manifesto e
  run log preservam a rastreabilidade.

## Limitacao de validacao

Como ainda nao ha autenticacao, permissoes ou politica de privacidade no
prototipo, validacoes devem usar apenas dados ficticios.
