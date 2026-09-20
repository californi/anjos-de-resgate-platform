"use client";

import { FormEvent, useState } from "react";
import {
  AnimalSex,
  AnimalSize,
  AnimalSpecies,
  AnimalStatus,
  type AnimalSnapshot,
} from "@anjos/domain";
import {
  animalSexOptions,
  animalSizeOptions,
  animalSpeciesOptions,
  animalStatusOptions,
} from "@anjos/shared";
import { createAnimal, updateAnimal, uploadAnimalImage } from "@/lib/api";

type AnimalFormProps = {
  animal?: AnimalSnapshot;
  redirectAfterSave?: string;
};

export function AnimalForm({ animal, redirectAfterSave }: AnimalFormProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const isEditing = Boolean(animal);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const photoUrl = selectedImage
        ? await uploadAnimalImage(selectedImage)
        : data.get("photoUrl") || null;
      const payload = {
        name: data.get("name"),
        species: data.get("species") ?? AnimalSpecies.DOG,
        sex: data.get("sex") ?? AnimalSex.UNKNOWN,
        size: data.get("size") ?? AnimalSize.UNKNOWN,
        approximateAge: data.get("approximateAge"),
        description: data.get("description"),
        photoUrl,
        status: data.get("status") ?? AnimalStatus.AVAILABLE,
        specialNeeds: data.get("specialNeeds") === "on",
      };

      if (animal) {
        await updateAnimal(animal.id, payload);
      } else {
        await createAnimal(payload);
        form.reset();
      }

      setMessage(
        isEditing
          ? "Animal atualizado. Atualizando lista..."
          : "Animal cadastrado. Atualizando lista...",
      );
      if (redirectAfterSave) {
        window.location.assign(redirectAfterSave);
        return;
      }
      window.location.reload();
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Nome
        <input
          name="name"
          minLength={2}
          required
          defaultValue={animal?.name}
          placeholder="Ex.: Mel"
        />
      </label>

      <div className="form-row">
        <label>
          Especie
          <select
            name="species"
            defaultValue={animal?.species ?? AnimalSpecies.DOG}
          >
            {animalSpeciesOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Sexo
          <select name="sex" defaultValue={animal?.sex ?? AnimalSex.UNKNOWN}>
            {animalSexOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-row">
        <label>
          Porte
          <select name="size" defaultValue={animal?.size ?? AnimalSize.UNKNOWN}>
            {animalSizeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Status
          <select
            name="status"
            defaultValue={animal?.status ?? AnimalStatus.AVAILABLE}
          >
            {animalStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        Idade aproximada
        <input
          name="approximateAge"
          minLength={2}
          required
          defaultValue={animal?.approximateAge}
          placeholder="Ex.: 2 anos"
        />
      </label>

      <label>
        Foto do animal
        <input
          accept="image/jpeg,image/png,image/webp"
          name="photoFile"
          onChange={(event) =>
            setSelectedImage(event.target.files?.[0] ?? null)
          }
          type="file"
        />
        <span className="field-help">
          Selecione uma imagem JPG, PNG ou WebP de ate 5 MB.
        </span>
      </label>

      <label>
        URL alternativa da foto
        <input
          name="photoUrl"
          defaultValue={animal?.photoUrl ?? ""}
          placeholder="https://..."
        />
        <span className="field-help">
          A imagem selecionada acima tem prioridade sobre esta URL.
        </span>
      </label>

      <label>
        Descricao
        <textarea
          name="description"
          minLength={5}
          required
          defaultValue={animal?.description}
          placeholder="Resumo do perfil, comportamento e cuidados."
        />
      </label>

      <label className="checkbox-row">
        <input
          name="specialNeeds"
          type="checkbox"
          defaultChecked={animal?.specialNeeds ?? false}
        />
        Necessidades especiais
      </label>

      <button disabled={isSubmitting} type="submit">
        {isSubmitting
          ? "Salvando..."
          : isEditing
            ? "Salvar alteracoes"
            : "Cadastrar animal"}
      </button>

      {isEditing ? (
        <a className="button-link secondary" href="/admin/animais">
          Cancelar edicao
        </a>
      ) : null}

      {message ? <p className="status-message">{message}</p> : null}
    </form>
  );
}
