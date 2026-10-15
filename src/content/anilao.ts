/** Why Anilao content (BRD P10; deck S. 29–37, 46). Dive-site count is 26 everywhere (P10-AC1). */
export const diveSites = [
  "Cathedral", "Eagle Point", "Koala", "Koala Aquarium", "Arthur's Rock", "Twin Rocks", "Mainit", "Bubble's Point",
  "Mayumi", "El Pinoy", "Sunview", "Dead Palm", "Onad's Point (Vivere)", "Bucea (Balanoy)", "Secret Bay", "Heidi's Point",
  "Saimsim", "Red Rocks", "Helicopter", "Dive 7000", "Matu", "Vistamar", "Bahura", "Anilao", "Anilao Pier", "Mandarin Reef",
];
if (diveSites.length !== 26) throw new Error("Anilao dive-site list must have 26 entries (BRD P10-AC1).");

/** I3 "Manila to the reef" journey panels. */
export const journey = [
  { step: "01", place: "Metro Manila", text: "Leave the city early. From NAIA, Anilao is about 122 km away, roughly two hours by car." },
  { step: "02", place: "South Luzon Expressway", text: "Head south on SLEX through Laguna." },
  { step: "03", place: "STAR Tollway", text: "Continue onto the Southern Tagalog Arterial Road toward Batangas City, the province's port and services hub." },
  { step: "04", place: "Mabini", text: "Turn west toward the Calumpang Peninsula. The Coral is two minutes (637 m) from the Mabini Circumferential Road." },
  { step: "05", place: "The reef", text: "Below the hillside, Anilao's reefs. No flight and no boat transfer: the drive ends at the water." },
];
