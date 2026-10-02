# Diagnostico e plano da proxima iteracao - 01/10/2026

## Regra de leitura

O cronograma original e planejamento. O andamento abaixo usa somente evidencias
do repositorio na data de referencia. Uma implementacao demonstravel nao prova
que houve validacao ou aceite pela ONG.

Snapshot verificado antes deste planejamento:

- repositorio: `anjos-de-resgate-platform`;
- branch: `main`, sincronizada com `origin/main`;
- commit: `00a17d7 feat: implementa prototipo 3 de doacoes e apoios`;
- arvore de trabalho: limpa antes da inclusao destes documentos;
- validacoes registradas no pacote do Prototipo 3: build, testes e Docker;
- aceite funcional da ONG: a confirmar.

## Fontes separadas

### Solicitacoes registradas da ONG ou de reunioes

- Selecionar foto do dispositivo ao cadastrar ou editar um animal.
- Encaminhar o formulario de contato por e-mail.
- Bloquear novo interesse somente quando o animal estiver em processo de
  adocao.
- Separar as telas administrativas de animais, cadastro, edicao e interesses.
- Exibir a quantidade de interesses por animal na administracao.
- Organizar doacao geral, campanhas, apadrinhamento, necessidades por animal,
  doadores, historico e Pix.

Esses itens possuem implementacao no repositorio, mas o aceite da ONG continua
a confirmar nos registros de validacao.

### Planejamento do documento de cronograma

No cronograma, as campanhas do Prototipo 3 sao de arrecadacao. As campanhas do
Prototipo 4 fazem parte da divulgacao institucional. Elas nao devem ser tratadas
como a mesma funcionalidade sem confirmacao da ONG.

| Marco | Data planejada | Escopo planejado | Evidencia atual | Andamento em 01/10/2026 |
| --- | --- | --- | --- | --- |
| R1 | 17/06 | Portal e estrutura inicial de animais | Codigo e documentacao inicial | Implementacao demonstravel; validacao a confirmar |
| R2 | 01/07 | Validar Prototipo 1 | Portal, contato inicial, gestao de animais e Docker | Implementacao demonstravel; validacao a confirmar |
| R3 | 15/07 | Parcial do fluxo de adocao | Interesse inicial e feed compacto | Parcial; sem fluxo completo; validacao a confirmar |
| R4 | 29/07 | Validar Prototipo 2 estilo Tinder | Sem swipe, adotante, perfil ou triagem completa | Parcial; validacao a confirmar |
| R5 | 12/08 | Parcial de doacoes e apadrinhamento | Codigo do Prototipo 3 | Implementacao demonstravel; validacao a confirmar |
| R6 | 26/08 | Validar Prototipo 3 | ADRs, testes e pacote de evidencias | Validacao da ONG a confirmar |
| R7 | 09/09 | Parcial de campanhas e parcerias | Campanhas financeiras existem; parceiros e conteudo institucional nao | Parcial; marco a confirmar |
| R8 | 23/09 | Validar Prototipo 4 | Nenhuma evidencia de validacao | A confirmar |
| R9 | 07/10 | Parcial mobile/PWA | Manifesto basico existe; instalabilidade e offline nao comprovados | Parcial; marco a confirmar |
| R10 | 21/10 | Validar mobile/PWA | Sem evidencia | A confirmar |
| R11 | 04/11 | Parcial de dashboard e relatorios | Apenas resumos locais em telas administrativas | A confirmar |
| R12 | 18/11 | Validar dashboard e gestao | Sem evidencia | A confirmar |
| R13 | 02/12 | Validacao geral e documentacao | Planejado | A confirmar |
| R14 | 16/12 | Validacao final e entrega | Planejado | A confirmar |

### Sugestoes para replanejamento

- Nao iniciar PWA completo antes de demonstrar e registrar o aceite do
  Prototipo 3.
- Recuperar o Prototipo 4 com um incremento minimo de parceiros antes de
  adicionar noticias, eventos e atividades.
