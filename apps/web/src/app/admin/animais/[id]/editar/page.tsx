import { notFound } from "next/navigation";
import { AdminAccessGate } from "@/components/AdminAccessGate";
import { AdminAnimalsNav } from "@/components/AdminAnimalsNav";
import { AnimalForm } from "@/components/AnimalForm";
import { getAnimalById } from "@/lib/api";

type AdminAnimalEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminAnimalEditPage({
  params,
}: AdminAnimalEditPageProps) {
  const { id } = await params;
  const animal = await getAnimalById(id);

  if (!animal) {
    notFound();
  }

  return (
    <main>
      <div className="page-title">
        <p className="eyebrow">Edicao de animais</p>
        <h1>Editar {animal.name}</h1>
        <p>
          Tela dedicada para revisar dados, imagem, descricao e status de um
          animal ja cadastrado.
        </p>
      </div>

      <AdminAccessGate>
        <section className="section compact-section">
          <AdminAnimalsNav active="inventory" />
          <div className="panel narrow-panel">
            <AnimalForm animal={animal} redirectAfterSave="/admin/animais" />
          </div>
        </section>
      </AdminAccessGate>
    </main>
  );
}
