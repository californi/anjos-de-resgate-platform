# ADR-011 - Apoio financeiro com destinos explicitos e confirmacao humana

## Status

Aceita em 2026-09-18 para o Prototipo 3.

## Contexto

O Prototipo 3 deve organizar doacao geral, campanhas, apadrinhamento,
necessidades por animal, doadores, historico e informacoes de Pix. Processar
pagamentos agora introduziria credenciais financeiras, conciliacao, estorno,
seguranca e integracao com provedores ainda nao definidos.

## Decisao

Modelar quatro destinos de apoio: `GENERAL`, `CAMPAIGN`, `SPONSORSHIP` e
`ANIMAL_NEED`. Um `SupportRecord` pertence a um `Donor`, registra valor,
frequencia, destino e status. O registro inicia como `PLEDGED`; somente a equipe
altera para `CONFIRMED` depois de conferir o recebimento.

Campanhas e necessidades sao entidades administraveis. As informacoes de Pix
sao configuracao informativa do ambiente. O prototipo nao acessa conta bancaria,
nao gera cobranca e nao afirma que um Pix foi pago automaticamente.

## Consequencias

- Um unico historico atende apoio geral e direcionado sem misturar seus alvos.
- Metas publicas consideram apenas registros confirmados.
- Dados de doadores ficam restritos a tela administrativa simulada, mas a API
  ainda nao possui autenticacao real.
- Antes de uso publico, sao obrigatorios autenticacao, autorizacao, LGPD,
  auditoria e definicao de conciliacao financeira.
- Integracao com gateway permanece fora de escopo ate decisao especifica.

## Evidencias

- `packages/domain/src/support.ts`
- `apps/api/src/support`
- `apps/web/src/app/apoie`
- `apps/web/src/app/admin/apoios`
- `diagrams/fluxo-apoio-financeiro.mmd`
