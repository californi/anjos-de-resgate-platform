# Execucao do Prototipo com Docker

Este guia descreve como executar o prototipo atual da Plataforma Anjos de
Resgate com Docker Compose. Ele cobre o portal publico, administracao inicial
de animais, interesse em adocao, upload, contato e doacoes/apoios.

## O que sera executado

- `postgres`: banco PostgreSQL do prototipo.
- `api`: API NestJS com modulos de animais e interesses iniciais de adocao.
- `web`: frontend Next.js/PWA.
- `mailpit`: servidor SMTP e caixa de e-mail apenas para demonstracao local.

## Pre-requisitos

- Docker Desktop instalado e em execucao.
- Portas locais livres:
  - `3000` para a Web.
  - `3333` para a API.
  - `5432` para o PostgreSQL.
  - `8025` para visualizar e-mails locais.

## Subir o ambiente

Na raiz do projeto:

```bash
sh scripts/docker-prototype.sh up
```

O primeiro build pode demorar porque instala dependencias Node.js dentro das
imagens. O script sobe os servicos em segundo plano, aguarda API/Web
responderem e mostra os enderecos de acesso.

Se preferir usar Docker Compose diretamente:

```bash
docker compose -p anjos-de-resgate up --build
```

## Acessar

- Web: `http://localhost:3000`
- API: `http://localhost:3333`
- Health check: `http://localhost:3333/health`
- Admin: `http://localhost:3000/admin/animais`
- Cadastro: `http://localhost:3000/admin/animais/cadastro`
- Solicitacoes: `http://localhost:3000/admin/animais/interesses`
- Apoios: `http://localhost:3000/apoie`
- Administracao de apoios: `http://localhost:3000/admin/apoios`
- E-mails enviados: `http://localhost:8025`

Codigo administrativo simulado:

```text
anjos2026
```

Esse codigo existe apenas para validacao do prototipo. Ele nao substitui autenticacao real.

## Dados iniciais

Ao iniciar a API pelo Docker Compose, o container executa:

```bash
pnpm --filter @anjos/api db:push
pnpm --filter @anjos/api db:seed
```

Isso cria a estrutura do banco e insere animais, campanhas, necessidades e um
apoio ficticio de demonstracao.

Se voce executou uma versao anterior do prototipo com o nome tecnico antigo,
recrie o ambiente local para evitar conflito entre bancos e containers:

```bash
docker compose down --remove-orphans
docker compose up --build
```

Em ambiente apenas de teste, `docker compose down -v` tambem pode ser usado
para apagar o banco local e recriar tudo do zero.

## Verificacao rapida

1. Abra `http://localhost:3333/health`.
2. Confirme que a resposta contem `status: ok`.
3. Abra `http://localhost:3000/animais`.
4. Confirme que a lista mostra os animais iniciais.
5. Abra um animal disponivel, por exemplo `http://localhost:3000/animais/demo-mel`.
6. Preencha o formulario `Tenho interesse` com dados ficticios.
7. Confirme a mensagem de interesse registrado.
8. Abra `http://localhost:3000/admin/animais`.
9. Entre com o codigo `anjos2026`.
10. Abra `http://localhost:3000/admin/animais/interesses`.
11. Confirme que o interesse recebido aparece na area administrativa e que a
    quantidade por animal foi atualizada.
12. Abra `http://localhost:3000/admin/animais/cadastro` e cadastre um animal.
13. Edite um animal pela acao `Editar` no inventario.
14. Altere o status no seletor administrativo.
15. Selecione uma foto do dispositivo no cadastro de animal.
16. Envie uma mensagem em `http://localhost:3000/contato` e confira no Mailpit.
17. Registre um apoio em `http://localhost:3000/apoie`.
18. Abra `http://localhost:3000/admin/apoios` e confirme o apoio.

Regra importante: o interesse publico so fica bloqueado quando o animal esta em
`IN_ADOPTION_PROCESS`. Animais em tratamento podem receber manifestacao de
interesse para avaliacao futura da equipe.

## Comandos do script

```bash
sh scripts/docker-prototype.sh up
sh scripts/docker-prototype.sh status
sh scripts/docker-prototype.sh logs
sh scripts/docker-prototype.sh down
sh scripts/docker-prototype.sh reset
```

- `up`: constroi imagens, sobe containers, aplica schema, roda seed e aguarda
  Web/API.
- `status`: mostra o estado dos servicos.
- `logs`: mostra os logs recentes da API, Web e Mailpit.
- `down`: para os containers sem apagar o banco local.
- `reset`: apaga os volumes locais do PostgreSQL e das imagens e recria o
  ambiente do zero.

## Configuracao de e-mail, Pix e imagens

No Docker, as mensagens sao capturadas pelo Mailpit e nao saem do computador.
Para SMTP real, configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`,
`SMTP_PASSWORD`, `SMTP_FROM` e `CONTACT_TO` fora do repositorio.

Substitua `PIX_KEY` e `PIX_RECIPIENT` apenas depois da autorizacao da ONG. O
prototipo exibe esses dados, mas nao processa nem confirma pagamentos.

As imagens enviadas ficam no volume `uploads_data` e sobrevivem ao comando
`down`. O comando `reset` remove esse volume.

## Encerrar

```bash
sh scripts/docker-prototype.sh down
```

Para remover tambem o volume do banco:

```bash
sh scripts/docker-prototype.sh reset
```

Use `reset` apenas quando quiser apagar os dados locais do prototipo.

## Troubleshooting

### Conflito de container ou porta ocupada

Se aparecer erro informando que um container como
`anjos-de-resgate-postgres` ja existe, ou que as portas `3000`, `3333` ou
`5432` ja estao em uso, encerre a execucao anterior antes de subir a nova:

```bash
sh scripts/docker-prototype.sh down
sh scripts/docker-prototype.sh up
```

Se a execucao anterior veio de outra pasta, abra essa pasta antiga no terminal
e rode `docker compose down --remove-orphans` nela, ou remova os containers pela
interface do Docker Desktop. Nao use `down -v` se quiser preservar os dados
locais do banco.

Em novas versoes do projeto, o `docker-compose.yml` evita nomes fixos de
container para reduzir conflitos entre copias locais do repositorio.

### Web mostra dados de demonstracao

A Web mostra dados demo quando a API nao responde. Verifique:

- se `api` esta de pe no Docker Compose;
- se `http://localhost:3333/health` responde;
- se `API_INTERNAL_URL` no servico `web` aponta para `http://api:3333`;
- se `NEXT_PUBLIC_API_URL` aponta para `http://localhost:3333`.

### Banco sem dados

Recrie a base local:

```bash
docker compose down -v
docker compose up --build
```

## Evidencias para validacao

Durante a validacao quinzenal, registre:

- data e versao avaliada;
- comando usado para executar;
- prints das telas principais;
- erros encontrados;
- campos que a ONG pediu para incluir, remover ou renomear;
- decisoes tomadas antes de avancar para o fluxo de adocao.