- Manter dados pessoais e financeiros ficticios enquanto autenticacao,
  permissoes, privacidade e retencao nao forem aprovadas.
- Tratar acessibilidade, backup, manutencao e documentacao como criterios de
  conclusao, nao como tarefas finais de dezembro.

## Diagnostico curto para a equipe

Responder antes de assumir novas entregas:

1. Quais telas podem ser demonstradas hoje com Docker e dados ficticios?
2. O repositorio `anjos-de-resgate-platform` esta sincronizado e quem pode
   aprovar Pull Requests?
3. O ambiente Docker sobe Web, API, PostgreSQL e Mailpit sem ajustes locais?
4. Quais pendencias bloqueiam validacao: textos, Pix, campos, privacidade,
   autenticacao, backup ou dados reais?
5. Quais alunos estao ativos nesta quinzena e quantas horas possuem?
6. Quem assume dominio/API, interface, testes/documentacao e demonstracao?
7. Quem representa a ONG para esclarecer dados e aceitar a entrega?
8. Em qual data e ambiente ocorrera a proxima validacao?

Enquanto nomes e disponibilidade nao forem informados, todos os responsaveis
abaixo sao apenas papeis sugeridos.

## Roteiro da proxima reuniao com a ONG - 45 minutos

1. **Abertura e limites - 5 min:** confirmar objetivo da reuniao e explicar que
   interesse nao conclui adocao e registro de apoio nao confirma pagamento.
2. **Demonstracao do Prototipo 3 - 12 min:** upload, contato, quatro destinos de
   apoio, Pix informativo, historico e confirmacao administrativa.
3. **Validacao dirigida - 8 min:** marcar cada fluxo como aceito, ajustar,
   bloqueado ou nao avaliado na ficha.
4. **Dados e acesso - 7 min:** decidir dados minimos, retencao, quem pode
   acessar, responsavel por backup e se o piloto continuara ficticio.
5. **Proxima entrega - 8 min:** aprovar ou rejeitar o diretorio de parceiros,
   seus campos, categorias e consentimento de publicacao.
6. **Encaminhamentos - 5 min:** nomear responsaveis, prazos, Issues e data da
   proxima demonstracao.

Saidas obrigatorias: ficha preenchida, escopo da quinzena, responsaveis, data de
validacao e lista de ajustes rastreaveis.

## Backlog priorizado da quinzena 01-14/10

| Prioridade e item | Usuario e problema | Dados necessarios | Criterios de conclusao | Dependencias | Responsavel sugerido | Validacao |
| --- | --- | --- | --- | --- | --- | --- |
| P0 - Validar Prototipo 3 | Equipe da ONG precisa confirmar se apoios, contato e upload refletem sua rotina | Textos, chave/titular Pix de teste, campos de apoio, regras de confirmacao e feedback | Demonstracao executada; ficha preenchida; ajustes viram Issues; nenhum apoio e apresentado como pagamento processado | Disponibilidade da ONG e ambiente Docker | Professor + representante da ONG | Roteiro e ficha em `docs/24-ficha-validacao-ong-2026-10.md` |
| P0 - Definir fronteiras de dados e acesso | ONG administra interesses e doadores, mas o acesso atual e simulado | Papeis, dados pessoais minimos, finalidade, retencao, responsavel por backup e restauracao | Matriz de papeis e dados aprovada; decisao sobre uso apenas ficticio ou piloto; Issue para autenticacao real | Decisao da ONG e orientacao institucional de privacidade | Professor + representante da ONG + aluno de documentacao | Revisao conjunta da matriz, sem cadastrar dados reais |
| P1 - Diretorio de parceiros | Visitante precisa localizar a rede de apoio; ONG precisa manter parceiros ativos | Nome publico, tipo, descricao, cidade, contato autorizado, link, imagem opcional, status e consentimento de publicacao | Entidade e API; pagina publica; admin para cadastrar, editar e ativar/desativar; somente ativos aparecem publicamente; testes de dominio e service | Campos e categorias aprovados; acesso ainda restrito a dados ficticios | Aluno A: dominio/API; Aluno B: Web; Aluno C: testes/docs | Cadastrar parceiro ficticio, editar, desativar e conferir a vitrine publica |
| P1 - Acessibilidade e manutencao do incremento | Visitantes e mantenedores precisam usar e sustentar as novas telas | Rotulos, ordem de foco, contraste, mensagens de erro, comandos de execucao e backup | Navegacao por teclado; rotulos associados; contraste revisado; teste de build; procedimento de backup/restauracao documentado | Diretorio de parceiros implementado | Aluno C + revisao cruzada | Checklist manual, build, testes e ensaio de restauracao sem dados reais |
| P2 - Noticias, atividades e eventos | ONG quer divulgar conteudo institucional, mas o modelo editorial ainda nao foi validado | Titulo, resumo, corpo, data, tipo, imagem, status e autor responsavel | Somente iniciar apos aceite dos campos; publicacao e despublicacao demonstraveis | Capacidade restante e decisao editorial | A atribuir | Historia separada; nao bloqueia o diretorio de parceiros |
| P2 - Preparacao do PWA | Usuario mobile precisa acesso responsivo e instalavel | Icones, nome, rotas essenciais, estrategia offline e dados que nao podem ser armazenados | Auditoria registrada e backlog tecnico; nao declarar instalabilidade sem teste em dispositivo | Fechamento do Prototipo 4 | A atribuir | Teste em pelo menos um Android e um navegador desktop |

