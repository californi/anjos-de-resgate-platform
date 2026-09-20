# Prototipos

## Prototipo de 17/06/2026

### Telas

- Tela inicial da plataforma.
- Listagem publica de animais.
- Detalhe simples de animal.
- Painel administrativo inicial.
- Formulario de cadastro de animal.

### Funcionalidades

- Visualizar animais cadastrados.
- Exibir card com foto, nome, especie, porte, idade, status e descricao.
- Cadastrar animal no admin.
- Alterar status de animal.
- Consultar API de animais.

### O que sera validado

- Clareza da proposta para a ONG.
- Campos minimos do cadastro de animal.
- Utilidade da listagem publica.
- Primeira percepcao sobre o painel administrativo.
- Priorizacao do proximo fluxo: adocao estilo Tinder.

### Limitacoes conhecidas

- Sem autenticacao real.
- Sem fluxo de interesse em adocao.
- Sem edicao completa no frontend.
- Sem upload de imagem.
- Sem pagamentos ou doacoes.
- Sem teste HTTP/e2e dos endpoints nesta base inicial.

## Prototipo 1 - validacao em 01/07/2026

### Telas

- Tela inicial da plataforma.
- Pagina sobre a ONG.
- Pagina de contato.
- Listagem publica de animais.
- Detalhe simples de animal.
- Painel administrativo com acesso simulado.
- Formulario de cadastro e edicao de animal.

### Funcionalidades

- Visualizar informacoes institucionais da ONG.
- Consultar canais iniciais de contato.
- Visualizar animais cadastrados.
- Cadastrar animal no admin.
- Editar cadastro de animal no admin.
- Alterar status de animal.
- Executar o prototipo com Docker Compose.

### O que sera validado

- Se o portal institucional comunica bem a finalidade da plataforma.
- Se a listagem publica atende ao fluxo de divulgacao de animais.
- Se o cadastro e a edicao possuem campos suficientes para a rotina da ONG.
- Se a barreira administrativa simulada e aceitavel para validacao do prototipo.
- Quais evidencias devem ser coletadas antes da transicao para adocao estilo Tinder.

### Limitacoes conhecidas

- Login administrativo nao e autenticacao real.
- Sem fluxo de interesse em adocao.
- Sem upload de imagem.
- Sem filtros avancados.
- Sem auditoria administrativa.

## Prototipo 2.1 - interesse inicial em adocao

### Telas

- Feed publico compacto de animais.
- Detalhe de animal com formulario publico de interesse.
- Painel administrativo com inventario compacto de animais.
- Tela administrativa de cadastro de animal.
- Tela administrativa de edicao de animal.
- Tela administrativa de solicitacoes de interesse.

### Funcionalidades

- Visualizar dezenas de animais em tiles quadrados.
- Acessar detalhe e interesse a partir do feed.
- Registrar nome, contato e mensagem de interesse.
- Bloquear interesse apenas quando o animal esta em processo de adocao.
- Persistir interesse vinculado ao animal.
- Exibir interesses recebidos no admin para revisao da equipe, com quantidade
  por animal.
- Exibir a quantidade de interesses tambem no resumo de cada animal no
  inventario administrativo.
- Gerenciar muitos animais no admin sem depender de cards grandes.

### O que sera validado

- Se o feed compacto facilita observar muitos animais.
- Se o formato quadrado aproxima a expectativa de uma experiencia visual mais
  parecida com feeds de midia.
- Se o formulario tem campos suficientes para iniciar contato.
- Se a equipe entende que o interesse nao confirma adocao.
- Se a listagem administrativa ajuda a organizar retornos.
- Se a contagem no inventario ajuda a priorizar quais animais revisar primeiro.
- Quais dados pessoais devem ser tratados quando houver autenticacao real.

### Limitacoes conhecidas

- Sem autenticacao real.
- Sem permissoes por perfil.
- Sem consentimento formal/LGPD implementado.
- Sem triagem completa de adotantes.
- Sem fluxo Tinder/swipe.
- Sem mudanca automatica de status do animal.
- Sem video real, upload de midia, paginacao ou filtros avancados.

## Prototipo 3 - doacoes e apoios

### Telas

- Contato com envio de e-mail.
- Cadastro/edicao de animal com selecao de foto do dispositivo.
- Pagina publica `/apoie`.
- Painel administrativo `/admin/apoios`.

### Funcionalidades

- Doacao geral, campanha, apadrinhamento e necessidade por animal.
- Registro de doador e historico de apoio.
- Apoio unico ou mensal.
- Informacoes de Pix configuraveis.
- Confirmacao manual do recebimento.
- Metas calculadas com valores confirmados.

### O que sera validado

- Se os quatro destinos de apoio sao compreensiveis.
- Se as campanhas e necessidades possuem dados suficientes.
- Se o historico ajuda a ONG a conferir o Pix.
- Quais dados pessoais e prazos de retencao devem ser adotados.
- Se o fluxo manual deve preceder uma futura integracao de pagamento.

### Limitacoes conhecidas

- Acesso administrativo ainda simulado.
- Pix de demonstracao, sem conciliacao bancaria.
- Sem gateway, cartao, recibo fiscal ou notificacao automatica.
- Dados de doadores devem permanecer ficticios ate a adequacao de privacidade.
