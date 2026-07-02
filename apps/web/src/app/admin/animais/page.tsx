import { AnimalCard } from "@anjos/ui";
import { AdminAccessGate } from "@/components/AdminAccessGate";
import { AnimalForm } from "@/components/AnimalForm";
import { StatusUpdater } from "@/components/StatusUpdater";
import { listAnimals } from "@/lib/api";

type AdminAnimalsPageProps = {
  searchParams: Promise<{ animal?: string }>;
};

export default async function AdminAnimalsPage({ searchParams }: AdminAnimalsPageProps) {
  const { animal: selectedAnimalId } = await searchParams;
  const { animals, source } = await listAnimals();
  const selectedAnimal = animals.find((animal) => animal.id === selectedAnimalId);

  return (
    <main>
      <div className="page-title">
        <p className="eyebrow">Painel administrativo inicial</p>
        <h1>Gestao de animais</h1>
        <p>Cadastro, edicao e status dos animais para validacao do Prototipo 1.</p>
        {source === "demo" ? (
          <p className="status-message">
            A API nao respondeu. O cadastro e a alteracao de status exigem a API ativa.
          </p>
        ) : null}
      </div>

      <AdminAccessGate>
        <section className="section admin-grid">
          <aside className="panel">
            <h2>{selectedAnimal ? "Editar animal" : "Cadastrar novo animal"}</h2>
            {selectedAnimalId && !selectedAnimal ? (
              <p className="status-message">Animal selecionado nao foi encontrado.</p>
            ) : null}
            <AnimalForm animal={selectedAnimal} />
          </aside>

          <div>
            <div className="section-header">
              <div>
                <p className="eyebrow">Animais cadastrados</p>
                <h2>Lista administrativa</h2>
              </div>
            </div>

            <div className="admin-list">
              {animals.map((animal) => (
                <div className="admin-item" key={animal.id}>
                  <AnimalCard animal={animal} mode="admin" />
                  <StatusUpdater animal={animal} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </AdminAccessGate>
    </main>
  );
}
