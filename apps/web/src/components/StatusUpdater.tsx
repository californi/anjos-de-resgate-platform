"use client";

import { useState } from "react";
import type { AnimalSnapshot, AnimalStatus } from "@anjos/domain";
import { animalStatusOptions } from "@anjos/shared";
import { updateAnimalStatus } from "@/lib/api";

type StatusUpdaterProps = {
  animal: AnimalSnapshot;
};

export function StatusUpdater({ animal }: StatusUpdaterProps) {
  const [status, setStatus] = useState(animal.status);
  const [message, setMessage] = useState<string | null>(null);

  async function handleChange(nextStatus: AnimalStatus) {
    setStatus(nextStatus);
    setMessage("Salvando...");
    try {
      await updateAnimalStatus(animal.id, nextStatus);
      setMessage("Status atualizado");
    } catch (error) {
      setStatus(animal.status);
      setMessage((error as Error).message);
    }
  }

  return (
    <div>
      <select
        aria-label={`Alterar status de ${animal.name}`}
        className="status-select"
        value={status}
        onChange={(event) => handleChange(event.target.value as AnimalStatus)}
      >
        {animalStatusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {message ? <p className="muted">{message}</p> : null}
    </div>
  );
}
