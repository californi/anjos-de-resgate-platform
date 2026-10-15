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
6. no `main`, publica o resultado dos checks para o Render;
7. o Render implanta o commit somente quando todos os checks passam e valida
   `/healthz` antes de concluir o deploy.

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

O `render.yaml` usa `autoDeployTrigger: checksPass`. Como o repositorio esta
conectado ao Render, nao e necessario criar deploy hook nem armazenar outro
segredo no GitHub. Em cada commit no `main`:

1. o GitHub Actions executa o workflow **CI for public demo**;
2. o Render aguarda o check **Test, build and container**;
3. somente um check aprovado libera a construcao e o deploy do mesmo commit;
4. o Render considera o deploy concluido apenas apos `/healthz` responder.

Pull requests executam as mesmas verificacoes, mas nao publicam a demo.

## Links para compartilhar

| Destino | Link |
| --- | --- |
| Pagina inicial | `https://anjos-de-resgate-demo.onrender.com/` |
| Animais | `https://anjos-de-resgate-demo.onrender.com/animais` |
| Apoios | `https://anjos-de-resgate-demo.onrender.com/apoie` |
| Administracao de animais | `https://anjos-de-resgate-demo.onrender.com/admin/animais` |
| Administracao de apoios | `https://anjos-de-resgate-demo.onrender.com/admin/apoios` |
| Saude tecnica | `https://anjos-de-resgate-demo.onrender.com/healthz` |
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
