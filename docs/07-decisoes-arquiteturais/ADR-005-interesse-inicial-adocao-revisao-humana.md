# ADR-005 - Interesse inicial em adocao com revisao humana

## Status

Aceita para o Prototipo 2.1. Parcialmente revisada pela ADR-007 quanto a regra
de elegibilidade do interesse.

## Contexto

O proximo passo incremental do projeto e permitir que uma pessoa manifeste
interesse em um animal a partir do perfil publico. Essa demanda parece simples,
mas cruza dados publicos do animal, dados privados da pessoa interessada,
persistencia, API e rotina administrativa da equipe.

Os artigos ArcAssist-Web usados como base do projeto reforcam que uma mudanca
Web/PWA deve ser relacionada a baseline, contexto Web/dominio, evidencias,
validacao e revisao humana. Tambem reforcam que a assistencia por IA deve
preparar material de decisao, nao aceitar decisoes automaticamente.

## Decisao

Implementar um incremento minimo de `AdoptionInterest`:

- formulario publico no detalhe de animal;
- API `POST /adoption-interests`;
- persistencia de interesse vinculado ao animal;
- status inicial `RECEIVED`;
- listagem administrativa dos interesses recebidos;
- regra de aplicacao: apenas animais `AVAILABLE` podem receber interesse.

O registro de interesse nao altera automaticamente o status do animal e nao
conclui nenhuma etapa de adocao. A equipe deve revisar o interesse antes de
decidir contato, triagem ou abertura de processo de adocao.

## Consequencias

- O prototipo passa a validar uma primeira jornada publica de adocao.
- A arquitetura ganha uma entidade pequena para um conceito de dominio real,
  sem antecipar cadastro completo de adotantes.
- Dados pessoais passam a existir no modelo; por isso, validacoes devem usar
  dados ficticios ate que autenticacao, permissoes, consentimento, politicas de
  privacidade e auditoria sejam implementados.
- O modulo preserva separacao entre interface, aplicacao, dominio e
  infraestrutura.
- A experiencia Tinder/swipe, triagem, notificacoes e mudancas automaticas de
  status continuam fora do escopo.

## Evidencias

- `packages/domain/src/adoption-interest.ts`
- `apps/api/src/adoption-interests`
- `apps/api/prisma/schema.prisma`
- `apps/web/src/components/AdoptionInterestForm.tsx`
- `apps/web/src/components/AdoptionInterestsList.tsx`
- `diagrams/fluxo-interesse-adocao.mmd`
- `docs/21-prototipo-2-interesse-adocao/`
