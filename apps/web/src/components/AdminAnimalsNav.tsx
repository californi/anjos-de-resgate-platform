type AdminAnimalsNavProps = {
  active: "inventory" | "create" | "interests" | "support";
};

const links = [
  {
    key: "inventory",
    href: "/admin/animais",
    label: "Animais",
  },
  {
    key: "create",
    href: "/admin/animais/cadastro",
    label: "Cadastrar",
  },
  {
    key: "interests",
    href: "/admin/animais/interesses",
    label: "Solicitacoes",
  },
  {
    key: "support",
    href: "/admin/apoios",
    label: "Doacoes e apoios",
  },
] as const;

export function AdminAnimalsNav({ active }: AdminAnimalsNavProps) {
  return (
    <nav className="admin-section-nav" aria-label="Navegacao administrativa">
      {links.map((link) => (
        <a
          aria-current={link.key === active ? "page" : undefined}
          className={link.key === active ? "active" : undefined}
          href={link.href}
          key={link.key}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
