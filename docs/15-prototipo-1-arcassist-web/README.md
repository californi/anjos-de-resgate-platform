# ArcAssist-Web - Prototipo 1

Este diretorio registra evidencias do incremento do Prototipo 1 da Plataforma Anjos de Resgate.

## Baseline Architecture

- Web/PWA em Next.js.
- API NestJS.
- Dominio compartilhado em `packages/domain`.
- Labels e dados demo em `packages/shared`.
- Componentes reutilizaveis em `packages/ui`.
- Modulo implementado: `Animals`.

## Evolution Concern

Preparar o Prototipo 1 para validacao em 01/07/2026, adicionando portal institucional, contato, edicao administrativa de animais, login administrativo simulado e execucao com Docker, sem antecipar os modulos de adocao, doacoes, apadrinhamento, campanhas ou dashboard.

## Web and Domain Evidence

- Cronograma: `ProjetoONG-CronogramaEMarcos-2026.pdf`.
- Escopo funcional: `docs/01-escopo-funcional.md`.
- Arquitetura: `docs/02-arquitetura.md`.
- Backlog incremental: `docs/03-backlog-incremental.md`.
- Prototipos: `docs/05-prototipos.md`.
- Validacoes quinzenais: `docs/06-validacoes.md`.
- ADR-001, ADR-002 e ADR-003.
- Codigo do modulo `Animals` em `apps/api`, `apps/web` e `packages`.

## Responsibilities Exercised

1. `Interaction`: identificar o marco R2 e o escopo esperado do Prototipo 1.
2. `Web-System and Domain Context`: separar portal publico, contato e admin de animais.
3. `Context and Knowledge`: consultar README, docs, ADRs, diagramas e codigo existente.
4. `Prompt Orchestration`: orientar a mudanca para incremento pequeno, rastreavel e sem overengineering.
5. `LLM Reasoning`: propor alternativas simples para admin simulado, edicao e Docker.
6. `Validation and QA`: revisar estaticamente camadas, rotas, contratos e documentacao.
7. `Knowledge Management`: atualizar docs, Docker, README e evidencias deste diretorio.

## Decision Package

Ver `decision-package.md`.

## Evidence Manifest

Ver `evidence-manifest.json`.

## Run Log

Ver `run-log.md`.
