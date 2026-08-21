import { AnimalFeed } from "@/components/AnimalFeed";
import { listAnimals } from "@/lib/api";

export default async function AnimalsPage() {
  const { animals, source } = await listAnimals();

  return (
    <main>
      <div className="page-title">
        <p className="eyebrow">Portal publico</p>
        <h1>Animais disponiveis</h1>
        <p>
          Feed compacto para divulgar muitos animais sem perder o acesso rapido
          ao detalhe e ao registro inicial de interesse. Os dados desta versao
          sao ficticios e servem para validacao com a equipe.
        </p>
        {source === "demo" ? (
          <p className="status-message">
            Exibindo dados de demonstracao porque a API nao respondeu.
          </p>
        ) : null}
      </div>

      <section className="section">
        <AnimalFeed animals={animals} />
      </section>
    </main>
  );
}
