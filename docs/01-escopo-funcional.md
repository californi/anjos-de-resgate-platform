# Escopo Funcional

## Modulos previstos

- Portal institucional.
- Animais.
- Adocao.
- Adotantes.
- Interesses de adocao.
- Doacoes.
- Apadrinhamento.
- Campanhas.
- Parcerias.
- Dashboard.
- Usuarios e permissoes.
- Gestao de conteudo.
- Relatorios.

## Escopo da primeira iteracao

A primeira iteracao cobre apenas:

- Portal inicial.
- Listagem publica de animais.
- Card basico de animal.
- Detalhe simples de animal.
- Cadastro administrativo basico de animal.
- Alteracao de status.
- API inicial de animais.
- Seed de demonstracao.

## Escopo do Prototipo 1 - 01/07/2026

O Prototipo 1 amplia a primeira base sem implementar ainda o fluxo completo de adocao:

- Portal institucional com pagina sobre a ONG.
- Pagina de contato com canais iniciais.
- Listagem publica de animais mantida.
- Cadastro administrativo de animais mantido.
- Edicao administrativa de animais.
- Alteracao de status mantida.
- Login administrativo basico e simulado para validacao.
- Execucao orientada por Docker com Web, API e PostgreSQL.
- Conteudo textual e imagem principal centralizados em arquivo compartilhado.

## Escopo do Prototipo 2.1 - interesse inicial em adocao

Este incremento inicia o Prototipo 2 sem implementar ainda a experiencia Tinder
nem o processo completo de adocao:

- Feed publico compacto para visualizar dezenas de animais.
- Seed ampliado com dezenas de animais ficticios para validacao de volume.
- Formulario publico de interesse no detalhe de animal.
- Registro persistente de interesse vinculado ao animal.
- Regra de aplicacao: interesse so fica bloqueado para animal em
  `IN_ADOPTION_PROCESS`.
- Telas administrativas separadas para inventario, cadastro, edicao e
  solicitacoes de interesse.
- Listagem administrativa dos interesses recebidos com quantidade por animal.
- Quantidade de interesses exibida junto ao resumo de cada animal no inventario
  administrativo.
- Lista administrativa compacta para gestao de muitos animais.
- Status inicial de interesse como `RECEIVED`, preservando revisao humana pela
  equipe.

## Fora do escopo nesta iteracao

- Autenticacao real.
- Processo completo de adocao.
- Experiencia Tinder/swipe.
- Triagem completa de adotantes.
- Mudanca automatica de status do animal apos interesse.
- Upload e gestao real de videos.
- Paginacao, busca e filtros avancados.
- Pagamentos ou doacoes.
- Apadrinhamento.
- Campanhas e parcerias.
- Relatorios gerenciais.
- Permissoes por perfil.
- Painel administrativo para editar conteudo do portal.
