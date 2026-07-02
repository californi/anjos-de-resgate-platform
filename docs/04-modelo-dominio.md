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
- `AdoptionInterest`
- `Donation`
- `Sponsorship`
- `Campaign`
- `Partner`
- `User`
- `Role`
- `Report`
