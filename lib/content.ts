// Single source of truth — every word here comes from the Satyukt deck brief.

export const sections = [
  { id: "hero", label: "Hero" },
  { id: "opening", label: "Opening Question" },
  { id: "surface", label: "Surface Reality" },
  { id: "domain", label: "The Domain" },
  { id: "moat", label: "Moat Funnel" },
  { id: "platform", label: "Platform Illusion" },
  { id: "context", label: "National Context" },
  { id: "value", label: "Value Proposition" },
  { id: "vision", label: "AgriTech Vision" },
  { id: "evolution", label: "Evolution" },
  { id: "synthesis", label: "Synthesis" },
  { id: "inclusion", label: "Algorithmic Inclusion" },
  { id: "governance", label: "Model Governance" },
  { id: "quadrant", label: "Strategic Quadrant" },
  { id: "verdict", label: "Final Verdict" },
] as const;

export const hero = {
  title: "Satyukt: Selling Trust, Not Satellites.",
  subtitle: "Platformization of AI in Agriculture | Strategic Analysis",
};

export const openingQuestion = {
  eyebrow: "The Opening Question — Bengaluru, 2020",
  setup: "A founder sits with a choice. Two doors.",
  doors: [
    {
      key: "deeper",
      title: "Go Deeper",
      body: "Build more services for the existing user base of farmers and institutions in India.",
      preview: "Compounding trust, slower TAM growth.",
    },
    {
      key: "global",
      title: "Go Global",
      body: "Take the satellite-based products to other geographies and emerging markets.",
      preview: "Faster TAM, weaker moat.",
    },
  ],
  footer: "Before we choose a door, we need to understand what Satyukt actually is.",
};

export const surfaceReality = {
  title: "The Surface Reality: A Textbook AgriTech Success",
  subtitle: "On paper, Satyukt looks like four products in a portfolio.",
  products: [
    { name: "Sat2Farm", audience: "B2C", does: "Farm advisory" },
    { name: "Sat2Credit", audience: "B2B", does: "Lending" },
    { name: "Sat4Agri", audience: "B2B", does: "Agri-enterprise" },
    { name: "Sat4Risk", audience: "B2G / B2B", does: "Crop insurance" },
  ],
  stats: [
    { value: "2018", label: "Founded (IISc / ISRO DNA)" },
    { value: "18", label: "Countries served" },
    { value: "$500K", label: "Backed by NABARD + Social Alpha" },
  ],
};

export const domain = {
  title: "The Domain: This isn't a yield problem.",
  stats: [
    {
      big: "~60%",
      body: "of Indians depend on agriculture… yet it contributes only ~15% to GDP.",
    },
    {
      big: "50%",
      body: "of small & marginal farmers cannot borrow from any formal source.",
    },
  ],
  pullquote:
    "Satyukt isn't here to grow more rice. It is here to make farmers legible to capital.",
};

export const moatFunnel = {
  title: "The Technology: The satellite data is free. The algorithm isn't.",
  stages: [
    {
      label: "Input: Pixels (Commodity)",
      body: "ISRO, NASA, Sentinel. Free or cheap satellite imagery.",
      tone: "sage",
    },
    {
      label: "Filter: Models (The IP)",
      body: "India-tuned algorithms for NPK, NDVI-to-yield, and soil moisture. Fitted on local crops, monsoons, and KCC data.",
      tone: "teal",
      moat: true,
    },
    {
      label: "Output: Decisions (The Product)",
      body: "Highly specific outputs: should this farmer get credit? Should we insure this region? When to spray?",
      tone: "navy",
    },
  ],
  takeaway:
    "Anyone can buy the pixels. Almost no one has the India-tuned models.",
};

export const platformIllusion = {
  title: "The Platform Illusion: A Multi-Product Data Business",
  spokes: [
    {
      who: "Farmers (B2C)",
      flow: "Subscription Fee ⇄ Data",
      reason:
        "Farmers send raw data, Satyukt sends advisories back. Each farmer's data doesn't make the next farmer's experience better.",
    },
    {
      who: "Banks (B2B)",
      flow: "Data Fee ⇄ Processed Data",
      reason:
        "Banks pay for credit-scoring APIs. Data flows in, money flows out. Banks don't make Satyukt better for the next bank.",
    },
    {
      who: "Insurers / Govt (B2G)",
      flow: "Data Fee ⇄ Processed Data",
      reason:
        "Insurers and PMFBY pay for crop-risk underwriting. The relationship is transactional, not compounding.",
    },
    {
      who: "Agri-Enterprises (B2B)",
      flow: "Data Fee ⇄ Processed Data",
      reason:
        "Enterprises buy field-level analytics. The next enterprise gets the same product, not a smarter one.",
    },
  ],
  verdict:
    "Not a platform. Not yet. The flywheel hasn't started spinning. It relies on linear subscription and data fees.",
};

