# ADR-007 - Elegibilidade de interesse e telas administrativas separadas

## Status

Aceita em 2026-08-20.

## Contexto

A validacao do Prototipo 2.1 indicou dois ajustes na experiencia de adocao e
gestao:

- a acao `Tenho interesse` nao deve ser bloqueada apenas porque o animal ainda
  nao esta `AVAILABLE`;
- o painel administrativo misturava inventario, cadastro, edicao e
  solicitacoes de interesse na mesma tela.

Na pratica, a ONG pode querer receber interesse em animais ainda em tratamento
para organizar contato futuro. Por outro lado, quando um animal ja esta em
processo de adocao, receber novos interesses pode gerar duplicidade de
expectativa e trabalho administrativo.

## Decisao

Alterar a regra de elegibilidade do interesse inicial:

- permitir registro de interesse para animais que nao estejam em
  `IN_ADOPTION_PROCESS`;
- bloquear o registro apenas quando o animal estiver em
  `IN_ADOPTION_PROCESS`;
- manter o registro como manifestacao inicial, sem mudar automaticamente o
  status do animal.

Separar a gestao administrativa em telas distintas:

- `/admin/animais`: inventario compacto e alteracao de status;
- `/admin/animais/cadastro`: cadastro de novo animal;
- `/admin/animais/[id]/editar`: edicao de um animal existente;
- `/admin/animais/interesses`: visualizacao de solicitacoes e quantidade de
  interesses por animal.

## Consequencias

- A regra fica mais aderente ao uso real esperado pela ONG, permitindo captar
  demanda antes de o animal estar totalmente liberado.
- A tela administrativa reduz mistura de responsabilidades e melhora a leitura
  para validacao.
- A quantidade de interesses por animal passa a apoiar priorizacao de contato e
  revisao da equipe.
- A regra para animais `ADOPTED` ainda deve ser validada em reuniao. Nesta
  iteracao, o bloqueio explicito foi aplicado apenas a
  `IN_ADOPTION_PROCESS`, conforme solicitado.
- Autenticacao, permissoes, auditoria, privacidade formal e fluxo completo de
  adocao continuam fora do escopo.

## Evidencias

- `apps/api/src/adoption-interests/adoption-interests.service.ts`
- `apps/web/src/components/AdoptionInterestForm.tsx`
- `apps/web/src/app/admin/animais`
- `apps/web/src/components/AdoptionInterestsList.tsx`
- `docs/21-prototipo-2-interesse-adocao/`
