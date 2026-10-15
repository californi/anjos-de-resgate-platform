# Validacoes Quinzenais

Use este arquivo como registro continuo das validacoes com a ONG.

## Verificacao tecnica - 2026-10-15

Escopo: validar a configuracao de CI/CD e a imagem conjunta de Web e API antes
de criar recursos externos.

- `Dockerfile.deploy` construido com sucesso em Node.js 22 e pnpm 11.7.0.
- Type-check/lint passou nos cinco workspaces executaveis.
- 14 testes automatizados passaram: dominio (4), API (8) e UI (2).
- Container temporario iniciado em `127.0.0.1:3100`.
- `/healthz` retornou HTTP 200 e confirmou a API interna.
- pagina inicial sem credencial retornou HTTP 401.
- pagina inicial com credencial retornou HTTP 200.
- `/api/health` respondeu pelo proxy interno e `/api/animals` retornou 30
  animais ficticios.
- Container temporario removido apos a verificacao.

Este registro descreve somente o teste local inicial. A criacao posterior do
Blueprint, as falhas e os testes de correcao estao documentados no
[registro da implantacao](26-registro-implantacao-demo-2026-10-15.md).

## Template

```markdown
## Validacao - AAAA-MM-DD

### Participantes

- Nome / papel

### Prototipo avaliado

- Versao ou modulo

### Funcionalidades demonstradas

- Item

### Feedback recebido

- Item
- Issues relacionadas, quando houver.

### Decisoes tomadas

- Item

### Ajustes para proxima iteracao

- Item

### Evidencias

- Links, capturas, atas, diagramas ou arquivos
- Issues ou Pull Requests relacionados
```

## Validacao - 2026-06-17

### Participantes

- A preencher.

### Prototipo avaliado

- Prototipo inicial: portal e animais.

### Funcionalidades demonstradas

- A preencher apos reuniao.

### Feedback recebido

- A preencher apos reuniao.
- Registrar tambem como Issue no GitHub quando gerar ajuste rastreavel.

### Decisoes tomadas

- A preencher apos reuniao.

### Ajustes para proxima iteracao

- A preencher apos reuniao.

### Evidencias

- A preencher apos reuniao.

## Validacao - 2026-07-01

### Participantes

- A preencher.

### Prototipo avaliado

- Prototipo 1: portal institucional e gestao inicial de animais.

### Funcionalidades demonstradas

- Pagina inicial.
- Pagina sobre a ONG.
- Pagina de contato.
- Listagem e detalhe de animais.
- Acesso administrativo simulado.
- Cadastro, edicao e alteracao de status de animais.
- Execucao com Docker Compose.

### Feedback recebido

- A preencher apos reuniao.

### Decisoes tomadas

- A preencher apos reuniao.

### Ajustes para proxima iteracao

- A preencher apos reuniao.

### Evidencias

- Prints do portal e do admin.
- Registro de execucao do Docker.
- Observacoes da equipe sobre campos, textos e fluxo administrativo.
- Issues ou Pull Requests abertos a partir da validacao.

## Feedback preparatorio do Prototipo 3

### Origem

- Brainstorming da reuniao anterior, conforme registro do projeto.

### Feedback recebido

- Permitir selecionar foto a partir do armazenamento do dispositivo.
- Ativar formulario de contato com e-mail de retorno e encaminhamento para a
  ONG.
- Implementar doacoes gerais, campanhas, apadrinhamento, necessidades por
  animal, doadores, historico e informacoes de Pix.

### Decisoes tomadas

- ADR-009: upload local de imagens para o prototipo.
- ADR-010: contato por SMTP e Mailpit na demonstracao.
- ADR-011: registro de apoio com confirmacao humana e sem gateway.

### Evidencias

- `docs/22-prototipo-3-apoios/`.

## Validacao tecnica - 2026-10-15

### Ambiente avaliado

- Aplicacao completa iniciada com Docker Compose.
- PostgreSQL, Mailpit, API NestJS e frontend Next.js saudaveis.

