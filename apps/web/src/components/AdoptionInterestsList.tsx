import type { AdoptionInterestSnapshot, AnimalSnapshot } from "@anjos/domain";
import { adoptionInterestStatusLabels } from "@anjos/shared";

type AdoptionInterestsListProps = {
  animals: AnimalSnapshot[];
  interests: AdoptionInterestSnapshot[];
  source: "api" | "empty";
};

export function AdoptionInterestsList({
  animals,
  interests,
  source,
}: AdoptionInterestsListProps) {
  const animalsById = new Map(
    animals.map((animal) => [animal.id, animal.name]),
  );
  const summaries = Array.from(
    interests.reduce((counts, interest) => {
      const current = counts.get(interest.animalId) ?? {
        animalId: interest.animalId,
        count: 0,
        latest: interest.createdAt,
      };

      counts.set(interest.animalId, {
        animalId: interest.animalId,
        count: current.count + 1,
        latest:
          interest.createdAt > current.latest
            ? interest.createdAt
            : current.latest,
      });

      return counts;
    }, new Map<string, { animalId: string; count: number; latest: Date }>()),
  )
    .map(([, summary]) => summary)
    .sort((left, right) => right.count - left.count);

  return (
    <section className="section compact-section">
      <div className="section-header">
        <div>
          <p className="eyebrow">Interesses de adocao</p>
          <h2>Solicitacoes recebidas</h2>
        </div>
      </div>

      {source === "empty" ? (
        <p className="status-message">
          A API nao respondeu ou ainda nao ha interesses registrados neste
          ambiente.
        </p>
      ) : null}

      {interests.length === 0 ? (
        <div className="panel">
          <p>Nenhum interesse registrado ate o momento.</p>
        </div>
      ) : (
        <div className="interest-dashboard">
          <div className="interest-summary-grid">
            {summaries.map((summary) => (
              <article className="interest-summary-card" key={summary.animalId}>
                <p className="eyebrow">
                  {animalsById.get(summary.animalId) ?? summary.animalId}
                </p>
                <strong>{summary.count}</strong>
                <span>
                  {summary.count === 1
                    ? "interesse registrado"
                    : "interesses registrados"}
                </span>
                <small>
                  Ultimo em {summary.latest.toLocaleDateString("pt-BR")}
                </small>
              </article>
            ))}
          </div>

          <div className="interest-list">
            {interests.map((interest) => (
              <article className="panel interest-item" key={interest.id}>
                <div>
                  <p className="eyebrow">
                    {adoptionInterestStatusLabels[interest.status]}
                  </p>
                  <h3>{interest.requesterName}</h3>
                  <p>
                    <strong>Animal:</strong>{" "}
                    {animalsById.get(interest.animalId) ?? interest.animalId}
                  </p>
                  <p>
                    <strong>Contato:</strong> {interest.contact}
                  </p>
                  {interest.message ? <p>{interest.message}</p> : null}
                </div>
                <small>
                  Recebido em {interest.createdAt.toLocaleDateString("pt-BR")}
                </small>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
