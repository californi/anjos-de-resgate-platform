import { AnimalCard } from "@anjos/ui";
import { listAnimals } from "@/lib/api";

export default async function AnimalsPage() {
  const { animals, source } = await listAnimals();

  return (
    <main>
      <div className="page-title">
        <p className="eyebrow">Portal publico</p>
        <h1>Animais disponiveis</h1>
        <p>
          Perfis iniciais para demonstrar a divulgacao de animais da ONG. O botao
          "Tenho interesse" ainda e visual e sera ligado ao fluxo de adocao em outra
          iteracao.
        </p>
        {source === "demo" ? (
          <p className="status-message">
            Exibindo dados de demonstracao porque a API nao respondeu.
          </p>
        ) : null}
      </div>

      <section className="section">
        <div className="animal-grid">
          {animals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      </section>
    </main>
  );
}
