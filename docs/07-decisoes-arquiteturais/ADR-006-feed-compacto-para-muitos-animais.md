# ADR-006 - Feed compacto para muitos animais

## Status

Aceita em 2026-08-20.

## Contexto

Na rotina da ONG, a plataforma podera divulgar dezenas de animais ao mesmo
tempo. A listagem publica inicial usava cards grandes, adequados para poucos
perfis, mas pouco eficientes para uma tela com muitos animais. A area
administrativa tambem precisava permitir leitura rapida do inventario sem
exigir muita rolagem.

Tambem surgiu a possibilidade de exibir os animais em formato semelhante a um
feed de videos, com pequenos quadrados. Nesta fase, ainda nao ha requisitos
suficientes para modelar videos, upload de midia, armazenamento, processamento
ou moderacao.

## Decisao

Adotar uma visualizacao publica compacta baseada em tiles quadrados de midia,
preparada para muitos animais na tela. Cada tile apresenta foto, nome, especie,
porte, status e links para detalhe/interesse.

No admin, substituir a visualizacao baseada em cards grandes por uma lista
compacta com miniatura, resumo do animal, status, seletor de status e acao de
edicao.

O seed de demonstracao passa a conter dezenas de animais ficticios para
validar densidade visual, rolagem e leitura do feed.

## Consequencias

- A tela publica suporta uma quantidade maior de animais sem antecipar filtros
  complexos ou paginacao.
- A area administrativa fica mais adequada para triagem rapida.
- O projeto preserva simplicidade: videos reais, upload, storage, filtros
  avancados e paginacao ficam fora desta iteracao.
- A arquitetura continua separando interface, aplicacao, dominio e
  infraestrutura.
- Uma futura decisao sobre midias devera discutir modelo de dados, validacao,
  privacidade, armazenamento e custos.

## Alternativas consideradas

- Manter apenas cards grandes: rejeitado porque dificulta demonstrar dezenas de
  animais.
- Implementar videos agora: rejeitado por antecipar requisitos ainda incertos.
- Implementar paginacao e busca agora: adiado ate a validacao indicar volume,
  criterios de busca e rotina real de uso.
