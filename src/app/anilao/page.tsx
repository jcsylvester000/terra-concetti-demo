import type { Metadata } from "next";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/ui/layout";
import { TextLink } from "@/components/ui/button-link";
import { Media } from "@/components/ui/media";
import { ContactBlock } from "@/components/ui/contact";
import { PageHero } from "@/components/sections/page-hero";
import { ProjectCard } from "@/components/sections/project-card";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ContourDraw } from "@/components/motion/contour-draw";
import { NumberTicker } from "@/components/motion/number-ticker";
import { diveSites, journey } from "@/content/anilao";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";
import { articlePath, getArticles } from "@/lib/journal";
import { JsonLd } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/env";

export const metadata: Metadata = pageMetadata({
  title: "Anilao, Batangas: Dive Sites, Getting There & When to Go",
  description:
    "A local's guide to Anilao: 26 dive sites, the best months for visibility, how to get there from Manila and where to stay or own a home.",
  path: "/anilao",
  absoluteTitle: true,
});

const seasons = [
  { months: "November to May", title: "Peak visibility", text: "The clearest water of the year and the calmest conditions for most dive sites. This is the main diving and travel season." },
  { months: "All year", title: "Water at about 26–30 °C", text: "Warm water year-round means a thin wetsuit is usually enough, even for long macro dives." },
  { months: "June to October", title: "Rainy season", text: "Expect more rain and changeable seas. Many divers still come for the macro life on sheltered sites; plan around the weather and check conditions with your dive operator." },
];

const around = [
  { title: "Taal", text: "The heritage town of Taal and the Taal Lake area make an easy day trip from Anilao." },
  { title: "Mt. Gulugod Baboy", text: "A short hike above Mabini with wide views over Balayan Bay and the islands." },
  { title: "Batangas City", text: "The province's port and services hub, about 17 km (45 minutes) away, with shopping and a planned medical facility." },
  { title: "Bauan", text: "Bauan Doctors hospital is about 20 km (35 minutes) from the Anilao coast." },
];

