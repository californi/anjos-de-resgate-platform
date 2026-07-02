# Gestao de Conteudo do Portal

Este documento explica como alterar textos e imagens do portal no Prototipo 1 e
qual e o caminho planejado para uma futura gestao administrativa de conteudo.

## Situacao atual

O conteudo editavel das paginas publicas esta centralizado em:

```text
packages/shared/src/site-content.ts
```

Esse arquivo concentra:

- nome oficial da ONG e da plataforma;
- navegacao principal;
- texto e imagem da pagina inicial;
- textos da pagina sobre;
- canais e textos da pagina de contato;
- codigo administrativo simulado usado apenas no prototipo.

## Como alterar textos agora

1. Abra `packages/shared/src/site-content.ts`.
2. Altere o texto ou link desejado.
3. Execute o prototipo novamente.
4. Revise as paginas afetadas.
5. Abra um Pull Request explicando a mudanca.

Exemplo: para mudar o e-mail exibido na pagina de contato, altere o item
`contact.channels` correspondente a `E-mail`.

## Como alterar imagens agora

A imagem principal da tela inicial fica em:

```ts
siteContent.home.hero.imageUrl
```

Ela pode apontar para uma URL externa ou, em uma evolucao posterior, para um
arquivo local versionado no projeto.

## Por que ainda nao ha painel administrativo de conteudo?

Um painel para editar textos e imagens diretamente pela Web precisa de recursos
que ainda nao fazem parte do Prototipo 1:

- autenticacao real;
- permissoes por perfil;
- persistencia do conteudo;
- validacao antes de publicar;
- auditoria de quem alterou o que;
- upload e gestao de arquivos.

Por isso, nesta fase, o conteudo e centralizado em codigo versionado. Essa
solucao e simples, rastreavel e permite revisao por Pull Request.

## Evolucao planejada

Quando usuarios e permissoes forem implementados, o projeto pode evoluir para um
modulo administrativo de conteudo com:

- formulario para editar textos institucionais;
- gestao de canais de contato;
- troca de imagens do portal;
- previa antes de publicar;
- historico de alteracoes;
- permissao especifica para administradores de conteudo.

Essa evolucao deve manter o mesmo contrato conceitual do `siteContent`, trocando
a fonte dos dados de arquivo versionado para API/banco de dados.
