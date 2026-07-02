export const siteContent = {
  organization: {
    name: "Anjos de Resgate",
    platformName: "Plataforma Anjos de Resgate",
    shortName: "Anjos Resgate",
    location: "Sao Sebastiao do Paraiso/MG",
    description: "Prototipo inicial para apoio a ONG Anjos de Resgate."
  },
  navigation: [
    { label: "Sobre", href: "/sobre" },
    { label: "Animais", href: "/animais" },
    { label: "Contato", href: "/contato" },
    { label: "Admin", href: "/admin/animais" }
  ],
  home: {
    hero: {
      eyebrow: "Prototipo funcional - validacao em 17/06/2026",
      title: "Plataforma Anjos de Resgate",
      description:
        "Uma base Web/PWA para divulgar animais, apoiar a rotina da ONG e preparar os proximos modulos de adocao, doacoes, apadrinhamento e parcerias.",
      imageUrl:
        "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&w=1800&q=85",
      primaryAction: { label: "Ver animais disponiveis", href: "/animais" },
      secondaryAction: { label: "Acessar painel inicial", href: "/admin/animais" }
    },
    prototypeSection: {
      eyebrow: "Primeira iteracao",
      title: "O que o prototipo ja demonstra",
      description:
        "O foco desta versao e validar a estrutura inicial e o fluxo de cadastro e divulgacao de animais.",
      features: [
        {
          title: "Adocao",
          description:
            "Listagem publica com cards preparados para evoluir para uma experiencia de descoberta estilo swipe."
        },
        {
          title: "Doacoes futuras",
          description:
            "Area destacada no portal para comunicar que doacoes gerais serao integradas em uma iteracao posterior."
        },
        {
          title: "Apadrinhamento futuro",
          description:
            "O dominio ja reserva espaco para campanhas de apoio recorrente a animais em tratamento ou longa permanencia."
        }
      ]
    },
    featuredAnimals: {
      eyebrow: "Animais em destaque",
      title: "Primeiros perfis para validacao",
      action: { label: "Abrir listagem completa", href: "/animais" }
    }
  },
  about: {
    hero: {
      eyebrow: "Sobre a ONG",
      title: "Anjos de Resgate",
      description:
        "A plataforma apoia a divulgacao de animais resgatados e organiza, de forma incremental, informacoes que hoje podem ficar dispersas entre redes sociais, mensagens e controles internos.",
      primaryAction: { label: "Ver animais", href: "/animais" },
      secondaryAction: { label: "Canais de contato", href: "/contato" }
    },
    summary: {
      eyebrow: "Validacao atual",
      title: "Prototipo 1",
      description:
        "A reuniao valida a vitrine publica de animais, o cadastro administrativo e a alteracao de status antes dos fluxos completos de adocao e doacao.",
      metrics: [
        { value: "3", label: "rotas publicas" },
        { value: "1", label: "painel inicial" }
      ]
    },
    cards: [
      {
        title: "Finalidade do prototipo",
        description:
          "Nesta fase, o objetivo e validar se a ONG consegue manter uma vitrine simples de animais, com cadastro administrativo e atualizacao de status."
      },
      {
        title: "Evolucao prevista",
        description:
          "As proximas iteracoes devem incluir fluxo de interesse em adocao, doacoes, apadrinhamento, campanhas, parcerias, experiencia mobile/PWA e indicadores administrativos."
      },
      {
        title: "Como avaliamos",
        description:
          "Cada incremento sera validado com a equipe, registrando decisoes, evidencias, ajustes necessarios e riscos arquiteturais para as proximas entregas."
      }
    ]
  },
  contact: {
    eyebrow: "Contato",
    title: "Fale com a ONG",
    description:
      "Esta pagina organiza os canais de contato usados na validacao do portal. O envio automatico de mensagens ainda nao faz parte deste prototipo.",
    channelsTitle: "Canais de atendimento",
    channels: [
      { label: "WhatsApp", value: "informar durante a validacao" },
      { label: "E-mail", value: "contato@anjosderesgate.local" },
      { label: "Cidade", value: "Sao Sebastiao do Paraiso/MG" }
    ],
    formTitle: "Mensagem de interesse",
    form: {
      nameLabel: "Nome",
      namePlaceholder: "Formulario sera ativado em iteracao futura",
      messageLabel: "Mensagem",
      messagePlaceholder: "Por enquanto, use os canais informados.",
      buttonLabel: "Envio futuro"
    }
  },
  admin: {
    simulatedAccessCode: "anjos2026"
  }
} as const;
