// Single source of truth — every word here comes from the Raymond platform deck.

export const sections = [
  { id: "hero", label: "Hero" },
  { id: "glance", label: "Raymond at a Glance" },
  { id: "macro", label: "The Macro Disconnect" },
  { id: "flaw", label: "The Structural Flaw" },
  { id: "blindspot", label: "The Blind Spot" },
  { id: "dormant", label: "The Dormant Asset" },
  { id: "catalyst", label: "The Catalyst" },
  { id: "architecture", label: "The New Architecture" },
  { id: "exchange", label: "The Value Exchange" },
  { id: "shift", label: "The Model Shift" },
  { id: "defensibility", label: "The Defensibility" },
  { id: "impact", label: "The Market Impact" },
  { id: "advantage", label: "The Unfair Advantage" },
  { id: "closing", label: "Closing" },
] as const;

export const hero = {
  eyebrow: "Raymond · Strategy Memo",
  title: "The Complete Man. The Incomplete Platform.",
  subtitle: "Platformising Raymond's latent network of 20,000 tailors.",
};

export const glance = {
  eyebrow: "01 · The Illusion of Control",
  title: "Raymond at a Glance",
  metrics: [
    { value: "₹9,286 Cr", label: "Highest-ever consolidated revenue (FY2024)" },
    { value: "~60%", label: "Premium Suiting Market Share" },
    { value: "1,500+", label: "Exclusive Brand Outlets across 350+ cities" },
    { value: "20,000+", label: "Certified Tailors" },
  ],
  footer:
    "Raymond operates the most successful physical textile pipeline in India. But a pipeline is built to push product, not to capture identity.",
};

export const macro = {
  eyebrow: "02 · The Macro Disconnect",
  title: "12 Million tailors. Zero data.",
  left: {
    big: "12 Million",
    label: "Custom Tailors in India",
    points: [
      "Accounts for 17% of all manufacturing employment (up from 7% in 2005).",
      "5 Million new tailoring jobs added between 2018 and 2024 alone.",
    ],
  },
  right: {
    big: "Zero Data.",
    points: [
      "No customer identities post-purchase.",
      "No body measurements on file.",
      "No visibility into occasion triggers.",
    ],
  },
};

export const flaw = {
  eyebrow: "03 · The Structural Flaw",
  title: "The pipeline that breaks at the point of sale.",
  pre: ["Gwalior Mills", "Distribution", "Retail Store (Point of Sale)"],
  post: ["Fit", "Occasion", "Reorder"],
  preCaption: "Raymond sees, controls, and monetizes everything here.",
  postCaption:
    "Raymond exits here. The exact moment the fabric transforms into personal identity, the relationship terminates.",
};

export const blindspot = {
  eyebrow: "04 · The Blind Spot",
  title: "The five actors Raymond cannot see.",
  actors: [
    {
      name: "The End Customer",
      body: "Demand driven by life occasions, but remains anonymous.",
    },
    {
      name: "The Independent Tailor",
      body: "Recommends fabric and controls the repeat relationship.",
    },
    {
      name: "The Corporate Manager",
      body: "Controls massive uniform budgets via fragmented vendors.",
    },
    {
      name: "The Wedding Planner",
      body: "Coordinates multi-city trousseaus manually.",
    },
    {
      name: "The Urban Professional",
      body: "Demands digital speed and personalization, finding none.",
    },
  ],
  footer:
    "All five actors make decisions that dictate Raymond's revenue. None are connected to Raymond's data infrastructure.",
};

export const dormant = {
  eyebrow: "05 · The Dormant Asset",
  title: "20,000 Tailors, 2 Million Invisible Customers.",
  points: [
    "Raymond's 20,000 certified tailors are not a legacy training program. They are the pre-warmed, dormant supply side of a digital marketplace.",
    "At a conservative 100 loyal clients per tailor, this network represents indirect relationships with 2 Million Indian consumers.",
    "The permission layer — brand trust — already exists. The physical touchpoints — 1,500 stores — already exist.",
  ],
  punch: "We do not need to acquire the market. We just need to awaken it.",
};

export const catalyst = {
  eyebrow: "06 · The Catalyst",
  title: "The technology that changes everything.",
  pillars: [
    {
      tag: "01",
      name: "3D Body Scanning",
      bullets: [
        "Smartphone-based, 2-photo scanning captures 40+ measurements with sub-centimeter accuracy.",
        "Cost has fallen below ₹50 per scan at scale.",
        "Converts one-time tailor visits into permanent, portable digital assets.",
      ],
    },
    {
      tag: "02",
      name: "AI Fit Intelligence",
      bullets: [
        "Machine learning models train on garment-fit outcomes across 20,000 tailors.",
        "Homogenizes quality: a new tailor instantly inherits a century of collective fitting expertise.",
      ],
    },
    {
      tag: "03",
      name: "Demand Signal Engine",
      bullets: [
        "Aggregating booking patterns provides Gwalior mills with fabric demand signals 6–8 weeks in advance.",
        "Shifts the supply chain from reactive production to anticipatory intelligence.",
      ],
    },
  ],
};

export const architecture = {
  eyebrow: "07 · The New Architecture",
  title: "Introducing the Raymond Platform.",
  sides: [
    {
      pos: "top",
      name: "The Customer",
      mode: "Free Access",
      value: "Your fit, anywhere in India, carried forever.",
      data: "Permanent body profile & occasion calendar.",
    },
    {
      pos: "right",
      name: "The Tailor",
      mode: "Freemium / Paid",
      value: "Raymond's intelligence behind every stitch.",
      data: "Client measurement database & demand forecasting.",
    },
    {
      pos: "bottom",
      name: "Corporate Client",
      mode: "Paid Subscription",
      value: "One contract. Every city. Every employee.",
      data: "Centralized uniform management & ESG traceability.",
    },
    {
      pos: "left",
      name: "Wedding Ecosystem",
      mode: "Paid / Rev-Share",
      value: "The entire groom's wardrobe, coordinated.",
      data: "Multi-person, multi-city trousseau alignment.",
    },
  ],
  caption:
    "Data flows inward as identity. Value and intelligence flow outward to every side.",
};

