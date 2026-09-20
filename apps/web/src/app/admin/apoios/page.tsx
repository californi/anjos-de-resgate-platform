import { AdminAccessGate } from "@/components/AdminAccessGate";
import { AdminAnimalsNav } from "@/components/AdminAnimalsNav";
import { AdminSupportDashboard } from "@/components/AdminSupportDashboard";
import { getSupportAdminData, listAnimals } from "@/lib/api";

export default async function AdminSupportPage() {
  const [{ animals }, data] = await Promise.all([
    listAnimals(),
    getSupportAdminData(),
  ]);

  return (
    <main>
      <div className="page-title">
        <p className="eyebrow">Painel administrativo</p>
        <h1>Doacoes e apoios</h1>
        <p>
          Cadastre campanhas e necessidades, consulte doadores e confirme os
          apoios depois de conferir o recebimento.
        </p>
      </div>
      <AdminAccessGate>
        <section className="section compact-section">
          <AdminAnimalsNav active="support" />
          {data.source === "empty" ? (
            <p className="status-message">A API de apoios nao respondeu.</p>
          ) : (
            <AdminSupportDashboard animals={animals} {...data} />
          )}
        </section>
      </AdminAccessGate>
    </main>
  );
}
