# ADR-013 - Demo publica gratuita com CI/CD

## Status

Aceita em 15/10/2026 para validacao remota do prototipo.

## Contexto

Integrantes da ONG e do projeto precisam acessar o prototipo sem instalar o
ambiente local. O Compose atual foi deliberadamente restrito a `127.0.0.1`,
pois a API ainda nao possui autenticacao por usuario, autorizacao por papel ou
protecoes suficientes para uso operacional na Internet.

Planos gratuitos tambem impõem limites. Instancias podem dormir por
inatividade, o sistema de arquivos do container nao e persistente e bancos
gratuitos podem ter prazo ou cotas. A publicacao nao pode transformar um
prototipo de validacao em sistema de producao por suposicao.

## Decisao

Publicar uma **demo protegida e nao operacional** em um unico Web Service
gratuito no Render:

- Next.js e NestJS executam no mesmo container;
- somente a porta da Web e publica, e `/api/*` e encaminhado internamente;
- uma credencial HTTP compartilhada restringe o acesso ao grupo de validacao;
- todas as telas exibem um aviso para uso exclusivo de dados ficticios;
- os repositorios em memoria usam apenas dados ficticios e perdem alteracoes
  quando a instancia reinicia;
- contatos reais, imagens persistentes e dados pessoais nao integram esta
  primeira publicacao;
- GitHub Actions executa verificacoes em pull requests e `main`;
- o Render observa os checks do GitHub e implanta commits do `main` somente
  quando todos passam, sem armazenar um deploy hook adicional.

A barreira HTTP e adequada apenas para a demo compartilhada. Ela nao substitui
autenticacao individual, autorizacao, auditoria, recuperacao de senha ou
revogacao de acesso.

## Alternativas consideradas

| Alternativa | Vantagem | Restricao relevante | Decisao |
| --- | --- | --- | --- |
| Render Free | Docker, URL HTTPS e deploy condicionado aos checks | suspensao por inatividade e disco efemero | escolhida para a demo |
| Koyeb Free | deploy Git e uma instancia gratuita | 512 MB, sem volume e escala a zero | alternativa de hospedagem |
| Vercel Hobby | boa integracao com Next.js | uso Hobby restrito a projetos pessoais nao comerciais; API e dados exigiriam outros servicos | nao escolhida |
| GitHub Pages | gratuito e simples | hospeda apenas conteudo estatico, nao NestJS | inadequada |

Persistencia gerenciada e e-mail transacional podem ser avaliados depois
(por exemplo, Supabase e Resend), mas exigem decisao sobre operadores de dados,
retencao, credenciais, consentimento e uso de informacoes reais.

## Consequencias

- O grupo recebe uma URL HTTPS unica para validacao remota.
- O primeiro acesso apos inatividade pode ser mais lento.
- Cadastros, interesses, apoios e uploads feitos na demo podem desaparecer.
- O formulario de contato nao deve receber dados reais nem ser tratado como
  canal operacional.
- Uma implantacao permanente depende de autenticacao, persistencia, backup,
  protecao contra abuso e aprovacao da ONG.

## Evidencias

- `Dockerfile.deploy`
- `render.yaml`
- `.github/workflows/ci-cd.yml`
- `scripts/start-public-demo.sh`
- `apps/web/src/middleware.ts`
- `docs/25-publicacao-demo-e-cicd.md`
- `diagrams/implantacao-demo-publica.mmd`

## Evolucao em 15/10/2026

A proposta inicial de deploy hook foi substituida por `checksPass` no commit
`615bc4e`, usando a conexao GitHub ja existente no Render. O estouro de memoria
no primeiro deploy e a falha posterior de tipagem no CI motivaram a
[ADR-014](ADR-014-runtime-enxuto-e-validacao-ci.md). O
[registro da implantacao](../26-registro-implantacao-demo-2026-10-15.md) conserva
as versoes, evidencias e o estado efetivo da publicacao.