export const exchange = {
  eyebrow: "08 · The Value Exchange",
  title: "A moat that gets deeper every day.",
  stages: [
    {
      n: 1,
      label: "High-value orders",
      body: "Corporate & Wedding demand feeds high-value, predictable orders to Tailors.",
    },
    {
      n: 2,
      label: "Supply expands",
      body: "Increased prosperity and digital tools attract more Tailors to the platform.",
    },
    {
      n: 3,
      label: "Customers arrive",
      body: "Better tailor coverage and AI fit quality attract more End Customers.",
    },
    {
      n: 4,
      label: "Data densifies",
      body: "More customers generate denser Data & Occasion Intelligence.",
    },
    {
      n: 5,
      label: "AI tightens",
      body: "Denser data tightens the AI Fit Engine and attracts larger Corporate / Wedding contracts.",
    },
  ],
  center:
    "Raymond monetizes the interactions of all four sides without having to directly perform the craft work.",
};

export const shift = {
  eyebrow: "09 · The Model Shift",
  title: "The linear pipeline becomes a multi-sided platform.",
  rows: [
    {
      dim: "Revenue Model",
      before: "One-time per-metre fabric sales.",
      after:
        "Multi-stream, recurring (SaaS, transaction fees, data licensing).",
    },
    {
      dim: "Customer Relationship",
      before: "Terminates at point of sale; anonymous.",
      after: "Lifelong, portable, deepens with every occasion.",
    },
    {
      dim: "Data Captured",
      before: "SKU, location, date. Zero identity.",
      after: "Body profiles, fit history, tailor demand, uniform records.",
    },
    {
      dim: "Defensibility",
      before: "Brand & fabric quality (replicable over time).",
      after: "Compounding data assets & OS-level lock-in.",
    },
    {
      dim: "Network Effects",
      before: "None. Independent transactions.",
      after: "Strong cross-side. More tailors = better AI = more customers.",
    },
  ],
};

export const defensibility = {
  eyebrow: "10 · The Defensibility",
  title: "Operational Lock-In.",
  rim: "Day 1 — easy to leave. Only a basic profile created.",
  layers: [
    {
      label: "For Tailors",
      body: "Entire client list, AI fit history, and reputation scores are digitized.",
    },
    {
      label: "For Customers",
      body: "Body profile, multi-city tailor history, and wedding calendars established.",
    },
    {
      label: "For Corporates",
      body: "10,000 employee measurements centralized for automated reordering.",
    },
  ],
  moat:
    "The Core Moat: switching cost is no longer a contract. It is operational continuity. Leaving means rebuilding identity and business history from absolute scratch.",
};

export const impact = {
  eyebrow: "11 · The Market Impact",
  title: "Who gets disrupted, and how.",
  cells: [
    {
      who: "Manyavar & Occasion Wear",
      body: "Raymond sees the wedding in the occasion calendar 8 months ahead. Competitors only see the customer when they walk into a store.",
      mech: "Asymmetry of Timing",
    },
    {
      who: "Unorganized Tailoring (₹80k+ Cr)",
      body: "Platform membership becomes a minimum requirement to access premium urban customers — the Zomato effect on independent tailors.",
      mech: "Formalization Squeeze",
    },
    {
      who: "Corporate Uniform Vendors",
      body: "Displaced by a single platform offering multi-city fulfillment, automated reorders, and ESG-traceable Gwalior sourcing.",
      mech: "Consolidation",
    },
    {
      who: "Premium Wedding Planners",
      body: "Planners off-platform cannot match the digital groomsmen coordination across multiple cities and body types.",
      mech: "Capability Gap",
    },
  ],
};

export const advantage = {
  eyebrow: "12 · The Unfair Advantage",
  title: "The capital cost of catching up.",
  rows: [
    {
      challenge: "Trust for intimate data",
      challengeBody: "10–15 years and ₹500+ Cr of brand building.",
      asset: "100-year heritage.",
      assetBody: "Top-5 most trusted Indian apparel brand.",
    },
    {
      challenge: "Supply-side acquisition",
      challengeBody: "The classic cold-start problem (0 tailors).",
      asset: "20,000 pre-certified tailors.",
      assetBody: "Pre-warmed, brand-loyal supply already trained.",
    },
    {
      challenge: "Onboarding infrastructure",
      challengeBody: "Impossible physical capital expenditure.",
      asset: "1,500+ EBOs ready to convert.",
      assetBody: "From cost centers to scan-hubs overnight.",
    },
    {
      challenge: "Material integration",
      challengeBody: "Negotiating as a weak buyer.",
      asset: "Vertical integration via Gwalior mills.",
      assetBody: "Native economics across the stack.",
    },
  ],
  synthesis:
    "Startups must build the physical world to get the digital data. Raymond already owns the physical world; it just needs the digital connective tissue.",
};

export const closing = {
  eyebrow: "13 · The Closing Statement",
  title: "The synthesis of transactions into identities.",
  lead: "The tape measure was always the product.",
  body: "Raymond isn't abandoning its 100-year history to become a tech company. It is finally monetizing the intimate interactions its fabric has always facilitated. The market is ready. The assets are assembled. The only thing missing is the platform.",
};
