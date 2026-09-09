/**
 * Every figure, commitment and product name below is taken from an official
 * Microsoft source. `source` holds the URL the claim came from so the copy can
 * be re-verified when the next fiscal year or sustainability report lands.
 */

export const SQUARE = {
  red: "#f25022",
  green: "#7fba00",
  blue: "#00a4ef",
  yellow: "#ffb900",
} as const;

export type SquareColor = keyof typeof SQUARE;

export const mission = {
  statement:
    "Capacitar todas as pessoas e organizações do planeta a conquistar mais.",
  source: "https://www.microsoft.com/pt-br/about",
};

export const nav = [
  { label: "Missão", href: "#missao" },
  { label: "Resultados", href: "#resultados" },
  { label: "Plataforma", href: "#plataforma" },
  { label: "Sustentabilidade", href: "#sustentabilidade" },
  { label: "Acessibilidade", href: "#acessibilidade" },
] as const;

export type Commitment = {
  id: string;
  color: SquareColor;
  title: string;
  body: string;
};

/** The four enduring commitments — microsoft.com/en-us/about */
export const commitments: Commitment[] = [
  {
    id: "oportunidade",
    color: "red",
    title: "Ampliar oportunidades",
    body: "Ampliamos a oportunidade e o crescimento econômico para todos, levando habilidades e ferramentas de IA a escolas, faculdades comunitárias e organizações sem fins lucrativos.",
  },
  {
    id: "confianca",
    color: "blue",
    title: "Conquistar confiança",
    body: "Criamos um mundo digital seguro, protegido e responsável, com segurança e privacidade tratadas como requisito de engenharia, não como recurso adicional.",
  },
  {
    id: "direitos",
    color: "green",
    title: "Proteger direitos fundamentais",
    body: "Apoiamos e promovemos os direitos fundamentais das pessoas, da privacidade e da acessibilidade à proteção de comunidades em contextos de risco.",
  },
  {
    id: "sustentabilidade-compromisso",
    color: "yellow",
    title: "Avançar em sustentabilidade",
    body: "Assumimos o compromisso de cumprir nossas próprias metas climáticas e de permitir que nossos clientes façam o mesmo.",
  },
];

export const values = ["Respeito", "Integridade", "Responsabilidade"] as const;

/** Fiscal year 2026, ended 30 June 2026. Reported 29 July 2026. */
export const fiscalYear = {
  label: "Ano fiscal de 2026, encerrado em 30 de junho de 2026",
  source:
    "https://www.microsoft.com/en-us/investor/earnings/fy-2026-q4/press-release-webcast",
  metrics: [
    {
      value: "US$ 331,8 bi",
      delta: "+18%",
      label: "Receita anual",
      note: "Alta de 16% em moeda constante.",
    },
    {
      value: "US$ 155,2 bi",
      delta: "+21%",
      label: "Resultado operacional",
      note: "Margem operacional em expansão no período.",
    },
    {
      value: "US$ 59,3 bi",
      delta: "+27%",
      label: "Microsoft Cloud no 4º tri",
      note: "Receita de nuvem no trimestre encerrado em junho.",
    },
    {
      value: "US$ 678 bi",
      delta: "+84%",
      label: "Contratos a reconhecer",
      note: "Receita contratada ainda não reconhecida ao fim do 4º tri.",
    },
  ],
};

export type PlatformPillar = {
  index: string;
  color: SquareColor;
  title: string;
  body: string;
  items: string[];
  href: string;
};

export const platform: PlatformPillar[] = [
  {
    index: "01",
    color: "blue",
    title: "IA e Copilot",
    body: "O Copilot atravessa a linha de produtos — do Microsoft 365 ao Windows, da segurança ao GitHub — apoiado nos princípios de IA responsável da empresa.",
    items: [
      "Microsoft Copilot",
      "Copilot no Microsoft 365",
      "GitHub Copilot",
      "Security Copilot",
    ],
    href: "https://www.microsoft.com/pt-br/ai",
  },
  {
    index: "02",
    color: "red",
    title: "Nuvem e infraestrutura",
    body: "O Azure opera em mais de 70 regiões anunciadas. Cada região reúne datacenters ligados por uma rede tolerante a falhas, com zonas de disponibilidade independentes em energia, refrigeração e rede.",
    items: [
      "Azure",
      "Zonas de disponibilidade",
      "Azure Arc",
      "Residência de dados por geografia",
    ],
    href: "https://azure.microsoft.com/pt-br/explore/global-infrastructure",
  },
  {
    index: "03",
    color: "green",
    title: "Segurança",
    body: "Identidade, dispositivos, dados e detecção sob um mesmo conjunto de sinais, para que a resposta a incidentes não dependa de ferramentas desconectadas.",
    items: [
      "Microsoft Entra",
      "Microsoft Defender",
      "Microsoft Purview",
      "Microsoft Sentinel",
      "Microsoft Intune",
    ],
    href: "https://www.microsoft.com/pt-br/security",
  },
  {
    index: "04",
    color: "yellow",
    title: "Dados e produtividade",
    body: "Uma camada analítica única sobre a qual o trabalho acontece, do modelo de dados à apresentação, integrada às ferramentas que as equipes já usam.",
    items: [
      "Microsoft Fabric",
      "Power BI",
      "Microsoft 365",
      "Dynamics 365",
    ],
    href: "https://www.microsoft.com/pt-br/microsoft-fabric",
  },
];

