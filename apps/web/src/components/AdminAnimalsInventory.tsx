import type { AnimalSnapshot } from "@anjos/domain";
import {
  animalSizeLabels,
  animalSpeciesLabels,
  animalStatusLabels,
  defaultAnimalPhotoUrl,
} from "@anjos/shared";
import { StatusUpdater } from "@/components/StatusUpdater";

type AdminAnimalsInventoryProps = {
  animals: AnimalSnapshot[];
  interestCountsByAnimalId?: Record<string, number>;
};

export function AdminAnimalsInventory({
  animals,
  interestCountsByAnimalId = {},
}: AdminAnimalsInventoryProps) {
  return (
    <div
      className="admin-inventory"
      aria-label="Inventario administrativo de animais"
    >
      {animals.map((animal) => {
        const interestCount = interestCountsByAnimalId[animal.id] ?? 0;
        const interestLabel =
          interestCount === 1 ? "1 interesse" : `${interestCount} interesses`;

        return (
          <article className="admin-inventory-item" key={animal.id}>
            <img
              className="admin-animal-thumb"
              src={animal.photoUrl ?? defaultAnimalPhotoUrl}
              alt={`Foto de ${animal.name}`}
            />

            <div className="admin-animal-summary">
              <h3>{animal.name}</h3>
              <div className="admin-animal-facts">
                <span>{animalSpeciesLabels[animal.species]}</span>
                <span>{animalSizeLabels[animal.size]}</span>
                <span>{animal.approximateAge}</span>
                <a href="/admin/animais/interesses">{interestLabel}</a>
              </div>
            </div>

            <span className="admin-status-pill">
              {animalStatusLabels[animal.status]}
            </span>

            <div className="admin-inventory-actions">
              <StatusUpdater animal={animal} />
              <a
                className="button-link secondary"
                href={`/admin/animais/${animal.id}/editar`}
              >
                Editar
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}
