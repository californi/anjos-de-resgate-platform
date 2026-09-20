# Run Log - Prototipo 3

## 2026-09-18

### Implementacao

- Adicionado upload de imagem por arquivo, com limite de 5 MB.
- Adicionado contato por SMTP e Mailpit no Docker.
- Adicionados dominio, API e telas de doacoes e apoios.
- Encadeado o perfil do animal ao formulario de apadrinhamento, com selecao
  automatica do animal elegivel.
- Adicionados seed, testes, diagrama, prompt e ADRs.

### Validacao executada

- `pnpm run build:packages`: passou.
- `pnpm --filter @anjos/api build`: passou.
- `pnpm --filter @anjos/web build`: passou.
- `pnpm test`: passou, 13 testes no total.
- `docker compose config --quiet`: passou.
- Docker integrado: passou com PostgreSQL, API, Web e Mailpit saudaveis.
- `GET /support/overview`: retornou campanhas e necessidades de seed.
- `POST /contact-messages`: passou e a mensagem apareceu no Mailpit.
- `POST /uploads/images` e leitura da imagem: passaram com `image/jpeg`.
- Registro e confirmacao de apoio ficticio: passaram.
- `/apoie` e `/admin/apoios`: responderam HTTP 200.
- Perfil do animal encaminhando e pre-selecionando o apadrinhamento: passou.
- Reconstrucao final do Docker: Web, API, PostgreSQL e Mailpit saudaveis,
  sem erros recentes nos logs.

### Observacoes

- O marco estava planejado para agosto de 2026; o registro de implementacao foi
  concluido em setembro.
- Os dados de seed sao ficticios.
- A chave Pix padrao e explicitamente de demonstracao.
