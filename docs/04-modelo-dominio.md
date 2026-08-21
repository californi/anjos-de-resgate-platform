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
- `Donation`
- `Sponsorship`
- `Campaign`
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
