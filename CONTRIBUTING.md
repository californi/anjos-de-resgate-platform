# Como Contribuir

Obrigado por ajudar a validar e melhorar a Plataforma Anjos de Resgate.

Este projeto evolui por incrementos pequenos. A prioridade e manter o prototipo
simples, rastreavel e facil de validar com a ONG.

## Formas de contribuir

- Validar funcionalidades e abrir Issues.
- Sugerir melhorias de texto, fluxo ou interface.
- Corrigir problemas pequenos por Pull Request.
- Melhorar documentacao, prints, diagramas e instrucoes de execucao.
- Adicionar testes proporcionais ao risco da mudanca.

## Fluxo recomendado no GitHub

1. Abra uma Issue descrevendo o problema ou sugestao.
2. Aguarde alinhamento quando a mudanca alterar escopo ou regra de negocio.
3. Crie uma branch curta, por exemplo:

```bash
git checkout -b ajuste/texto-sobre
```

4. Faca uma mudanca pequena e focada.
5. Execute a validacao possivel localmente.
6. Abra um Pull Request usando o template do repositorio.

## Como executar localmente

Com Docker:

```bash
docker compose up --build
```

Sem Docker, consulte `README.md` e `docs/16-execucao-prototipo-docker.md`.

## Padroes de implementacao

- Separar interface, aplicacao, dominio e infraestrutura.
- Reaproveitar `packages/domain`, `packages/shared` e `packages/ui`.
- Nao duplicar enums, labels ou regras de dominio.
- Validar entrada na API.
- Evitar modulos vazios ou preparacoes prematuras.
- Registrar decisoes relevantes em ADRs quando a decisao for arquitetural.
- Atualizar documentacao e diagramas quando o comportamento mudar.

## Escopo atual

O Prototipo 1 cobre portal institucional, listagem/detalhe de animais,
administracao inicial de animais e execucao com Docker.

Ainda nao implemente diretamente, sem alinhamento previo:

- autenticacao real;
- permissoes por perfil;
- fluxo completo de adocao;
- doacoes;
- apadrinhamento;
- campanhas;
- parcerias;
- dashboard e relatorios.

## Checklist antes de abrir PR

- [ ] A mudanca tem escopo pequeno e claro.
- [ ] O prototipo ainda executa localmente.
- [ ] Documentacao afetada foi atualizada.
- [ ] Prints ou evidencias foram atualizados quando necessario.
- [ ] Nao foram incluidos dados pessoais reais.
- [ ] Nao foram adicionadas dependencias desnecessarias.