export const sustainability = {
  source:
    "https://www.microsoft.com/pt-br/corporate-responsibility/sustainability",
  milestoneSource:
    "https://blogs.microsoft.com/blog/2026/02/18/a-milestone-achievement-in-our-journey-to-carbon-negative/",
  goals: [
    {
      title: "Negativa em carbono",
      body: "Remover mais carbono do que emite, na operação e na cadeia de valor.",
    },
    {
      title: "Positiva em água",
      body: "Repor mais água do que consome nas bacias sob estresse hídrico.",
    },
    {
      title: "Resíduo zero",
      body: "Reduzir na origem, manter materiais em uso e recuperar o que restar.",
    },
    {
      title: "Ecossistemas protegidos",
      body: "Proteger permanentemente mais área de terra do que a empresa ocupa.",
    },
  ],
  milestone: {
    stat: "34 GW",
    label: "de ativos de energia renovável contratados em 24 países",
    body: "Em fevereiro de 2026 a Microsoft anunciou ter igualado 100% do consumo anual global de eletricidade com energia renovável — um marco na trajetória rumo à meta de ser negativa em carbono até 2030.",
  },
  longTerm:
    "Até 2050, a empresa pretende remover do ambiente todo o carbono que emitiu desde sua fundação, em 1975.",
};

export const accessibility = {
  source: "https://www.microsoft.com/pt-br/accessibility",
  lead: "Acessibilidade é tratada como parte do produto, não como correção posterior. A meta declarada da empresa é tornar a acessibilidade mais simples para todos.",
  points: [
    {
      title: "Disability Answer Desk",
      body: "Suporte dedicado a clientes com deficiência em Microsoft 365, Windows, Xbox e Surface, por chat, telefone ou língua de sinais americana (ASL).",
    },
    {
      title: "IA testada com tecnologia assistiva",
      body: "Agentes de IA são avaliados com leitores de tela e navegação por teclado antes de chegarem aos clientes.",
    },
    {
      title: "European Accessibility Act",
      body: "Atualizações em produtos como Windows, Teams e Outlook para alinhamento às normas de acessibilidade da União Europeia.",
    },
  ],
};

export const elevate = {
  source: "https://blogs.microsoft.com/on-the-issues/2025/07/09/elevate/",
  stat: "US$ 4 bi",
  body: "Pela Microsoft Elevate, anunciada em julho de 2025, a empresa comprometeu mais de US$ 4 bilhões em recursos e em tecnologia de IA e nuvem, ao longo de cinco anos, para escolas, faculdades comunitárias e técnicas e organizações sem fins lucrativos.",
};

export const footerGroups = [
  {
    title: "A empresa",
    links: [
      { label: "Sobre a Microsoft", href: "https://www.microsoft.com/pt-br/about" },
      {
        label: "Valores corporativos",
        href: "https://www.microsoft.com/pt-br/about/corporate-values",
      },
      {
        label: "Relações com investidores",
        href: "https://www.microsoft.com/en-us/investor",
      },
      { label: "Carreiras", href: "https://careers.microsoft.com/" },
      { label: "Notícias", href: "https://news.microsoft.com/pt-br/" },
    ],
  },
  {
    title: "Plataforma",
    links: [
      { label: "Microsoft AI", href: "https://www.microsoft.com/pt-br/ai" },
      { label: "Azure", href: "https://azure.microsoft.com/pt-br/" },
      {
        label: "Microsoft 365",
        href: "https://www.microsoft.com/pt-br/microsoft-365",
      },
      { label: "Segurança", href: "https://www.microsoft.com/pt-br/security" },
      {
        label: "Microsoft Fabric",
        href: "https://www.microsoft.com/pt-br/microsoft-fabric",
      },
    ],
  },
  {
    title: "Responsabilidade",
    links: [
      {
        label: "Sustentabilidade",
        href: "https://www.microsoft.com/pt-br/corporate-responsibility/sustainability",
      },
      {
        label: "Acessibilidade",
        href: "https://www.microsoft.com/pt-br/accessibility",
      },
      {
        label: "IA responsável",
        href: "https://www.microsoft.com/en-us/ai/responsible-ai",
      },
      {
        label: "Microsoft Elevate",
        href: "https://www.microsoft.com/en-us/elevate",
      },
      {
        label: "Relatórios de impacto",
        href: "https://www.microsoft.com/en-us/corporate-responsibility/reports-hub",
      },
    ],
  },
  {
    title: "Suporte",
    links: [
      { label: "Suporte Microsoft", href: "https://support.microsoft.com/pt-br" },
      {
        label: "Disability Answer Desk",
        href: "https://www.microsoft.com/pt-br/accessibility/disability-answer-desk",
      },
      { label: "Microsoft Learn", href: "https://learn.microsoft.com/pt-br/" },
      {
        label: "Comunidade Microsoft",
        href: "https://learn.microsoft.com/pt-br/answers/",
      },
      {
        label: "Fale com a Microsoft",
        href: "https://support.microsoft.com/pt-br/contactus",
      },
    ],
  },
] as const;
