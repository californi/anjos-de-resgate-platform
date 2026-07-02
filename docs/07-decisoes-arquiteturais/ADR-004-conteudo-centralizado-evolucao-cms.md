# ADR-004 - Conteudo centralizado e evolucao para gestao administrativa

## Status

Aceita para o Prototipo 1.

## Contexto

Textos institucionais, chamadas da pagina inicial, canais de contato e imagens
de apoio tendem a mudar durante as validacoes com a ONG. Se esses textos ficam
espalhados entre paginas React, cada ajuste exige procurar varios arquivos e
aumenta o risco de inconsistencia.

Ao mesmo tempo, um painel administrativo completo para gestao de conteudo ainda
depende de autenticacao real, permissoes, persistencia, auditoria e validacao de
publicacao. Esses itens estao fora do escopo do Prototipo 1.

## Decisao

Centralizar o conteudo editavel do portal em `packages/shared/src/site-content.ts`.
As paginas publicas devem consumir esse contrato compartilhado em vez de manter
textos e imagens diretamente nos componentes.

Para esta fase, alteracoes de conteudo serao feitas por Pull Request no GitHub.
Em uma iteracao futura, esse contrato podera ser alimentado por API e banco de
dados, permitindo que usuarios administradores editem textos, imagens e canais
de contato em uma tela administrativa.

## Consequencias

- Fica mais facil para colaboradores sugerirem mudancas de texto por Pull Request.
- As paginas publicas passam a reutilizar uma unica fonte de conteudo.
- Imagens principais tambem podem ser trocadas no mesmo arquivo de configuracao.
- A solucao atual nao e um CMS; ela apenas prepara um contrato simples para uma
  futura gestao administrativa de conteudo.
- A implementacao de um painel tipo CMS deve esperar autenticacao real,
  permissoes e persistencia de conteudo.
