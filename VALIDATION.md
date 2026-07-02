# Guia de Validacao Colaborativa

Este guia orienta pessoas que desejam testar o prototipo, registrar problemas
ou sugerir melhorias pela interface do GitHub.

## O que validar nesta versao

O foco atual e o Prototipo 1 da Plataforma Anjos de Resgate:

- portal inicial;
- pagina sobre a ONG;
- pagina de contato;
- listagem publica de animais;
- detalhe de animal;
- acesso administrativo simulado;
- cadastro, edicao e alteracao de status de animais;
- execucao local com Docker Compose.

Funcionalidades ainda fora do escopo: autenticacao real, fluxo completo de
adocao, doacoes, apadrinhamento, campanhas, parcerias, dashboard e relatorios.

## Como executar

Requisito: Docker Desktop instalado e em execucao.

```bash
docker compose up --build
```

Acesse:

- Portal: http://localhost:3000
- Admin: http://localhost:3000/admin/animais
- API: http://localhost:3333
- Health check: http://localhost:3333/health

Codigo administrativo simulado:

```text
anjos2026
```

## Roteiro rapido de validacao

1. Abrir a tela inicial e verificar se a proposta da plataforma fica clara.
2. Abrir `Sobre` e `Contato` e validar textos, informacoes e canais.
3. Abrir `Animais` e conferir se os cards mostram informacoes suficientes.
4. Abrir o detalhe de um animal e avaliar campos e chamada `Tenho interesse`.
5. Entrar no admin com `anjos2026`.
6. Cadastrar ou editar um animal de exemplo.
7. Alterar o status de um animal.
8. Registrar sugestoes ou problemas usando uma Issue do GitHub.

Prints de referencia: `docs/18-prints-telas-prototipo-1.md`.

## Como registrar feedback

Use uma Issue quando quiser relatar:

- problema visual ou funcional;
- texto confuso;
- campo faltando;
- melhoria de fluxo;
- sugestao de nova funcionalidade;
- duvida sobre comportamento esperado.

Ao abrir a Issue, informe:

- pagina ou funcionalidade avaliada;
- o que voce fez;
- o que esperava acontecer;
- o que aconteceu;
- impacto percebido na rotina da ONG;
- print, se ajudar.

## Como sugerir mudancas no codigo ou na documentacao

Abra um Pull Request quando a mudanca for concreta e pequena, por exemplo:

- ajuste de texto;
- melhoria visual pontual;
- correcao de documentacao;
- pequeno ajuste de formulario;
- teste automatizado;
- refatoracao simples sem alterar o escopo.

Antes de propor modulos grandes, como adocao completa ou doacoes, abra uma
Issue para alinhamento de escopo.

## Cuidados de privacidade

Nao registre dados pessoais reais de adotantes, voluntarios, doadores ou
responsaveis por animais. Use dados ficticios durante testes e prints.
