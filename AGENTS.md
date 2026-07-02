# AGENTS.md

Este repositorio abriga a Plataforma Anjos de Resgate. Agentes de IA devem tratar o projeto como uma base incremental, com foco em entregas quinzenais, rastreabilidade arquitetural e simplicidade.

## Objetivo

Construir uma plataforma Web/PWA para apoiar a ONG Anjos de Resgate em divulgacao de animais, adocao, doacoes, apadrinhamento, campanhas, parcerias e gestao interna.

## Diretrizes arquiteturais

- Separar interface, aplicacao, dominio e infraestrutura.
- Preservar baixo acoplamento e alta coesao.
- Implementar apenas o necessario para a iteracao atual.
- Usar Repository Pattern quando houver acesso a dados.
- Usar Service Layer ou Use Cases para regras de aplicacao.
- Manter entidades de dominio independentes de Prisma, Nest ou Next.
- Registrar decisoes relevantes em ADRs.
- Atualizar docs, diagramas e prompts quando modulos evoluirem.

## Regras para codigo

- Preferir TypeScript estrito.
- Reaproveitar `packages/domain`, `packages/shared` e `packages/ui`.
- Evitar duplicacao de enums e labels.
- Validar entrada na API.
- Evitar overengineering e modulos vazios sem funcao clara.
- Criar testes proporcionais ao risco da mudanca.

## Regras para documentacao

- Atualizar `docs/01-escopo-funcional.md` ao incluir ou remover funcionalidades.
- Atualizar `docs/02-arquitetura.md` quando a estrutura tecnica mudar.
- Registrar decisoes permanentes em `docs/07-decisoes-arquiteturais/`.
- Atualizar diagramas em `diagrams/` quando fluxos ou dependencias mudarem.
- Manter prompts em `prompts/` genericos e reutilizaveis.

## Padroes permitidos nesta fase

- Repository Pattern.
- Service Layer.
- DTOs.
- Component Pattern.
- ADR.
- Mermaid para diagramas.

Nao introduza CQRS, event sourcing, microservicos, filas ou arquiteturas distribuidas sem uma decisao explicita e documentada.