## Entrega funcional proposta

Ao final da quinzena, demonstrar o diretorio de parceiros de ponta a ponta:

1. administrador simulado cadastra um parceiro ficticio;
2. edita categoria e contato autorizado;
3. ativa ou desativa a publicacao;
4. visitante visualiza somente parceiros ativos na pagina publica;
5. equipe executa testes, build e procedimento documentado de backup;
6. ONG registra aceite, ajuste ou bloqueio na ficha de validacao.

### Alternativa reduzida para atraso acumulado

Entregar apenas cadastro, edicao, ativacao e vitrine de parceiros, com duas
categorias iniciais aprovadas pela ONG. Adiar imagens, busca, noticias, eventos
e filtros. Ainda assim, manter testes, documentacao e ficha de validacao.

## Cronograma revisavel ate dezembro

| Periodo | Entrega proposta | Condicao de saida |
| --- | --- | --- |
| 01-07/10 | Diagnostico e validacao do Prototipo 3 | Ficha preenchida, decisoes e Issues registradas |
| 08-14/10 | Diretorio de parceiros minimo | Fluxo admin-publico demonstravel com dados ficticios |
| 15-21/10 | Validacao do Prototipo 4 e, se aprovada, primeira publicacao institucional | Parceiros aceitos; conteudo editorial delimitado |
| 22/10-04/11 | Mobile/PWA, acessibilidade e desempenho | Instalacao testada; navegacao mobile; estrategia offline delimitada |
| 05-18/11 | Dashboard, exportacoes, papeis e seguranca | Indicadores definidos pela ONG; exportacao sem expor dados indevidos |
| 19/11-02/12 | Estabilizacao, backup/restauracao, implantacao candidata e manuais | Ensaio de restauracao; ambiente candidato; manuais revisados |
| 03-09/12 | Piloto, treinamento e correcao de bloqueadores | Equipe treinada e checklist de operacao preenchido |
| 10-16/12 | Validacao final e passagem de responsabilidade | Aceite registrado; acessos, backup, manutencao e repositorio transferidos |

O cronograma deve ser revisto em cada validacao, sem converter automaticamente
uma data planejada em evidencia de conclusao.

## Decisoes arquiteturais pendentes

Nao foi criado ADR nesta etapa de planejamento. Caso a ONG aprove o diretorio
de parceiros, a implementacao deve registrar a separacao entre dados internos e
campos publicaveis, o ciclo ativo/inativo e a responsabilidade por consentimento
de publicacao. Autenticacao, backup e armazenamento de imagens exigem decisoes
separadas quando o uso deixar de ser apenas demonstrativo.