/** P10 Why Anilao (pillar guide). Dive-site count is 26 everywhere (P10-AC1). */
export default function AnilaoPage() {
  const anilaoProjects = projects.filter((p) => p.template === "project");
  return (
    <>
      <PageHero
        image="siteSunsetSombrero"
        size="medium"
        eyebrow="Destination guide · Mabini, Batangas"
        title="Anilao, Batangas: dive sites, getting there and when to go"
        lead="The birthplace of Philippine scuba diving, two hours from Manila by car."
      />

      <Section tone="shell" className="pt-8 md:pt-10">
        <Container>
          <Breadcrumbs items={[{ name: "Why Anilao", path: "/anilao" }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <dl className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-[6px] bg-line">
              {[
                { v: <NumberTicker value={26} />, l: "documented dive sites" },
                { v: "2 hrs", l: "from NAIA by car" },
                { v: "Nov–May", l: "peak visibility" },
                { v: "26–30 °C", l: "water temperature" },
              ].map((f) => (
                <div key={f.l} className="flex flex-col-reverse bg-linen px-5 py-6">
                  <dt className="mt-1 text-[14px] text-driftwood">{f.l}</dt>
                  <dd className="font-display text-[34px] leading-none font-semibold md:text-[40px]">{f.v}</dd>
                </div>
              ))}
            </dl>
            <div className="prose-tc text-forest/85">
              <p>
                Anilao is a stretch of coast on the Calumpang Peninsula in Mabini, Batangas, looking across Balayan Bay to Sombrero and Tingloy Islands. It is where scuba
                diving in the Philippines began, and it remains one of the most rewarding places in Asia for divers of every level, from first open-water dives to
                specialist underwater photographers.
              </p>
              <p>
                What makes Anilao unusual is how close it is. Most of the country&apos;s celebrated dive destinations need a flight and a boat transfer. Anilao needs a car
                and about two hours from Manila. That combination of world-renowned reefs and easy access is why we chose it as the first home of Terra Concetti, and why
                this guide exists: to help you get to know the place before you get to know our homes.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="History" title="The birthplace of Philippine diving" />
            <div className="prose-tc mt-6 text-forest/85">
              <p>
                Anilao is widely known as the place where recreational diving in the Philippines started. Generations of Filipino divers learned here, and the coast has
                grown into a hub for dive training, macro photography and marine conservation.
              </p>
              <p>
                Its reputation rests on what lives on the reefs. Divers come for soft and hard corals, nudibranchs in every colour, frogfish, seahorses and reef fish,
                often within a short boat ride of the shore. Anilao regularly hosts international underwater-photography competitions and conservation events, which is
                a good sign of how highly the dive community rates it.
              </p>
              <p>
                For residents, that heritage means a local community that understands the sea: dive centers, boat operators and conservation groups who have worked these
                waters for decades.
              </p>
            </div>
          </div>
          <Media image="underwaterGrid" sizes="(min-width: 1024px) 55vw, 100vw" className="mx-auto max-w-md rounded-[6px]" caption="below" />
        </Container>
      </Section>

      <Section tone="shell" className="relative overflow-hidden">
        <ContourDraw />
        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Dive sites"
                title="26 dive sites across Mabini and Tingloy"
                lead="From sheltered house reefs to pinnacles and walls, the dive sites around Anilao suit every level. Well-known names include Cathedral Rock and Twin Rocks."
              />
              <Media image="anilaoDiveMap" sizes="(min-width: 1024px) 55vw, 100vw" className="mt-8 rounded-[6px] ring-1 ring-line" caption="none" />
              <p className="t-caption mt-3">Map of the 26 dive sites around Mabini and Tingloy, with The Coral and Ocean View marked.</p>
            </div>
            <div className="rounded-[6px] bg-linen/80 p-6 backdrop-blur-[1px]">
              <h3 className="t-h4">The 26 documented dive sites</h3>
              <ol className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1.5 text-[15px] [counter-reset:site]">
                {diveSites.map((d, i) => (
                  <li key={d} className="flex gap-2">
                    <span className="w-6 shrink-0 text-right tabular-nums text-driftwood">{i + 1}.</span>
                    {d}
                  </li>
                ))}
              </ol>
              <p className="t-caption mt-4">Names as listed by Terra Concetti; local spellings vary between dive operators.</p>
              <div className="prose-tc mt-6 text-forest/85">
                <p>
                  Most sites are a short boat ride from the Anilao shoreline. Guided dives are the norm, and local dive centers know which sites suit the day&apos;s
                  conditions, from gentle slopes for new divers to deeper sites for the experienced.
                </p>
                <p>
                  Macro photographers often spend a whole trip on a handful of sites, while newer divers find calm, shallow reefs close to shore. A premium dive center is
                  planned within The Coral for residents and guests.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* I3 Manila to the reef: horizontal journey */}
      <section aria-labelledby="getting-there" className="tc-journey bg-forest text-shell">
        <div className="tc-journey-sticky py-16 md:py-20">
          <Container>
            <Eyebrow onDark>Getting there</Eyebrow>
            <h2 id="getting-there" className="t-display mt-3 max-w-3xl">From Manila to the reef in about two hours</h2>
            <p className="t-lead mt-4 max-w-2xl text-shell/85">
              About 122 km from NAIA via the South Luzon Expressway and the STAR Tollway. No flights or boat rides needed.
            </p>
          </Container>
          <div className="mt-10 pl-4 md:pl-6 lg:pl-8 xl:pl-[max(2rem,calc((100vw-1280px)/2+2rem))]">
            <ol className="tc-journey-track pr-4">
              {journey.map((j) => (
                <li key={j.step} className="flex min-h-[220px] flex-col rounded-[6px] border border-shell/15 bg-moss p-6 md:p-8">
                  <span className="font-display text-[44px] leading-none font-semibold text-gold">{j.step}</span>
                  <h3 className="mt-4 font-display text-[28px] leading-8 font-semibold">{j.place}</h3>
                  <p className="mt-3 text-shell/85">{j.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <SectionHeading eyebrow="On the road" title="Driving to Anilao" />
            <div className="prose-tc mt-6 text-forest/85">
              <p>
                The drive is straightforward: south from Metro Manila on SLEX, onto the STAR Tollway toward Batangas City, then west to Mabini and along the coast to
                Anilao. Allow about two hours from NAIA, longer on holiday weekends.
              </p>
              <p>
                The Coral sits about two minutes (637 m) from the Mabini Circumferential Road, on a slope 60 to 80 metres above the sea. Parking is planned at the edge of
                the estate so the paths between homes stay quiet and walkable.
              </p>
            </div>
          </div>
          <Media image="anilaoAccessMap" sizes="(min-width: 1024px) 55vw, 100vw" className="rounded-[6px] ring-1 ring-line" caption="below" />
        </Container>
      </Section>

      <Section tone="shell">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="First visit" title="Tips for diving Anilao" lead="A few habits that make a first trip easier, and kinder to the reef." />
          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              { t: "Dive with a local dive center", d: "Guided dives are the norm in Anilao. Local guides know the currents, the best sites for the day and where the rarest macro life is hiding." },
              { t: "Look, don't touch", d: "Keep fins off the reef, never collect shells or coral, and use a reef-safe sunscreen. The macro life that makes Anilao famous depends on it." },
              { t: "Choose your style of dive", d: "Gentle reef slopes suit new divers; pinnacles and walls reward experienced divers; slow muck and night dives are where photographers find nudibranchs and frogfish." },
              { t: "Plan around the weekend", d: "Weekdays are quieter on the road and on the dive sites. On holiday weekends, leave Manila early and allow extra time for the drive." },
            ].map((tip) => (
              <li key={tip.t} className="rounded-[6px] bg-linen p-6">
                <h3 className="t-h4">{tip.t}</h3>
                <p className="mt-2 text-[15px] leading-6 text-forest/80">{tip.d}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="sage">
        <Container>
          <SectionHeading eyebrow="When to go" title="Seasons and water" lead="Anilao is a year-round destination, but conditions change through the year." />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {seasons.map((s) => (
              <li key={s.title} className="rounded-[6px] bg-shell p-6">
                <p className="t-eyebrow text-bronze">{s.months}</p>
                <h3 className="t-h3 mt-2">{s.title}</h3>
                <p className="mt-3 text-forest/80">{s.text}</p>
              </li>
            ))}
          </ul>
          <p className="prose-tc mt-8 text-forest/85">
            The elevated sites above the coast are sheltered by the surrounding islands during typhoons, and the view to the west means sunsets over the water for much of
            the year.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Around Batangas" title="Beyond the water" lead="Batangas is more than a dive coast. Heritage towns, hills and the province's main city are all within reach." />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {around.map((a) => (
              <li key={a.title} className="rounded-[6px] bg-shell p-6 ring-1 ring-line/70">
                <h3 className="t-h4">{a.title}</h3>
                <p className="mt-2 text-[15px] leading-6 text-forest/80">{a.text}</p>
              </li>
            ))}
          </ul>
          <div className="prose-tc mt-8 text-forest/85">
            <p>
              Batangas has grown quickly as a place to visit and to live. The province is often described through its &ldquo;five Ps&rdquo;: a pro-business provincial
              government, its role as Luzon&apos;s power hub, its ports, an English-proficient workforce, and the place itself, with its beaches, dive sites and heritage.
            </p>
            <p>
              Several of the country&apos;s established developers have built leisure estates in the province, and the coast around Anilao keeps its own character: small
              resorts, dive centers and fishing villages on a green, steep shoreline.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="shell">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Live here" title="Explore homes in Anilao" lead="Two communities above the coast, designed around the reefs and the view." />
            <TextLink href="/ownership" className="shrink-0">How ownership works</TextLink>
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {anilaoProjects.map((p) => (
              <li key={p.slug} className="flex"><ProjectCard project={p} /></li>
            ))}
          </ul>
          <div className="mt-12 rounded-[6px] bg-linen p-6">
            <h3 className="t-h4">Guides from the Journal</h3>
            <ul className="mt-3 space-y-1">
              {getArticles()
                .filter((a) => a.category === "Dive & destination" || a.category === "Sustainability")
                .map((a) => (
                  <li key={a.slug}>
                    <a href={articlePath(a)} className="inline-flex min-h-11 items-center font-medium text-moss underline decoration-gold decoration-2 underline-offset-4 hover:text-forest">{a.title}</a>
                  </li>
                ))}
            </ul>
            <TextLink href="/journal" className="mt-3">All journal articles</TextLink>
          </div>
        </Container>
      </Section>

      <ContactBlock />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristDestination",
          name: "Anilao, Mabini, Batangas",
          description: "The birthplace of Philippine scuba diving, with 26 documented dive sites across Mabini and Tingloy, about two hours from Manila.",
          url: absoluteUrl("/anilao"),
          geo: { "@type": "GeoCoordinates", latitude: 13.762, longitude: 120.925 },
          touristType: ["Scuba divers", "Underwater photographers", "Families"],
          containedInPlace: { "@type": "AdministrativeArea", name: "Batangas, Philippines" },
        }}
      />
    </>
  );
}
