import { AnimalStatus, type AnimalSnapshot } from "@anjos/domain";
import {
  animalSizeLabels,
  animalSpeciesLabels,
  animalStatusLabels,
  defaultAnimalPhotoUrl,
} from "@anjos/shared";

type AnimalFeedProps = {
  animals: AnimalSnapshot[];
};

export function AnimalFeed({ animals }: AnimalFeedProps) {
  const availableCount = animals.filter(
    (animal) => animal.status === AnimalStatus.AVAILABLE,
  ).length;
  const treatmentCount = animals.filter(
    (animal) => animal.status === AnimalStatus.IN_TREATMENT,
  ).length;

  return (
    <div className="animal-feed-shell">
      <div className="animal-feed-summary">
        <strong>{animals.length} animais no feed</strong>
        <span>{availableCount} disponiveis</span>
        <span>{treatmentCount} em tratamento</span>
      </div>

      <div className="animal-feed" aria-label="Feed compacto de animais">
        {animals.map((animal) => (
          <article className="animal-tile" key={animal.id}>
            <a className="animal-tile__media" href={`/animais/${animal.id}`}>
              <img
                src={animal.photoUrl ?? defaultAnimalPhotoUrl}
                alt={`Foto de ${animal.name}`}
              />
              <span className="animal-tile__status">
                {animalStatusLabels[animal.status]}
              </span>
            </a>
            <div className="animal-tile__body">
              <div>
                <p>{animalSpeciesLabels[animal.species]}</p>
                <h2>{animal.name}</h2>
              </div>
              <span>{animalSizeLabels[animal.size]}</span>
            </div>
            <div className="animal-tile__actions">
              <a href={`/animais/${animal.id}`}>Detalhes</a>
              <a href={`/animais/${animal.id}#interesse`}>Interesse</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
