import { AdminAccessGate } from "@/components/AdminAccessGate";
import { AdminAnimalsNav } from "@/components/AdminAnimalsNav";
import { AdminAnimalsInventory } from "@/components/AdminAnimalsInventory";
import { listAdoptionInterests, listAnimals } from "@/lib/api";

export default async function AdminAnimalsPage() {
  const { animals, source } = await listAnimals();
  const { interests, source: interestsSource } = await listAdoptionInterests();
  const interestCountsByAnimalId = interests.reduce<Record<string, number>>(
    (counts, interest) => {
      counts[interest.animalId] = (counts[interest.animalId] ?? 0) + 1;
      return counts;
    },
    {},
  );

  return (
    <main>
      <div className="page-title">
        <p className="eyebrow">Painel administrativo inicial</p>
        <h1>Gestao de animais</h1>
        <p>
          Inventario compacto para acompanhar muitos perfis, alterar status e
          acessar as telas separadas de cadastro, edicao e solicitacoes.
        </p>
        {source === "demo" ? (
          <p className="status-message">
            A API nao respondeu. O cadastro e a alteracao de status exigem a API
            ativa.
          </p>
        ) : null}
      </div>

      <AdminAccessGate>
        <section className="section compact-section">
          <AdminAnimalsNav active="inventory" />
          {interestsSource === "empty" ? (
            <p className="status-message">
              A contagem de interesses nao esta disponivel porque a API de
              solicitacoes nao respondeu.
            </p>
          ) : null}
          <div className="admin-toolbar">
            <a className="button-link" href="/admin/animais/cadastro">
              Cadastrar animal
            </a>
            <a
              className="button-link secondary"
              href="/admin/animais/interesses"
            >
              Ver solicitacoes de interesse
            </a>
          </div>

          <div className="panel">
            <div className="section-header">
              <div>
                <p className="eyebrow">Animais cadastrados</p>
                <h2>Lista administrativa</h2>
              </div>
              <p className="muted">{animals.length} perfis carregados</p>
            </div>

            <AdminAnimalsInventory
              animals={animals}
              interestCountsByAnimalId={interestCountsByAnimalId}
            />
          </div>
        </section>
      </AdminAccessGate>
    </main>
  );
}
