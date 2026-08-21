import { AdminAccessGate } from "@/components/AdminAccessGate";
import { AdminAnimalsNav } from "@/components/AdminAnimalsNav";
import { AnimalForm } from "@/components/AnimalForm";

export default function AdminAnimalCreatePage() {
  return (
    <main>
      <div className="page-title">
        <p className="eyebrow">Cadastro de animais</p>
        <h1>Cadastrar animal</h1>
        <p>
          Tela dedicada para registrar um novo perfil animal sem misturar a
          tarefa de cadastro com edicao ou analise de solicitacoes.
        </p>
      </div>

      <AdminAccessGate>
        <section className="section compact-section">
          <AdminAnimalsNav active="create" />
          <div className="panel narrow-panel">
            <AnimalForm redirectAfterSave="/admin/animais" />
          </div>
        </section>
      </AdminAccessGate>
    </main>
  );
}
