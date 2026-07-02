import { siteContent } from "@anjos/shared";

export default function AboutPage() {
  const { about } = siteContent;

  return (
    <main>
      <section className="section about-hero">
        <div>
          <p className="eyebrow">{about.hero.eyebrow}</p>
          <h1>{about.hero.title}</h1>
          <p>{about.hero.description}</p>
          <div className="page-actions">
            <a className="button-link" href={about.hero.primaryAction.href}>
              {about.hero.primaryAction.label}
            </a>
            <a className="button-link secondary" href={about.hero.secondaryAction.href}>
              {about.hero.secondaryAction.label}
            </a>
          </div>
        </div>

        <aside className="panel about-summary" aria-label="Resumo do prototipo">
          <p className="eyebrow">{about.summary.eyebrow}</p>
          <h2>{about.summary.title}</h2>
          <p>{about.summary.description}</p>
          <div className="about-metrics">
            {about.summary.metrics.map((metric) => (
              <span key={metric.label}>
                <strong>{metric.value}</strong>
                {metric.label}
              </span>
            ))}
          </div>
        </aside>
      </section>

      <section className="section content-grid compact-section">
        {about.cards.map((card) => (
          <article className="panel" key={card.title}>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
