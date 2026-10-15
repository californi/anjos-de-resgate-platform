# Publicacao da demo e CI/CD

## Objetivo e limite

Este guia publica uma demo remota para avaliacao por integrantes do projeto.
Ela usa somente dados ficticios, e protegida por uma credencial compartilhada
e nao deve receber informacoes pessoais, financeiras ou operacionais da ONG.

O ambiente gratuito nao e producao: dorme quando fica inativo, pode demorar no
primeiro acesso e perde as alteracoes mantidas em memoria ou no disco do
container quando reinicia.

## O que o pipeline executa

O workflow `.github/workflows/ci-cd.yml` e iniciado em pull requests, commits
no `main` e execucao manual.

1. instala as dependencias com o lockfile;
2. executa tipagem/lint;
3. executa os testes automatizados;
4. compila dominio, API e Web;
5. constroi a mesma imagem Docker usada na hospedagem;
6. no `main`, aciona o Render somente se os passos anteriores passarem;
7. aguarda `/healthz` confirmar que Web e API estao disponiveis.

## Criar o servico no Render

1. Confirme que `render.yaml`, `Dockerfile.deploy` e o workflow estao no
   `main` do GitHub.
2. Abra [New Blueprint no Render](https://dashboard.render.com/blueprints).
3. Conecte `californi/anjos-de-resgate-platform` e selecione `render.yaml`.
4. Informe valores fortes e diferentes para:
   - `PUBLIC_DEMO_USER`;
   - `PUBLIC_DEMO_PASSWORD`.
5. Crie o Blueprint e aguarde o primeiro deploy.
6. Copie a URL `https://<servico>.onrender.com` exibida pelo Render.

Nao registre nenhuma dessas credenciais no repositorio. Compartilhe a URL e a
credencial da demo por canais separados.

## Ligar o deploy ao GitHub Actions

No Render, abra o servico e copie **Settings > Deploy Hook**. No GitHub, acesse
**Settings > Secrets and variables > Actions** e configure:

| Tipo | Nome | Valor |
| --- | --- | --- |
| Secret | `RENDER_DEPLOY_HOOK_URL` | URL completa do deploy hook |
| Variable | `PUBLIC_APP_URL` | URL publica sem barra final |
| Variable | `DEPLOY_ENABLED` | `true` |

Execute **Actions > CI and public demo deploy > Run workflow**. Depois disso,
cada commit aceito no `main` sera publicado somente apos testes e build.

## Links para compartilhar

Substitua `<PUBLIC_APP_URL>` pela URL fornecida pelo Render:

| Destino | Link |
| --- | --- |
| Pagina inicial | `<PUBLIC_APP_URL>/` |
| Animais | `<PUBLIC_APP_URL>/animais` |
| Apoios | `<PUBLIC_APP_URL>/apoie` |
| Administracao de animais | `<PUBLIC_APP_URL>/admin/animais` |
| Administracao de apoios | `<PUBLIC_APP_URL>/admin/apoios` |
| Saude tecnica | `<PUBLIC_APP_URL>/healthz` |
| Feedback | `https://github.com/californi/anjos-de-resgate-platform/issues/new/choose` |

## Alternativas gratuitas verificadas

- [Render Free](https://render.com/docs/free): adequado ao container conjunto;
  a instancia suspende por inatividade e o disco e efemero.
- [Koyeb Free](https://www.koyeb.com/docs/reference/instances): alternativa
  com uma instancia gratuita, sem volume persistente.
- [Supabase Free](https://supabase.com/docs/guides/platform/billing-on-supabase):
  candidato futuro a banco e armazenamento persistentes, apos decisao de
  privacidade e operacao.
- [Resend Free](https://resend.com/pricing): candidato futuro a envio de
  contato por HTTPS, apos validar dominio, destinatario e tratamento de dados.

## Checklist de liberacao

- [ ] CI verde no commit publicado.
- [ ] `/healthz` retorna HTTP 200.
- [ ] credencial HTTP solicitada antes de abrir a demo.
- [ ] dados exibidos sao ficticios.
- [ ] nenhuma chave ou senha aparece no repositorio ou nos logs.
- [ ] a equipe foi avisada de que alteracoes nao persistem.
- [ ] feedback e registrado em Issue ou ficha de validacao.
