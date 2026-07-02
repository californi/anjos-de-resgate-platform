# Estrutura para Repositorio GitHub Colaborativo

Este documento descreve a organizacao recomendada para publicar a Plataforma
Anjos de Resgate em um repositorio GitHub enxuto, preparado para validacao e
contribuicoes externas.

## Objetivo do repositorio

Permitir que pessoas convidadas possam:

- executar o prototipo localmente;
- validar telas e fluxos;
- registrar problemas e sugestoes;
- propor pequenas melhorias por Pull Request;
- acompanhar o que ja foi implementado e o que ainda esta planejado.

## Nome sugerido

```text
anjos-de-resgate-platform
```

Se o repositorio for usado principalmente para validacao, uma alternativa e:

```text
anjos-de-resgate-prototipo
```

## Estrutura principal

```text
.
├── README.md
├── VALIDATION.md
├── CONTRIBUTING.md
├── docker-compose.yml
├── apps/
│   ├── web/
│   └── api/
├── packages/
│   ├── domain/
│   ├── shared/
│   └── ui/
├── docs/
│   ├── 06-validacoes.md
│   ├── 16-execucao-prototipo-docker.md
│   ├── 17-funcionalidades-implementadas.md
│   ├── 18-prints-telas-prototipo-1.md
│   ├── 19-repositorio-github-colaborativo.md
│   └── 20-gestao-de-conteudo.md
├── diagrams/
├── prompts/
└── .github/
    ├── ISSUE_TEMPLATE/
    └── pull_request_template.md
```

## Arquivos de entrada para colaboradores

| Arquivo | Para que serve |
|---|---|
| `README.md` | Apresenta o projeto, stack, execucao e escopo |
| `VALIDATION.md` | Guia rapido para testar e registrar feedback |
| `CONTRIBUTING.md` | Regras para abrir Issues, branches e Pull Requests |
| `docs/17-funcionalidades-implementadas.md` | Guia visual da reuniao de validacao |
| `docs/18-prints-telas-prototipo-1.md` | Galeria de prints das telas atuais |
| `docs/20-gestao-de-conteudo.md` | Como alterar textos e imagens do portal |
| `packages/shared/src/site-content.ts` | Fonte central dos textos, links e imagem principal |
| `scripts/capture-prototype-screenshots.mjs` | Regenera os prints do prototipo com Chrome headless |
| `.github/ISSUE_TEMPLATE/*` | Formularios padronizados de feedback |
| `.github/ISSUE_TEMPLATE/ajuste-conteudo.yml` | Sugestao estruturada de textos, links, canais e imagens |
| `.github/pull_request_template.md` | Checklist para mudancas propostas |

## Configuracao recomendada no GitHub

1. Criar o repositorio.
2. Subir somente a estrutura versionavel do projeto.
3. Manter Issues habilitadas.
4. Opcionalmente habilitar Discussions para conversas abertas.
5. Criar labels iniciais:
   - `validacao`
   - `melhoria`
   - `bug`
   - `documentacao`
   - `frontend`
   - `backend`
   - `prioridade-alta`
6. Proteger a branch `main`, exigindo Pull Request antes de merge.
7. Convidar validadores como colaboradores ou orientar uso por fork.

## O que nao deve ir para o repositorio

- `node_modules/`
- `.pnpm-store/`
- `.env` ou credenciais locais
- bancos locais SQLite
- outputs intermediarios de artigo
- zips gerados
- dados pessoais reais
- historico de validacao com informacoes sensiveis

Esses itens estao cobertos pelo `.gitignore` preparado para a publicacao.

## Fluxo de validacao recomendado

1. Pessoa validadora executa `docker compose up --build`.
2. Segue o roteiro de `VALIDATION.md`.
3. Abre uma Issue do tipo `Validacao funcional`, `Sugestao de melhoria`,
   `Ajuste de conteudo` ou `Problema tecnico`.
4. A equipe triageia a Issue e define se entra no proximo incremento.
5. Caso a solucao seja simples, alguem abre um Pull Request.
6. O PR referencia a Issue e descreve como validar a mudanca.

## Politica de escopo

Pequenas correcoes podem ir direto por Pull Request. Mudancas que alteram
escopo, arquitetura ou regras de negocio devem primeiro ser discutidas em uma
Issue.

Exemplos que exigem alinhamento previo:

- fluxo completo de adocao;
- autenticacao real;
- permissoes por perfil;
- doacoes;
- apadrinhamento;
- campanhas;
- parcerias;
- dashboard e relatorios.
- painel administrativo de conteudo.

## Privacidade

Durante validacoes, use somente dados ficticios. Nao registre no GitHub nomes,
telefones, enderecos, documentos, conversas privadas ou qualquer dado real de
adotantes, voluntarios, doadores ou responsaveis por animais.
