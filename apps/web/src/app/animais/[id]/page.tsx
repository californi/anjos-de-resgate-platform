import { notFound } from "next/navigation";
import {
  animalSexLabels,
  animalSizeLabels,
  animalSpeciesLabels,
  animalStatusLabels,
  defaultAnimalPhotoUrl
} from "@anjos/shared";
import { getAnimalById } from "@/lib/api";

type AnimalDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AnimalDetailPage({ params }: AnimalDetailPageProps) {
  const { id } = await params;
  const animal = await getAnimalById(id);

  if (!animal) {
    notFound();
  }

  return (
    <main>
      <div className="page-title">
        <p className="eyebrow">Perfil do animal</p>
        <h1>{animal.name}</h1>
        <p>{animal.description}</p>
      </div>

      <section className="section detail-layout">
        <img src={animal.photoUrl ?? defaultAnimalPhotoUrl} alt={`Foto de ${animal.name}`} />
        <div className="panel">
          <h2>Informacoes principais</h2>
          <p>
            <strong>Especie:</strong> {animalSpeciesLabels[animal.species]}
          </p>
          <p>
            <strong>Sexo:</strong> {animalSexLabels[animal.sex]}
          </p>
          <p>
            <strong>Porte:</strong> {animalSizeLabels[animal.size]}
          </p>
          <p>
            <strong>Idade aproximada:</strong> {animal.approximateAge}
          </p>
          <p>
            <strong>Status:</strong> {animalStatusLabels[animal.status]}
          </p>
          <p>
            <strong>Necessidades especiais:</strong> {animal.specialNeeds ? "Sim" : "Nao"}
          </p>
          <div className="page-actions">
            <a className="button-link" href="#interesse-futuro">
              Tenho interesse
            </a>
            <a className="button-link secondary" href="/animais">
              Voltar
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
