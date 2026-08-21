# ADR-008 - Contagem de interesses no inventario administrativo

## Status

Aceita em 2026-08-20.

## Contexto

A tela de solicitacoes ja apresenta a quantidade de interesses agrupada por
animal. Durante a revisao do prototipo, foi identificado que o administrador
tambem precisa enxergar essa quantidade no proprio inventario de animais, junto
das informacoes resumidas de cada perfil.

Essa informacao ajuda a priorizar retornos sem obrigar a equipe a abrir uma
tela separada para cada verificacao.

## Decisao

Exibir a quantidade de interesses no inventario administrativo de animais, em
chips de resumo ao lado de especie, porte e idade aproximada.

Nesta iteracao, a contagem e derivada na camada Web a partir da lista de
`AdoptionInterest` ja retornada pela API. Nao sera criado um endpoint agregado
especifico neste momento.

## Consequencias

- O administrador visualiza rapidamente quais animais receberam mais interesse.
- A tela de inventario continua sendo a entrada principal para status, edicao e
  triagem inicial.
- A solucao evita antecipar consulta agregada, paginacao ou relatorios.
- Se o volume crescer, uma iteracao futura pode mover a agregacao para a API ou
  para uma consulta otimizada no banco.
- A contagem permanece restrita ao admin simulado e nao aparece no feed publico.

## Evidencias

- `apps/web/src/app/admin/animais/page.tsx`
- `apps/web/src/components/AdminAnimalsInventory.tsx`
- `apps/web/src/components/AdoptionInterestsList.tsx`
- `docs/21-prototipo-2-interesse-adocao/`