export const nationalContext = {
  title: "The National Context: What makes it work in India, makes it hard to leave.",
  rows: [
    {
      tailwind: "ISRO Partnership: Free, India-specific data.",
      lockin: "Data sovereignty risks; models must be retrained for foreign satellites.",
    },
    {
      tailwind: "NABARD + PMFBY: Govt-subsidized scheme creates massive demand.",
      lockin: "Subsidy dependency; vulnerable to policy shifts.",
    },
    {
      tailwind: "DILRMP Land Records: Digitized parcels enable farm-level analytics.",
      lockin: "Hissa fragmentation; messy sub-plot ownership mapping.",
    },
    {
      tailwind: "KCC Infrastructure: 50M farmers in a formal credit funnel.",
      lockin: "Total credit-rail specificity; other countries lack a KCC equivalent.",
    },
  ],
  footer:
    "Going global ≠ flipping a switch. It means rebuilding institutional scaffolding country by country.",
};

export const valueProposition = {
  title: "The Value Proposition: Farmers benefit. Institutions pay.",
  flows: [
    { kind: "value", to: "The Farmer", body: "Better advisories, formal credit access, insurance approvals, and higher yields." },
    { kind: "revenue", to: "Banks", body: "Pay for credit-scoring APIs." },
    { kind: "revenue", to: "Insurers", body: "Pay for crop-risk underwriting." },
    { kind: "revenue", to: "Govt Agencies", body: "Fund insurance oversight." },
  ],
  caption:
    "Exception: Farmers pay a small Sat2Farm subscription — but it's the smallest revenue line and the weakest moat.",
};

export const evolution = {
  title: "The Evolution: Monetizing by moving closer to the decision.",
  steps: [
    { year: "2018", label: "Consultancy", body: "Selling raw analyses. Lowest value captured." },
    { year: "2019", label: "Sat2Farm", body: "Selling advisories to farmers." },
    { year: "2020", label: "Sat2Credit & Sat4Risk", body: "Selling decisions to institutions. High value captured." },
    { year: "Next", label: "Trust Infrastructure", body: "Selling ongoing risk / credit relationships." },
  ],
  yAxis: "VALUE CAPTURED",
  footer: "The next step should follow this logic — not abandon it.",
};

export const synthesis = {
  title: "The Synthesis: Agriculture and Finance are Complements, not Substitutes.",
  statement: "The real value of Satyukt lies in financial services, not agriculture.",
  halfRight: [
    "Institutions pay.",
    "The Agri-finance TAM is enormous.",
    "Sat2Credit / Sat4Risk are the revenue engines.",
  ],
  halfWrong: [
    "Strip out agriculture and the credit score is just generic fintech.",
    "The moat (crop, soil, weather models) sits entirely in agriculture.",
  ],
  insight:
    "Agriculture is the Moat. Finance is the Cash. This is exactly where Satyukt competes.",
};

export const algorithmicInclusion = {
  title: "Algorithmic Inclusion: The real shift in power dynamics",
  before: {
    label: "Before: The World Without Satyukt",
    body: "Farmer — blocked by a wall of exclusion — forced to a moneylender at 24%+ interest. The bank is on the other side, unreachable.",
    rate: "24%+ interest",
  },
  after: {
    label: "After: With Satyukt",
    body: "Farmer flows through a clean algorithmic rail to bank or insurer at lower rates. Lower rates, formal inclusion. Growth.",
  },
  takeaway:
    "The counterfactual to algorithmic inclusion isn't farmer empowerment — it's total exclusion. Both the farmer and the institution win against the prior status quo.",
};

export const modelGovernance = {
  title: "The Real Risk is Model Governance.",
  blackBox: "The farmer is now dependent on the algorithm for financial survival.",
  questions: [
    "Who audits the model?",
    "What happens if the yield estimation is artificially depressed?",
    "What if the credit score is wrong due to a satellite glitch?",
  ],
  insight:
    "Opacity, not power transfer, is the true structural threat to Satyukt's long-term viability as trust infrastructure.",
};

export const strategicQuadrant = {
  eyebrow: "Premium consulting · Structured Finance",
  title: "The Strategic Quadrant: Follow the moat, not the buyer.",
  cells: [
    {
      pos: "tl",
      x: "India",
      y: "Non-Agri",
      label: "REJECT",
      body: "Abandons the moat. Generic satellite analytics is commoditized.",
      tone: "reject",
    },
    {
      pos: "tr",
      x: "Global",
      y: "Non-Agri",
      label: "REJECT",
      body: "Two unfamiliar fronts simultaneously. Highest risk, lowest leverage.",
      tone: "reject",
    },
    {
      pos: "bl",
      x: "India",
      y: "Agri-Finance",
      label: "PRIORITY 1 (DEEPEN)",
      body: "Bundle credit + insurance + advisory. Monetize the infrastructure already built.",
      tone: "priority1",
    },
    {
      pos: "br",
      x: "Global",
      y: "Agri-Finance",
      label: "PRIORITY 2 (EXPAND)",
      body: "Analog markets — Bangladesh, Kenya, Indonesia. Target smallholders with state-backed insurance.",
      tone: "priority2",
    },
  ],
};

export const finalVerdict = {
  eyebrow: "The Final Verdict",
  headline: "Satyukt isn't a satellite company. It is trust infrastructure.",
  pillars: [
    { n: "1", title: "The Moat", body: "is the algorithm." },
    { n: "2", title: "The Buyer", body: "is the institution." },
    { n: "3", title: "The Strategy", body: "is to deepen." },
  ],
};
