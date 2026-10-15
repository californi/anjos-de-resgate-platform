# ADR-014 - Runtime enxuto e validacao de implantacao no CI

## Status

Aceita em 15/10/2026. Complementa a ADR-013. A aceitacao da decisao e distinta
da comprovacao do deploy; o estado efetivo consta no registro de implantacao.

## Contexto e evidencias

O primeiro deploy do commit `5908aaf` construiu a imagem, mas o Render encerrou
o container por ultrapassar 512 MiB antes da abertura da porta. Os logs
mostraram revalidacao de dependencias por dois processos `pnpm` no runtime.
Nao houve medicao individual suficiente para atribuir todo o consumo ao pnpm.

Separadamente, o CI do commit `615bc4e` falhou por ausencia de
`@anjos/domain`: o runner verificava consumidores antes de gerar os arquivos
`dist` dos pacotes compartilhados. Builds locais anteriores tinham artefatos
gerados e nao reproduziam essa condicao de checkout limpo.

## Decisao

1. Instalar dependencias e compilar somente durante o build da imagem.
2. Iniciar NestJS e Next.js diretamente com Node no runtime. O script Bash
   supervisiona os dois processos e encerra o container quando um deles termina.
3. Definir heaps de 96 MiB para API e 192 MiB para Web, ajustaveis por
   `API_NODE_OPTIONS` e `WEB_NODE_OPTIONS`. Esses limites abrangem o heap V8;
   nao representam limites totais de memoria dos processos.
4. Compilar os pacotes compartilhados antes da tipagem no CI.
5. Testar a imagem em container descartavel com limite total de 512 MiB,
   sem portas publicadas nem acesso a rede externa. Verificar saude integrada,
   HTTP 401 para rotas protegidas e acesso autenticado ao portal e a API.
6. Usar `autoDeployTrigger: checksPass` com o repositorio conectado ao Render.
   GitHub Actions executa os checks; Render executa o deploy apos sua conclusao
   e verifica `/healthz`. Nao adicionar deploy hook ao repositorio.

## Alternativas consideradas

| Alternativa | Avaliacao |
| --- | --- |
| Manter pnpm no runtime | Acrescenta processos e verificacoes desnecessarias para iniciar artefatos prontos. |
| Aumentar o plano ou separar Web e API | Pode ser reavaliado com carga medida; nao foi necessario para o primeiro ajuste. |
| Implantar em cada commit antes dos checks | Nao atende ao criterio de validar a imagem antes da publicacao. |
| Deploy hook acionado no workflow | Era a configuracao inicial; a integracao Git existente permite evitar esse segredo adicional. |

## Consequencias e limites

- O teste de inicializacao cobre uma falha que o build isolado nao detecta.
- Um teste curto sob 512 MiB nao substitui teste de carga, medicao de picos ou
  acompanhamento do ambiente remoto.
- O CI e o Render constroem a partir do codigo versionado; nao ha promocao de
  uma unica imagem por digest entre os ambientes.
- A mudanca preserva o escopo de demo efemera com dados ficticios da ADR-013.
- A implantacao depende de checks efetivamente detectados e da configuracao
  sincronizada no painel Render.

## Rastreabilidade

- `scripts/start-public-demo.sh`
- `scripts/test-public-demo.sh`
- `.github/workflows/ci-cd.yml`
- `render.yaml`
- [Registro da implantacao](../26-registro-implantacao-demo-2026-10-15.md)
- [Comportamento de deploy e checks do Render](https://render.com/docs/deploys#integrating-with-ci)
