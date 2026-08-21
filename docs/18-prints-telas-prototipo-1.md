# Prints de Tela - Prototipo 1

Documento estruturado com os prints das telas usadas na validacao do Prototipo 1
da Plataforma Anjos de Resgate, em 01/07/2026.

## Acessos rapidos

| #   | Tela               | Link da pagina                                      | Arquivo do print                                                      | Objetivo da validacao                                   |
| --- | ------------------ | --------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------- |
| 1   | Inicio             | http://localhost:3000                               | [01-home.jpg](assets/prototipo-1/01-home.jpg)                         | Validar primeira impressao e chamada para animais/admin |
| 2   | Sobre              | http://localhost:3000/sobre                         | [02-sobre.jpg](assets/prototipo-1/02-sobre.jpg)                       | Validar texto institucional e finalidade do prototipo   |
| 3   | Contato            | http://localhost:3000/contato                       | [03-contato.jpg](assets/prototipo-1/03-contato.jpg)                   | Validar canais de contato e formulario futuro           |
| 4   | Animais            | http://localhost:3000/animais                       | [04-animais.jpg](assets/prototipo-1/04-animais.jpg)                   | Validar feed compacto e muitos animais                  |
| 5   | Detalhe do animal  | http://localhost:3000/animais/demo-mel              | [05-detalhe-animal.jpg](assets/prototipo-1/05-detalhe-animal.jpg)     | Validar perfil individual e interesse inicial           |
| 6   | Acesso admin       | http://localhost:3000/admin/animais                 | [06-admin-acesso.jpg](assets/prototipo-1/06-admin-acesso.jpg)         | Validar acesso administrativo simulado                  |
| 7   | Inventario admin   | http://localhost:3000/admin/animais                 | [07-admin-painel.jpg](assets/prototipo-1/07-admin-painel.jpg)         | Validar lista compacta e status de animais              |
| 8   | Cadastro admin     | http://localhost:3000/admin/animais/cadastro        | [08-admin-cadastro.jpg](assets/prototipo-1/08-admin-cadastro.jpg)     | Validar tela dedicada de cadastro                       |
| 9   | Edicao admin       | http://localhost:3000/admin/animais/demo-mel/editar | [09-admin-edicao.jpg](assets/prototipo-1/09-admin-edicao.jpg)         | Validar tela dedicada de edicao                         |
| 10  | Solicitacoes admin | http://localhost:3000/admin/animais/interesses      | [10-admin-interesses.jpg](assets/prototipo-1/10-admin-interesses.jpg) | Validar contagem de interesses por animal               |

Codigo administrativo simulado:

```text
anjos2026
```

Para regenerar os prints com o prototipo em execucao, use:

```bash
node scripts/capture-prototype-screenshots.mjs
```

## 1. Inicio

Link da pagina: http://localhost:3000  
Arquivo do print: [assets/prototipo-1/01-home.jpg](assets/prototipo-1/01-home.jpg)

Pontos para validar:

- A proposta da plataforma fica clara na primeira tela?
- Os botoes principais levam para as acoes esperadas?
- Os animais em destaque ajudam na comunicacao?

<img src="assets/prototipo-1/01-home.jpg" alt="Print da tela inicial" width="100%">

## 2. Sobre

Link da pagina: http://localhost:3000/sobre  
Arquivo do print: [assets/prototipo-1/02-sobre.jpg](assets/prototipo-1/02-sobre.jpg)

Pontos para validar:

- O texto apresenta bem a ONG e o objetivo da plataforma?
- A evolucao planejada esta compreensivel?
- Falta alguma informacao institucional?

<img src="assets/prototipo-1/02-sobre.jpg" alt="Print da pagina sobre" width="100%">

## 3. Contato

Link da pagina: http://localhost:3000/contato  
Arquivo do print: [assets/prototipo-1/03-contato.jpg](assets/prototipo-1/03-contato.jpg)

Pontos para validar:

- Os canais de contato estao corretos?
- O formulario desabilitado comunica que o envio automatico e futuro?
- Quais dados reais devem substituir os placeholders?

<img src="assets/prototipo-1/03-contato.jpg" alt="Print da pagina contato" width="100%">

## 4. Animais

Link da pagina: http://localhost:3000/animais  
Arquivo do print: [assets/prototipo-1/04-animais.jpg](assets/prototipo-1/04-animais.jpg)

Pontos para validar:

- Os tiles mostram as informacoes essenciais?
- Status, especie, idade e porte estao claros?
- O feed ajuda a navegar por muitos animais?

<img src="assets/prototipo-1/04-animais.jpg" alt="Print da listagem de animais" width="100%">

## 5. Detalhe do animal

Link da pagina: http://localhost:3000/animais/demo-mel  
Arquivo do print:
[assets/prototipo-1/05-detalhe-animal.jpg](assets/prototipo-1/05-detalhe-animal.jpg)

Pontos para validar:

- O perfil individual tem campos suficientes?
- O botao `Tenho interesse` esta bem posicionado?
- O formulario de interesse inicial esta claro?

<img src="assets/prototipo-1/05-detalhe-animal.jpg" alt="Print do detalhe do animal" width="100%">

## 6. Acesso administrativo

Link da pagina: http://localhost:3000/admin/animais  
Arquivo do print:
[assets/prototipo-1/06-admin-acesso.jpg](assets/prototipo-1/06-admin-acesso.jpg)

Pontos para validar:

- O acesso simulado e aceitavel para a validacao do prototipo?
- A mensagem deixa claro que nao e autenticacao real?
- A equipe entende que usuarios e permissoes entram em iteracao futura?

<img src="assets/prototipo-1/06-admin-acesso.jpg" alt="Print do acesso administrativo" width="100%">

## 7. Inventario administrativo

Link da pagina: http://localhost:3000/admin/animais  
Arquivo do print:
[assets/prototipo-1/07-admin-painel.jpg](assets/prototipo-1/07-admin-painel.jpg)

Pontos para validar:

- A lista compacta facilita gerir muitos animais?
- A contagem de interesses no resumo de cada animal ajuda a priorizar retornos?
- A alteracao de status cobre a rotina atual?
- Falta upload de imagem, filtro ou algum campo essencial?

<img src="assets/prototipo-1/07-admin-painel.jpg" alt="Print do painel administrativo" width="100%">

## 8. Cadastro administrativo

Link da pagina: http://localhost:3000/admin/animais/cadastro
Arquivo do print:
[assets/prototipo-1/08-admin-cadastro.jpg](assets/prototipo-1/08-admin-cadastro.jpg)

Pontos para validar:

- A tela dedicada reduz confusao no cadastro?
- Os campos continuam adequados para a rotina da ONG?

## 9. Edicao administrativa

Link da pagina: http://localhost:3000/admin/animais/demo-mel/editar
Arquivo do print:
[assets/prototipo-1/09-admin-edicao.jpg](assets/prototipo-1/09-admin-edicao.jpg)

Pontos para validar:

- A edicao em tela propria esta mais clara?
- O retorno para o inventario apos salvar e esperado?

## 10. Solicitacoes de interesse

Link da pagina: http://localhost:3000/admin/animais/interesses
Arquivo do print:
[assets/prototipo-1/10-admin-interesses.jpg](assets/prototipo-1/10-admin-interesses.jpg)

Pontos para validar:

- A quantidade de interesses por animal ajuda a priorizar retornos?
- Os dados da solicitacao sao suficientes para a equipe entrar em contato?
