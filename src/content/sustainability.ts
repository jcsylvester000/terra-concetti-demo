/**
 * Sustainability content (BRD P03; deck S. 16–25, 55, 79). Planned features use "planned" or
 * "designed to"; no certification logos or achieved "net-zero"/"carbon-neutral" claims (P03-AC1/AC2).
 */
export const areas = [
  {
    id: "life-beneath-water",
    title: "Life beneath water",
    lead: "The reefs are the reason Anilao matters. Protecting them is part of the project, not an add-on.",
    body: [
      "Anilao's reefs hold some of the richest macro life in the Philippines: soft corals, nudibranchs, frogfish and reef fish photographed by divers from around the world. Our team includes divers, and one of our directors co-founded a marine conservation group in Anilao.",
      "We plan our communities to keep runoff, waste and light away from the shoreline, and we support community-based conservation: underwater and coastal clean-ups, coastal biodiversity walks, mangrove planting and marine wildlife monitoring.",
    ],
    image: "underwaterGrid" as const,
  },
  {
    id: "energy-and-climate",
    title: "Energy and climate",
    lead: "Homes designed to need less energy before they use any.",
    body: [
      "Passive design comes first. Deep roof overhangs, louvres and awnings shade the walls; cross and stack ventilation draw sea air through each room; buildings are oriented to limit heat gain and bring in daylight.",
      "On top of that, our partnership with Billion Bricks brings solar roofs and climate-responsive design into the planning of our homes.",
    ],
    image: "billionBricksHouse" as const,
  },
  {
    id: "water-and-land",
    title: "Water and land",
    lead: "Every drop and every slope handled with care.",
    body: [
      "Rainwater is planned to be collected and reused for gardens, cooling ponds and other non-potable uses. Permeable paths and bioswales let rain soak into the ground instead of running down to the sea.",
      "Landscapes use native species that need less water and support local wildlife, with community gardens, bamboo groves and retained forest on the slopes. Homes are raised and designed to be flood-resilient.",
    ],
    image: "ovSustainability" as const,
  },
  {
    id: "materials-and-ecology",
    title: "Materials and ecology",
    lead: "Materials that belong to the place and leave a lighter footprint.",
    body: [
      "We favour mass timber, cross-laminated and glue-laminated timber, treated for termites and fire, alongside sustainable materials from partners such as Billion Bricks and TRANDUC.",
      "Green roofs, green façades and living walls cool the buildings and give back some of the green that construction takes.",
    ],
    image: "coralSustainableDesign" as const,
  },
];

export const bambooSteps = [
  { title: "1 hectare developed", text: "The developed area: buildings, infrastructure and activities that generate carbon emissions." },
  { title: "Carbon footprint assessment", text: "Estimates the emissions from construction, materials, energy use, transport and operations." },
  { title: "Bamboo sequestration requirement", text: "Works out how much bamboo is needed to absorb and store that carbon, based on growth and sequestration capacity." },
  { title: "Up to 10 hectares of managed bamboo", text: "A preliminary land allocation for bamboo, supporting carbon sequestration, sustainable harvesting and long-term ecological restoration." },
];

export const communityActivities = [
  "The Pink Argonauts marine conservation work",
  "Underwater clean-up drives",
  "Coastal clean-up drives",
  "Coastal biodiversity walks",
  "Mangrove planting and rehabilitation",
  "Marine wildlife monitoring",
];

export const communityThemes = ["Arts", "Travel", "Lifestyle", "Cuisine", "Furniture", "Landscape", "Knowledge", "Conservation"];
