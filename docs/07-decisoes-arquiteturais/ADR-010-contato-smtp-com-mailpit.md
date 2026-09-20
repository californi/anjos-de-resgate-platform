# ADR-010 - Contato por SMTP com Mailpit na demonstracao

## Status

Aceita em 2026-09-18 para o Prototipo 3.

## Contexto

A pagina de contato exibia um formulario desabilitado. O feedback da reuniao
solicitou que a pessoa informe seu e-mail e que a mensagem seja encaminhada a
ONG.

## Decisao

Implementar `POST /contact-messages` e enviar a mensagem por SMTP. Nome, e-mail
e mensagem sao validados na API; o e-mail informado e usado como `reply-to`.

O Docker usa Mailpit para capturar mensagens em ambiente local. A caixa pode ser
consultada em `http://localhost:8025`, sem credenciais pessoais. Em ambiente
autorizado, as variaveis SMTP podem apontar para o provedor definido pela ONG.

## Consequencias

- O fluxo pode ser demonstrado de ponta a ponta sem enviar mensagens externas.
- A aplicacao nao armazena mensagens de contato no banco nesta iteracao.
- A configuracao de producao depende de credenciais SMTP mantidas fora do Git.
- Antes de uso publico, devem ser definidos antispam, limites, privacidade e
  politica de retencao.

## Evidencias

- `apps/api/src/contact`
- `apps/web/src/components/ContactForm.tsx`
- `docker-compose.yml`

