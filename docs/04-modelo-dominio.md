# Modelo de Dominio

## Entidade Animal

Campos iniciais:

- `id`
- `name`
- `species`
- `sex`
- `size`
- `approximateAge`
- `description`
- `photoUrl`
- `status`
- `specialNeeds`
- `createdAt`
- `updatedAt`

## Enums

`AnimalStatus`:

- `AVAILABLE`
- `IN_TREATMENT`
- `IN_ADOPTION_PROCESS`
- `ADOPTED`

`AnimalSpecies`:

- `DOG`
- `CAT`
- `OTHER`

`AnimalSex`:

- `MALE`
- `FEMALE`
- `UNKNOWN`

`AnimalSize`:

- `SMALL`
- `MEDIUM`
- `LARGE`
- `UNKNOWN`

## Entidades futuras

- `Adoptant`
- `Partner`
- `User`
- `Role`
- `Report`

## Entidade AdoptionInterest

Campos iniciais:

- `id`
- `animalId`
- `requesterName`
- `contact`
- `message`
- `status`
- `createdAt`
- `updatedAt`

`AdoptionInterestStatus`:

- `RECEIVED`
- `CONTACTED`
- `ARCHIVED`

Regras atuais:

- Um interesse pertence a um animal.
- O registro publico so e bloqueado quando o animal esta
  `IN_ADOPTION_PROCESS`.
- O interesse inicia como `RECEIVED`.
- O interesse nao altera automaticamente o status do animal.

## Apoios financeiros

`Campaign` representa uma arrecadacao com titulo, descricao, meta e status.

`AnimalNeed` representa uma necessidade vinculada a um animal, com categoria,
meta opcional e status.

`Donor` registra nome e e-mail da pessoa apoiadora. O e-mail e unico e permite
reutilizar o cadastro em novos apoios.

`SupportRecord` registra valor em centavos, frequencia, status e um dos destinos:

- `GENERAL`: uso geral pela ONG;
- `CAMPAIGN`: exige campanha ativa;
- `SPONSORSHIP`: exige animal;
- `ANIMAL_NEED`: exige necessidade aberta e deriva o animal vinculado.

Todo apoio inicia como `PLEDGED`. Apenas `CONFIRMED` compoe o progresso de
campanhas e necessidades. `CANCELLED` preserva o historico sem somar valores.
