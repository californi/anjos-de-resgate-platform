# ADR-002 - Separacao entre frontend, backend, dominio e infraestrutura

## Status

Aceita.

## Contexto

O projeto devera crescer para varios modulos, incluindo adocao, doacoes, apadrinhamento, parcerias e dashboard.

## Decisao

Organizar o monorepo com `apps/web`, `apps/api`, `packages/domain`, `packages/shared` e `packages/ui`.

## Consequencias

- Dominio fica menos acoplado a frameworks.
- Frontend e backend podem evoluir com contratos claros.
- Reuso de componentes e labels fica mais simples.
- A disciplina de build dos pacotes deve ser mantida.
