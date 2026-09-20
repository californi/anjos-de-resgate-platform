# Prototipo 3 - Doacoes e Apoios

## Marco

- Marco planejado: agosto de 2026.
- Implementacao registrada: 18/09/2026.
- Baseline: commit `b792d11`, finalizacao do Prototipo 2.

## Preocupacao de evolucao

Adicionar upload de foto e contato por e-mail, seguidos por doacao geral,
campanhas, apadrinhamento, necessidades por animal, doadores, historico e Pix,
sem antecipar processamento financeiro ou expor dados pessoais publicamente.

## Evidencias de entrada

- Escopo e backlog dos prototipos anteriores.
- Entidades `Animal` e `AdoptionInterest`.
- Separacao interface, aplicacao, dominio e infraestrutura.
- Docker com Web, API e PostgreSQL.
- ADRs 001 a 008.
- Feedback da reuniao sobre upload e contato.
- Tabela de escopo do Prototipo 3 fornecida pelo projeto.

## Decisoes aplicadas

- Upload local com validacao e volume persistente: ADR-009.
- E-mail por SMTP e Mailpit na demonstracao: ADR-010.
- Quatro destinos de apoio e confirmacao humana: ADR-011.
- Valores monetarios persistidos em centavos.
- Progresso calculado somente com apoios confirmados.
- Pix apenas informativo; sem gateway ou credenciais bancarias.

## Artefatos produzidos

- Dominio: `packages/domain/src/support.ts`.
- Aplicacao/API: `apps/api/src/support`, `contact` e `uploads`.
- Infraestrutura: modelos Prisma, volume de uploads e Mailpit.
- Interface publica: `/apoie` e formulario de contato.
- Interface administrativa: `/admin/apoios`.
- Diagrama: `diagrams/fluxo-apoio-financeiro.mmd`.
- Prompt reutilizavel: `prompts/inclusao-prototipo-3-apoios.md`.

## Limites e riscos

- O acesso administrativo ainda e simulado.
- O fluxo nao comprova Pix automaticamente.
- Dados reais de doadores exigem adequacao de privacidade e seguranca.
- O storage local de imagens e adequado ao prototipo, nao a uma implantacao
  publica escalavel.
- E-mail externo depende de configuracao SMTP autorizada.

