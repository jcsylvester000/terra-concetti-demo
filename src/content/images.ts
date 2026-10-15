import type { StaticImageData } from "next/image";

import homeHero from "@/assets/images/home-hero-coastal-villa.jpg";
import coralHero from "@/assets/images/coral-hero-condo.jpg";
import coralAerial from "@/assets/images/coral-aerial.jpg";
import coralVillaSunset from "@/assets/images/coral-villa-sunset.jpg";
import coralInteriorLiving from "@/assets/images/coral-interior-living.jpg";
import coralInteriorDining from "@/assets/images/coral-interior-dining.jpg";
import coralInteriorLounge from "@/assets/images/coral-interior-lounge.jpg";
import coralInteriorBedroom from "@/assets/images/coral-interior-bedroom.jpg";
import coralMasterplan from "@/assets/images/coral-masterplan.jpg";
import coralEstatePlan from "@/assets/images/coral-estate-plan.jpg";
import coralSiteContext from "@/assets/images/coral-site-context.jpg";
import coralDesignStory from "@/assets/images/coral-design-story.jpg";
import coralSustainableDesign from "@/assets/images/coral-sustainable-design.jpg";
import coralMassing from "@/assets/images/coral-massing.jpg";
import siteMeadow from "@/assets/images/site-meadow.jpg";
import siteSunsetSombrero from "@/assets/images/site-sunset-sombrero.jpg";
import siteSlope from "@/assets/images/site-slope.jpg";
import siteSunsetTingloy from "@/assets/images/site-sunset-tingloy.jpg";
import siteCoastView from "@/assets/images/site-coast-view.jpg";
import ovHero from "@/assets/images/ov-hero-hillside.jpg";
import ovResidences from "@/assets/images/ov-residences.jpg";
import ovIdentity from "@/assets/images/ov-identity.jpg";
import ovSiteView1 from "@/assets/images/ov-site-view-1.jpg";
import ovSiteView2 from "@/assets/images/ov-site-view-2.jpg";
import ovSiteView3 from "@/assets/images/ov-site-view-3.jpg";
import ovPrinciples from "@/assets/images/ov-principles.jpg";
import ovSustainability from "@/assets/images/ov-sustainability.jpg";
import mgccGolf from "@/assets/images/mgcc-golf.jpg";
import mgccBeach from "@/assets/images/mgcc-beach.jpg";
import mgccHospitality from "@/assets/images/mgcc-hospitality.jpg";
import mgccEntertainment from "@/assets/images/mgcc-entertainment.jpg";
import mgccCover from "@/assets/images/mgcc-cover.jpg";
import ucCover from "@/assets/images/uc-cover.jpg";
import ucConcept from "@/assets/images/uc-concept.jpg";
import ucEcosystem from "@/assets/images/uc-ecosystem.jpg";
import anilaoHeart from "@/assets/images/anilao-heart.jpg";
import anilaoDiveMap from "@/assets/images/anilao-dive-map.jpg";
import anilaoAccessMap from "@/assets/images/anilao-access-map.jpg";
import batangasPoi from "@/assets/images/batangas-poi.jpg";
import underwaterGrid from "@/assets/images/underwater-grid.jpg";
import billionBricksHouse from "@/assets/images/billion-bricks-house.jpg";
import communityActivities from "@/assets/images/community-activities.jpg";
import bambooRatio from "@/assets/images/bamboo-ratio.jpg";
import philippinesGateway from "@/assets/images/philippines-gateway.jpg";
import monogramPlaster from "@/assets/images/monogram-plaster.jpg";

/**
 * Image library. Every image declares what it is so the UI can label it correctly:
 *  - render:   architectural visualisation. Always shows "Artist's perspective" (BRD M-AC2).
 *  - photo:    real photograph of the site or activities.
 *  - concept:  mood/reference imagery for unbuilt concepts ("Concept imagery").
 *  - diagram:  maps, plans, diagrams taken from the deck.
 * `placeholder: true` marks staging images cut from the 1000 px investor-deck slides (BRD D12).
 * They must all be replaced before production launch; the content guard reports how many remain.
 */
