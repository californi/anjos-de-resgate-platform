import type { AnimalSnapshot } from "@anjos/domain";
import {
  animalSizeLabels,
  animalSpeciesLabels,
  animalStatusLabels,
  defaultAnimalPhotoUrl
} from "@anjos/shared";

export type AnimalCardProps = {
  animal: AnimalSnapshot;
  detailsHref?: string;
  interestHref?: string;
  adminHref?: string;
  mode?: "public" | "admin";
};

export function AnimalCard({
  animal,
  detailsHref = `/animais/${animal.id}`,
  interestHref = "#interesse-futuro",
  adminHref = `/admin/animais?animal=${animal.id}`,
  mode = "public"
}: AnimalCardProps) {
  return (
    <article className="animal-card">
      <img
        className="animal-card__image"
        src={animal.photoUrl ?? defaultAnimalPhotoUrl}
        alt={`Foto de ${animal.name}`}
      />
      <div className="animal-card__body">
        <div className="animal-card__heading">
          <div>
            <p className="animal-card__eyebrow">{animalSpeciesLabels[animal.species]}</p>
            <h3>{animal.name}</h3>
          </div>
          <span className="animal-card__status">{animalStatusLabels[animal.status]}</span>
        </div>

        <dl className="animal-card__facts">
          <div>
            <dt>Porte</dt>
            <dd>{animalSizeLabels[animal.size]}</dd>
          </div>
          <div>
            <dt>Idade</dt>
            <dd>{animal.approximateAge}</dd>
          </div>
        </dl>

        <p className="animal-card__description">{animal.description}</p>

        <div className="animal-card__actions">
          <a href={detailsHref}>Ver detalhes</a>
          {mode === "admin" ? (
            <a href={adminHref}>Editar</a>
          ) : (
            <a aria-disabled="true" href={interestHref}>
              Tenho interesse
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
