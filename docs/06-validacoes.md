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

Pendente: criar o Blueprint no Render, configurar secrets/variables no GitHub e
registrar a URL efetiva. Nenhum dado foi enviado a um provedor externo nesta
verificacao.

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
