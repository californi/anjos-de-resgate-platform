import { AdminAccessGate } from "@/components/AdminAccessGate";
import { AdminAnimalsNav } from "@/components/AdminAnimalsNav";
import { AdoptionInterestsList } from "@/components/AdoptionInterestsList";
import { listAdoptionInterests, listAnimals } from "@/lib/api";

export default async function AdminAnimalInterestsPage() {
  const { animals } = await listAnimals();
  const { interests, source } = await listAdoptionInterests();

  return (
    <main>
      <div className="page-title">
        <p className="eyebrow">Solicitacoes de interesse</p>
        <h1>Interesses por animal</h1>
        <p>
          Tela dedicada para acompanhar quantas pessoas demonstraram interesse
          em cada animal e revisar os contatos recebidos pela equipe.
        </p>
      </div>

      <AdminAccessGate>
        <section className="section compact-section">
          <AdminAnimalsNav active="interests" />
        </section>
        <AdoptionInterestsList
          animals={animals}
          interests={interests}
          source={source}
        />
      </AdminAccessGate>
    </main>
  );
}
