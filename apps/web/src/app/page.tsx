import type { CSSProperties } from "react";
import { AnimalCard } from "@anjos/ui";
import { siteContent } from "@anjos/shared";
import { listAnimals } from "@/lib/api";

export default async function HomePage() {
  const { animals } = await listAnimals();
  const featuredAnimals = animals.slice(0, 3);
  const { home } = siteContent;
  const heroStyle = {
    "--hero-image": `url("${home.hero.imageUrl}")`
  } as CSSProperties;

  return (
    <main>
      <section className="hero" style={heroStyle}>
        <div className="hero-content">
          <p className="eyebrow">{home.hero.eyebrow}</p>
          <h1>{home.hero.title}</h1>
          <p>{home.hero.description}</p>
          <div className="hero-actions">
            <a className="button-link" href={home.hero.primaryAction.href}>
              {home.hero.primaryAction.label}
            </a>
            <a className="button-link secondary" href={home.hero.secondaryAction.href}>
              {home.hero.secondaryAction.label}
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">{home.prototypeSection.eyebrow}</p>
            <h2>{home.prototypeSection.title}</h2>
          </div>
          <p>{home.prototypeSection.description}</p>
        </div>

        <div className="feature-grid">
          {home.prototypeSection.features.map((feature) => (
            <div className="feature" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">{home.featuredAnimals.eyebrow}</p>
            <h2>{home.featuredAnimals.title}</h2>
          </div>
          <a className="button-link secondary" href={home.featuredAnimals.action.href}>
            {home.featuredAnimals.action.label}
          </a>
        </div>

        <div className="animal-grid">
          {featuredAnimals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      </section>
    </main>
  );
}
