# Backlog Incremental

## Prototipo inicial - 17/06/2026

- Portal inicial.
- Listagem publica de animais.
- Card de animal.
- Cadastro basico no admin.
- API de animais.
- Documentacao inicial, ADRs e diagramas.

## Prototipo 1 - Portal e animais

- Pagina sobre a ONG.
- Pagina de contato.
- Login administrativo basico e simulado.
- Edicao administrativa de animais.
- Execucao Docker com Web, API e PostgreSQL.
- Registro de evidencias ArcAssist-Web do incremento.
- Conteudo publico centralizado em `packages/shared/src/site-content.ts`.

### Itens remanescentes do Prototipo 1

- Melhorar filtros de animais.
- Gestao de imagens alem do upload local implementado no Prototipo 3.
- Teste HTTP/e2e dos endpoints principais.
- Revisar campos do cadastro apos validacao com a ONG.
- Avaliar quais textos e imagens devem ser editaveis por administradores.

## Prototipo 2 - Adocao estilo Tinder

- Incremento 2.1: feed publico compacto para dezenas de animais.
- Incremento 2.1: inventario administrativo compacto para muitos animais.
- Incremento 2.1: seed ampliado para validar volume de perfis.
- Incremento 2.1: registro publico de interesse em adocao a partir do perfil do
  animal.
- Incremento 2.1: tela administrativa de solicitacoes de interesse.
- Incremento 2.1: telas administrativas separadas para inventario, cadastro,
  edicao e solicitacoes.
- Incremento 2.1: quantidade de interesses por animal na visao administrativa.
- Incremento 2.1: quantidade de interesses no resumo do inventario
  administrativo.
- Experiencia de descoberta por swipe.
- Busca, filtros e paginacao apos validacao do volume real.
- Cadastro de adotantes.
- Triagem inicial.

## Prototipo 3 - Doacoes e apadrinhamento

- Upload flexivel de foto no cadastro de animal. Implementado.
- Contato por e-mail via SMTP. Implementado.
- Pagina publica de apoio e Pix informativo. Implementado.
- Doacao geral. Implementado.
- Campanhas de arrecadacao. Implementado.
- Apadrinhamento unico ou mensal. Implementado.
- Necessidades por animal. Implementado.
- Registro de doadores e historico de apoio. Implementado.
- Confirmacao administrativa do recebimento. Implementado.
- Evidencias e ADRs do incremento. Implementado.

### Itens remanescentes do Prototipo 3

- Validar chave Pix, titular e textos reais com a ONG.
- Definir consentimento, politica de privacidade e retencao de dados.
- Substituir acesso simulado por autenticacao e permissoes reais.
- Avaliar integracao financeira somente depois da validacao do fluxo manual.

## Prototipo 4 - Parcerias

- Noticias, atividades e eventos. Planejado; a confirmar com a ONG.
- Vitrine publica de parceiros. Planejado; a confirmar com a ONG.
- Cadastro administrativo de parceiros. Planejado; a confirmar com a ONG.
- Veterinarios, clinicas e pet shops parceiros. Categorias a confirmar.
- Tipos de parceria e campos publicaveis. A confirmar.

### Proxima quinzena proposta - 01 a 14/10/2026

- Validar formalmente o Prototipo 3 e transformar ajustes em Issues.
- Definir dados publicos, categorias e ciclo ativo/inativo de parceiros.
- Implementar diretorio de parceiros de ponta a ponta como entrega principal.
- Tratar noticias, atividades e eventos como extensao condicionada a capacidade.
- Usar apenas dados ficticios ate aprovar acesso, privacidade e retencao.
- Plano detalhado: `docs/23-diagnostico-e-plano-2026-10-01.md`.
- Ficha de validacao: `docs/24-ficha-validacao-ong-2026-10.md`.

## Prototipo 5 - Mobile/PWA

- Manifest.
- Instalabilidade.
- Navegacao mobile refinada.
- Estados offline basicos.

## Prototipo 6 - Dashboard e relatorios

- Indicadores de animais.
- Indicadores de adocao.
- Relatorios exportaveis.
- Visao administrativa consolidada.

## Prototipo futuro - Gestao administrativa de conteudo

- Edicao de textos institucionais.
- Edicao de canais de contato.
- Troca de imagens do portal.
- Previa antes de publicar.
- Historico de alteracoes.

## Versao final

- Documentacao consolidada.
- Treinamento da equipe.
- Revisao arquitetural.
- Evidencias de pesquisa.
