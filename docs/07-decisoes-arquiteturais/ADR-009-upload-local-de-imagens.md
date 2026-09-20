# ADR-009 - Upload local de imagens no prototipo

## Status

Aceita em 2026-09-18 para o Prototipo 3.

## Contexto

O cadastro aceitava apenas uma URL de foto. A equipe da ONG precisa selecionar
uma imagem armazenada no dispositivo usado no cadastro, sem depender de um
servico externo de imagens.

## Decisao

Adicionar `POST /uploads/images` com `multipart/form-data`, aceitando JPG, PNG e
WebP de ate 5 MB. A API grava o arquivo em diretorio configuravel por
`UPLOAD_DIR` e o disponibiliza por `GET /uploads/:filename`.

No Docker, o diretorio usa o volume persistente `uploads_data`. O formulario
mantem a URL alternativa para migracao e compatibilidade com os dados atuais;
quando um arquivo e selecionado, ele tem prioridade.

## Consequencias

- O usuario pode selecionar fotos do computador ou dispositivo movel.
- Reiniciar containers nao apaga as imagens enquanto o volume for preservado.
- O prototipo ainda nao possui redimensionamento, moderacao, remocao ou storage
  externo.
- Uma implantacao publica devera avaliar object storage, backup, antivirus,
  controle de acesso e politica de retencao.

## Evidencias

- `apps/api/src/uploads`
- `apps/web/src/components/AnimalForm.tsx`
- `docker-compose.yml`

