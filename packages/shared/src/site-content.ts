export const siteContent = {
  organization: {
    name: "Anjos de Resgate",
    platformName: "Plataforma Anjos de Resgate",
    shortName: "Anjos Resgate",
    location: "Sao Sebastiao do Paraiso/MG",
    description: "Plataforma em validacao incremental com a ONG Anjos de Resgate.",
  },
  navigation: [
    { label: "Sobre", href: "/sobre" },
    { label: "Animais", href: "/animais" },
    { label: "Apoie", href: "/apoie" },
    { label: "Contato", href: "/contato" },
    { label: "Admin", href: "/admin/animais" },
  ],
  home: {
    hero: {
      eyebrow: "Prototipo 3 - validacao funcional",
      title: "Plataforma Anjos de Resgate",
      description:
        "Uma plataforma Web/PWA para divulgar animais, receber interesses de adocao e organizar doacoes, campanhas e apadrinhamentos.",
      imageUrl:
        "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&w=1800&q=85",
      primaryAction: { label: "Ver animais disponiveis", href: "/animais" },
      secondaryAction: {
        label: "Acessar painel inicial",
        href: "/admin/animais",
      },
    },
    prototypeSection: {
      eyebrow: "Prototipo 3",
      title: "O que o prototipo ja demonstra",
      description:
        "Esta versao integra divulgacao, interesse inicial de adocao, contato por e-mail e diferentes formas de apoio financeiro.",
      features: [
        {
          title: "Adocao",
          description:
            "Feed publico com muitos animais e registro inicial de interesse para revisao posterior da equipe.",
        },
        {
          title: "Doacoes e campanhas",
          description:
            "Doacoes gerais e campanhas com metas, registro de doadores e confirmacao administrativa.",
        },
        {
          title: "Apadrinhamento",
          description:
            "Apoio unico ou mensal direcionado a um animal ou a uma necessidade especifica.",
        },
      ],
    },
    featuredAnimals: {
      eyebrow: "Animais em destaque",
      title: "Perfis para validacao",
      action: { label: "Abrir listagem completa", href: "/animais" },
    },
  },
  about: {
    hero: {
      eyebrow: "Sobre a ONG",
      title: "Anjos de Resgate",
      description:
        "A plataforma apoia a divulgacao de animais resgatados e organiza, de forma incremental, informacoes que hoje podem ficar dispersas entre redes sociais, mensagens e controles internos.",
      primaryAction: { label: "Ver animais", href: "/animais" },
      secondaryAction: { label: "Canais de contato", href: "/contato" },
    },
    summary: {
      eyebrow: "Validacao atual",
      title: "Prototipo atual",
      description:
        "A reuniao valida o feed de animais, as solicitacoes de interesse, o contato por e-mail e o registro de doacoes, campanhas, apadrinhamentos e necessidades por animal.",
      metrics: [
        { value: "30", label: "animais demo" },
        { value: "5", label: "telas admin" },
      ],
    },
    cards: [
      {
        title: "Finalidade do prototipo",
        description:
          "Nesta fase, o objetivo e validar se a ONG consegue divulgar animais, revisar interesses e organizar apoios gerais ou direcionados.",
      },
      {
        title: "Evolucao prevista",
        description:
          "As proximas iteracoes devem incluir triagem de adotantes, fluxo completo de adocao, integracao de pagamentos, parcerias, gestao de conteudo e indicadores administrativos.",
      },
      {
        title: "Como avaliamos",
        description:
          "Cada incremento sera validado com a equipe, registrando decisoes, evidencias, ajustes necessarios e riscos arquiteturais para as proximas entregas.",
      },
    ],
  },
  contact: {
    eyebrow: "Contato",
    title: "Fale com a ONG",
    description:
      "Envie uma mensagem para a equipe da ONG ou utilize os canais de atendimento.",
    channelsTitle: "Canais de atendimento",
    channels: [
      { label: "WhatsApp", value: "informar durante a validacao" },
      { label: "E-mail", value: "contato@anjosderesgate.local" },
      { label: "Cidade", value: "Sao Sebastiao do Paraiso/MG" },
    ],
    formTitle: "Mensagem de interesse",
    form: {
      nameLabel: "Nome",
      namePlaceholder: "Seu nome",
      emailLabel: "E-mail",
      emailPlaceholder: "voce@example.org",
      messageLabel: "Mensagem",
      messagePlaceholder: "Como podemos ajudar?",
      buttonLabel: "Enviar mensagem",
    },
  },
  support: {
    pix: {
      key: "PIX-DEMONSTRACAO",
      recipient: "Anjos de Resgate - ambiente de demonstracao",
    },
  },
  admin: {
    simulatedAccessCode: "anjos2026",
  },
} as const;