### Verificacoes executadas

- Build de producao e analise estatica de todos os workspaces.
- Quatorze testes automatizados de dominio, aplicacao e interface.
- Respostas das paginas publicas e administrativas.
- Registro e atualizacao de interesse em adocao.
- Bloqueio de interesse para animal em processo de adocao.
- Registro de apoio geral, campanha, apadrinhamento e necessidade por animal,
  incluindo confirmacao humana e mudancas de estado.
- Upload e leitura de imagem PNG.
- Rejeicao de formato de imagem nao permitido.
- Validacao de entrada e envio de contato ao Mailpit, enderecado ao e-mail
  configurado para a ONG.
- Inspecao visual em 1440 px e 390 px das paginas publicas e administrativas.

### Ajuste identificado

- Corrigido o link de interesse dos cards destacados para abrir o perfil do
  animal. A interface agora exibe a acao como indisponivel apenas quando o
  animal esta em processo de adocao, em consistencia com a regra da API.
- O script de capturas aceita `SCREENSHOT_WIDTH`, permitindo repetir a
  inspecao visual em larguras desktop e movel.

### Limites confirmados

- O e-mail foi validado no servidor SMTP local Mailpit; entrega externa exige
  credenciais de um provedor SMTP real.
- O acesso administrativo continua simulado e nao protege os endpoints da API.
  Autenticacao e autorizacao permanecem necessarias antes da implantacao.

## Validacao de implantacao da demo - 2026-10-15

### Primeira tentativa

- O Render construiu a imagem do commit `5908aaf`, mas encerrou o container por
  exceder os 512 MiB da instancia gratuita antes da abertura da porta Web.
- O log mostrou dois processos `pnpm` revalidando dependencias durante o
  runtime. A contribuicao exata de cada processo para o estouro de memoria nao
  foi medida; o encerramento por falta de memoria foi confirmado pelo Render.

### Ajuste aplicado

- A API NestJS e a Web Next.js passaram a iniciar diretamente com Node, usando
  somente os artefatos produzidos no build da imagem.
- Foram definidos limites independentes de heap para API e Web, mantendo a
  arquitetura de um container com dois processos descrita no ADR-013.

### Teste local da correcao ja executado

- A imagem `anjos-de-resgate:render-fix` foi construida e iniciada localmente.
- `/healthz` retornou 200; a raiz retornou 401 sem credencial e 200 com
  credencial; o proxy respondeu em `/api/health` e listou 30 animais ficticios.
- Uma amostra de `docker stats` mostrou 119,7 MiB. O container desse teste tinha
  limite de 3,826 GiB; esse resultado nao comprova comportamento sob 512 MiB.
- Esse build usou o diretorio de trabalho, que continha cinco alteracoes locais
  adicionais. O teste isolado do conteudo destinado ao commit e registrado
  separadamente no registro da implantacao.

### Falha adicional identificada no CI

- A execucao `38791614537`, commit `615bc4e`, falhou na tipagem com
  `Cannot find module '@anjos/domain'`.
- Os consumidores procuram `dist/index.d.ts`, mas os pacotes compartilhados
  ainda nao haviam sido compilados no runner limpo.
- A ordem foi corrigida para gerar Prisma, compilar pacotes compartilhados,
  verificar tipagem, testar e compilar as aplicacoes.
- O CI passou a incluir `scripts/test-public-demo.sh`, executando a imagem com
  limite de 512 MiB e verificando saude, credencial HTTP e proxy da API.

Evidencias, estados e limites: [registro da implantacao](26-registro-implantacao-demo-2026-10-15.md)
e [ADR-014](07-decisoes-arquiteturais/ADR-014-runtime-enxuto-e-validacao-ci.md).

### Criterios para nova tentativa

- A imagem deve iniciar API e Web sem instalar dependencias no runtime.
- `/healthz` deve responder com sucesso.
- A raiz deve exigir a credencial HTTP da demo.
- `/api/health` e `/api/animals` devem responder por meio do proxy da Web.
