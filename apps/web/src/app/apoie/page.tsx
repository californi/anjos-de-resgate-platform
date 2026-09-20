import { siteContent } from "@anjos/shared";
import { SupportHub } from "@/components/SupportHub";
import { getSupportOverview, listAnimals } from "@/lib/api";

type SupportPageProps = {
  searchParams: Promise<{ animalId?: string }>;
};

export default async function SupportPage({ searchParams }: SupportPageProps) {
  const { animalId } = await searchParams;
  const [{ animals }, overview] = await Promise.all([
    listAnimals(),
    getSupportOverview(),
  ]);

  return (
    <main>
      <div className="page-title">
        <p className="eyebrow">Doacoes e apadrinhamento</p>
        <h1>Apoie os animais resgatados</h1>
        <p>
          Escolha uma doacao geral, uma campanha, um apadrinhamento ou uma
          necessidade especifica. Todo apoio e conferido pela equipe da ONG.
        </p>
      </div>
      <SupportHub
        animals={animals}
        campaigns={overview.campaigns}
        initialAnimalId={animalId}
        needs={overview.needs}
        pixKey={process.env.PIX_KEY ?? siteContent.support.pix.key}
        pixRecipient={
          process.env.PIX_RECIPIENT ?? siteContent.support.pix.recipient
        }
      />
    </main>
  );
}