export type ImageKind = "render" | "photo" | "concept" | "diagram";

export type SiteImage = {
  src: StaticImageData;
  alt: string;
  kind: ImageKind;
  credit?: string;
  placeholder: boolean;
  /** Deck slide the placeholder was cut from, for asset replacement. */
  source?: string;
};

const img = (src: StaticImageData, alt: string, kind: ImageKind, source: string, extra: Partial<SiteImage> = {}): SiteImage => ({
  src,
  alt,
  kind,
  source,
  placeholder: true,
  ...extra,
});

export const images = {
  homeHero: img(homeHero, "Hillside villa at The Coral at Anilao overlooking the sea at sunset, artist's perspective", "render", "S. 69"),
  coralHero: img(coralHero, "Terraced condominium residences at The Coral with an infinity pool above Anilao's coast, artist's perspective", "render", "S. 66"),
  coralAerial: img(coralAerial, "Aerial view of The Coral at Anilao among the trees above the bay, artist's perspective", "render", "S. 38"),
  coralVillaSunset: img(coralVillaSunset, "Coastal villa with a plunge pool at The Coral at golden hour, artist's perspective", "render", "S. 70"),
  coralInteriorLiving: img(coralInteriorLiving, "Light timber living room with a sea view at The Coral, artist's perspective", "render", "S. 72"),
  coralInteriorDining: img(coralInteriorDining, "Dining room with timber louvres at The Coral, artist's perspective", "render", "S. 72"),
  coralInteriorLounge: img(coralInteriorLounge, "Lounge opening onto the garden at The Coral, artist's perspective", "render", "S. 72"),
  coralInteriorBedroom: img(coralInteriorBedroom, "Bedroom with timber walls and garden doors at The Coral, artist's perspective", "render", "S. 72"),
  coralMasterplan: img(coralMasterplan, "Masterplan of The Coral at Anilao showing villa lots, townhouses, treehouses, condominium clusters and amenities", "diagram", "S. 58"),
  coralEstatePlan: img(coralEstatePlan, "Estate plan of The Coral at Anilao with the shoreline and planned amenities", "diagram", "S. 59"),
  coralSiteContext: img(coralSiteContext, "Site context diagram of The Coral: elevation 60 to 80 metres, sun path and monsoon directions", "diagram", "S. 49"),
  coralDesignStory: img(coralDesignStory, "Design story of The Coral: passive cooling, indoor-outdoor living and marine-inspired architecture", "diagram", "S. 44"),
  coralSustainableDesign: img(coralSustainableDesign, "Sustainable design features at The Coral: natural ventilation, natural materials, passive cooling and green roofs, artist's perspective", "render", "S. 55"),
  coralMassing: img(coralMassing, "Massing diagram of a condominium cluster at The Coral with interlocking stepped units", "diagram", "S. 65"),
  siteMeadow: img(siteMeadow, "Actual site of The Coral: green hillside meadow above the sea", "photo", "S. 52"),
  siteSunsetSombrero: img(siteSunsetSombrero, "Sunset over Sombrero Island seen from The Coral site", "photo", "S. 52"),
  siteSlope: img(siteSlope, "Actual hillside at The Coral site with a view to the sea and islands", "photo", "S. 52"),
  siteSunsetTingloy: img(siteSunsetTingloy, "Golden sunset over the water toward Tingloy from the site", "photo", "S. 52"),
  siteCoastView: img(siteCoastView, "Coastline and sea view from the upper slope of The Coral site", "photo", "S. 52"),
  ovHero: img(ovHero, "Ocean View Anilao residences stepping down a forested hillside, artist's perspective", "render", "S. 106"),
  ovResidences: img(ovResidences, "Hillside townhouses and cliff houses at Ocean View Anilao, artist's perspective", "render", "S. 107"),
  ovIdentity: img(ovIdentity, "Ocean View Anilao identity over a misty hillside, artist's perspective", "render", "S. 73"),
  ovSiteView1: img(ovSiteView1, "Path through the trees with a sea view at the Ocean View Anilao site", "photo", "S. 87"),
  ovSiteView2: img(ovSiteView2, "View of the sea and coastline from the Ocean View Anilao site", "photo", "S. 87"),
  ovSiteView3: img(ovSiteView3, "Wooded slope and fence line at the Ocean View Anilao site", "photo", "S. 87"),
  ovPrinciples: img(ovPrinciples, "Ocean View design principles: life in balance, nature-based solutions, regenerative community design, artist's perspective", "render", "S. 90"),
  ovSustainability: img(ovSustainability, "Ocean View sustainability direction: solar power, permeable pavers, bamboo grove, gardens and waste management", "concept", "S. 79"),
  mgccGolf: img(mgccGolf, "Golf course landscape at sunrise, concept imagery for Mabini Golf & Country Club", "concept", "S. 118"),
  mgccBeach: img(mgccBeach, "Beach club, cabanas and pool, concept imagery for Mabini Golf & Country Club", "concept", "S. 119"),
  mgccHospitality: img(mgccHospitality, "Hotel and residences among forest, concept imagery for Mabini Golf & Country Club", "concept", "S. 121"),
  mgccEntertainment: img(mgccEntertainment, "Lifestyle pavilions in the landscape, concept imagery for Mabini Golf & Country Club", "concept", "S. 120"),
  mgccCover: img(mgccCover, "Aerial forest texture over the proposed Mabini Golf & Country Club site", "concept", "S. 110"),
  ucCover: img(ucCover, "The Urban Coral, a green mid-rise building in Makati, artist's perspective, not to scale", "render", "S. 128"),
  ucConcept: img(ucConcept, "Concept images of terraced urban buildings with gardens for The Urban Coral", "concept", "S. 144"),
  ucEcosystem: img(ucEcosystem, "A creative ecosystem in the city: people meeting in a shared space, concept imagery for The Urban Coral", "concept", "S. 139"),
  anilaoHeart: img(anilaoHeart, "Map of the Philippines marking Anilao, Batangas, the heart of Philippine diving", "diagram", "S. 36"),
  anilaoDiveMap: img(anilaoDiveMap, "Map of 26 dive sites around Mabini and Tingloy with The Coral and Ocean View marked", "diagram", "S. 37"),
  anilaoAccessMap: img(anilaoAccessMap, "Route map from Metro Manila to Anilao via the South Luzon Expressway and STAR Tollway, about 2 hours (122 km) from NAIA", "diagram", "S. 46"),
  batangasPoi: img(batangasPoi, "Map of points of interest across Batangas with Terra Concetti's projects", "diagram", "S. 35"),
  underwaterGrid: img(underwaterGrid, "Grid of underwater macro photographs of Anilao's corals, nudibranchs and reef life", "photo", "S. 16", { credit: "Irwin Cua" }),
  billionBricksHouse: img(billionBricksHouse, "Billion Bricks house concept with solar roof, rainwater harvesting, cross-ventilation and an elevated flood-resilient base", "diagram", "S. 21"),
  communityActivities: img(communityActivities, "Community activities: The Pink Argonauts, underwater and coastal clean-ups, mangrove planting and marine wildlife monitoring", "photo", "S. 24"),
  bambooRatio: img(bambooRatio, "The 1:10 development-to-bamboo carbon ratio explained in four steps", "diagram", "S. 23"),
  philippinesGateway: img(philippinesGateway, "Map of the Philippines with Batangas as the current destination and prospective locations under study", "diagram", "S. 181"),
  monogramPlaster: img(monogramPlaster, "Terra Concetti leaf monogram on green plaster", "diagram", "S. 1"),
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
