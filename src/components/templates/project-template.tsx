import { galleryCellClass } from "@/lib/gallery";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/ui/layout";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { Media } from "@/components/ui/media";
import { FeatureTile } from "@/components/ui/blocks";
import { ContactBlock } from "@/components/ui/contact";
import { ProjectStatusChip } from "@/components/ui/project-status";
import { accentVars } from "@/components/ui/accent";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PageHero } from "@/components/sections/page-hero";
import { KeyFacts } from "@/components/sections/key-facts";
import { UnitTable } from "@/components/sections/unit-table";
import { BentoSettle } from "@/components/motion/bento-settle";
import { CompareSlider } from "@/components/motion/compare-slider";
import { images } from "@/content/images";
import { projectPath, type Project } from "@/content/projects";
import { unitsFor } from "@/content/unit-types";
import { site } from "@/content/site";
import { JsonLd } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/env";

/** Project template (P05 The Coral, P07 Ocean View). Everything comes from the project record (P05-AC1). */
export function ProjectTemplate({ project: p }: { project: Project }) {
  const units = unitsFor(p.slug as "the-coral-anilao" | "ocean-view-anilao");
  const hasResidencesPage = p.slug === "the-coral-anilao";
  const path = projectPath(p);
  const groups = [...new Set(units.map((u) => u.group))];

  return (
    <div style={accentVars(p.accent)}>
      <PageHero
        image={p.heroImage}
        eyebrow={<span className="flex flex-wrap items-center gap-3">{p.eyebrow} <ProjectStatusChip project={p} /></span>}
        title={p.nameWithPlace}
        lead={<>{p.tagline}. <span className="text-shell/75">By Terra Concetti.</span></>}
        actions={
          <>
            <ButtonLink href={hasResidencesPage ? `${path}/residences` : "#residences"} variant="onDark">See residences</ButtonLink>
            <TextLink href="#location" onDark>Location &amp; views</TextLink>
          </>
        }
      />

      <Section tone="shell" className="pt-8 pb-12 md:pt-10 md:pb-16">
        <Container>
          <Breadcrumbs items={[{ name: "Destinations", path: "/destinations" }, { name: p.nameWithPlace, path }]} />
          <KeyFacts facts={p.keyFacts} className="mt-6" />
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <h2 className="t-display">{p.summary}</h2>
            <div className="space-y-5 text-forest/85 md:t-lead">
              {p.page.intro.map((t) => <p key={t}>{t}</p>)}
            </div>
          </div>
        </Container>
      </Section>

      {p.page.story ? (
        <Section>
          <Container className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:items-center">
            <div>
              <SectionHeading eyebrow="Design story" title={p.page.story.heading} />
              <div className="mt-6 space-y-4 text-forest/85">
                {p.page.story.body.map((t) => <p key={t}>{t}</p>)}
              </div>
            </div>
            <BentoSettle
              className="grid-cols-2"
              cells={[
                { key: "a", className: "aspect-[4/5]", content: <Media image={p.page.gallery[1]} sizes="(min-width: 1024px) 30vw, 50vw" className="h-full rounded-[6px]" fill /> },
                { key: "b", className: "aspect-[4/5]", content: <Media image={p.page.gallery[2] ?? p.page.gallery[0]} sizes="(min-width: 1024px) 30vw, 50vw" className="h-full rounded-[6px]" fill /> },
                { key: "c", className: "col-span-2 aspect-[16/9]", content: <Media image={p.page.gallery[0]} sizes="(min-width: 1024px) 60vw, 100vw" className="h-full rounded-[6px]" fill /> },
              ]}
            />
          </Container>
        </Section>
      ) : null}

      {p.page.audiences ? (
        <Section>
          <Container>
            <SectionHeading eyebrow="Who it is for" title="Coastal living for every stage of life" />
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {p.page.audiences.map((a) => (
                <li key={a.title} className="rounded-[6px] bg-shell p-6 ring-1 ring-line/70">
                  <h3 className="t-h4">{a.title}</h3>
                  <p className="mt-2 text-[15px] leading-6 text-forest/80">{a.text}</p>
                </li>
              ))}
            </ul>
            {p.page.principles ? (
              <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
                <div>
                  <Eyebrow>Design principles</Eyebrow>
                  <ol className="mt-6 space-y-6">
                    {p.page.principles.map((pr, i) => (
                      <li key={pr.title} className="flex gap-5">
                        <span className="font-display text-[40px] leading-none font-semibold text-[var(--accent-text)]">0{i + 1}</span>
                        <span>
                          <span className="t-h4 block">{pr.title}</span>
                          <span className="mt-1 block text-forest/80">{pr.text}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
                <Media image="ovPrinciples" sizes="(min-width: 1024px) 55vw, 100vw" className="rounded-[6px]" />
              </div>
            ) : null}
          </Container>
        </Section>
      ) : null}

      {p.page.location || p.page.siteViews ? (
        <Section tone="shell" id="location" className="scroll-mt-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
              <div>
                <SectionHeading eyebrow="Location & views" title={p.page.location?.heading ?? "Views from the site"} />
                {p.page.location ? (
                  <div className="mt-6 space-y-4 text-forest/85">
                    {p.page.location.body.map((t) => <p key={t}>{t}</p>)}
                  </div>
                ) : null}
                <TextLink href="/anilao" className="mt-8">Getting to Anilao</TextLink>
              </div>
              {p.page.compare ? (
                <CompareSlider today={images[p.page.compare.today]} planned={images[p.page.compare.planned]} caption={p.page.compare.caption} />
              ) : null}
            </div>
            {p.page.siteViews ? (
              <div className="mt-12">
                <p className="t-eyebrow text-bronze-ink">Actual views from the site</p>
                <ul tabIndex={0} aria-label="Actual views from the site" className={`-mx-4 mt-4 flex snap-x scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 ${p.page.siteViews.length > 3 ? "lg:grid-cols-5" : ""}`}>
                  {p.page.siteViews.map((k) => (
                    <li key={k} className="w-[70%] shrink-0 snap-start md:w-auto">
                      <Media image={k} sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 70vw" className="aspect-[4/5] rounded-[6px]" fill caption="none" />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Container>
        </Section>
      ) : null}

      {p.page.masterplan ? (
        <Section className="bg-contours">
          <Container className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <Media image={p.page.masterplan.image} sizes="(min-width: 1024px) 55vw, 100vw" className="rounded-[6px] bg-shell ring-1 ring-line" caption="none" />
            <div>
              <SectionHeading eyebrow="Masterplan" title="A walkable estate on 2.3 hectares" />
              <p className="mt-5 text-forest/85">{p.page.masterplan.caption}</p>
              <ul className="mt-6 grid grid-cols-2 gap-2 text-[15px]">
                {p.page.masterplan.legend.map((l) => (
                  <li key={l} className="flex items-center gap-2"><span aria-hidden className="size-2 rounded-full bg-[var(--accent-soft)]" />{l}</li>
                ))}
              </ul>
              <p className="t-caption mt-6">An interactive masterplan with live availability is planned for Phase 2.</p>
            </div>
          </Container>
        </Section>
      ) : null}

      <Section tone="shell" id="residences" className="scroll-mt-20">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Residences" title={`Homes at ${p.nameWithPlace}`} lead="Sizes from the current plans. Final specifications may change." />
            {hasResidencesPage ? <TextLink href={`${path}/residences`} className="shrink-0">See all residences</TextLink> : null}
          </div>
          {hasResidencesPage ? (
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {groups.flatMap((g) => units.filter((u) => u.group === g && u.description)).map((u) => (
                <li key={u.name} className="rounded-[6px] bg-linen p-6">
                  <p className="t-eyebrow !text-[11px] text-[var(--accent-text)]">{u.count} homes</p>
                  <h3 className="t-h3 mt-2">{u.name}</h3>
                  <p className="mt-1 text-driftwood">{u.bedrooms} bedrooms · {u.floorArea}</p>
                  <p className="mt-3 text-[15px] leading-6 text-forest/80">{u.description}</p>
                </li>
              ))}
              <li className="rounded-[6px] bg-linen p-6">
                <p className="t-eyebrow !text-[11px] text-[var(--accent-text)]">36 homes</p>
                <h3 className="t-h3 mt-2">Condominium residences</h3>
                <p className="mt-1 text-driftwood">Studio to 2 bedrooms · 48–108 sqm</p>
                <p className="mt-3 text-[15px] leading-6 text-forest/80">Two stepped clusters where each level mixes home types and premium units sit at the corners.</p>
              </li>
            </ul>
          ) : (
            <div className="mt-10">
              <UnitTable units={units} showPrices={p.showPrices} caption={`Residence types at ${p.nameWithPlace}`} />
              {p.page.availabilityNote ? <p className="mt-4 text-forest/85">{p.page.availabilityNote} Our contact details are below.</p> : null}
            </div>
          )}
        </Container>
      </Section>

      {p.page.features ? (
        <Section>
          <Container>
            <SectionHeading eyebrow="Living here" title={p.page.features.heading} lead={p.page.features.intro} />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {p.page.features.items.map((f) => <FeatureTile key={f.title} icon={f.icon} title={f.title} text={f.text} />)}
            </div>
          </Container>
        </Section>
      ) : null}

      {p.page.sustainability ? (
        <Section tone="sage">
          <Container>
            <SectionHeading eyebrow="Sustainability" title={p.page.sustainability.heading} lead={p.page.sustainability.intro} />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {p.page.sustainability.items.map((f) => <FeatureTile key={f.title} icon={f.icon} title={f.title} text={f.text} className="bg-shell" />)}
            </div>
            <TextLink href="/sustainability" className="mt-10">Our approach to sustainability</TextLink>
          </Container>
        </Section>
      ) : null}

      <Section>
        <Container>
          <SectionHeading eyebrow="Gallery" title="A closer look" />
          <BentoSettle
            className="mt-10 grid-cols-2 md:grid-cols-4"
            cells={p.page.gallery.map((k, i) => ({
              key: k,
              className: galleryCellClass(p.page.gallery.length, i),
              content: <Media image={k} sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"} className="h-full min-h-full rounded-[6px]" fill />,
            }))}
          />
        </Container>
      </Section>

      <Section tone="shell">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <SectionHeading eyebrow="Owner benefits" title="Owning here, looked after" />
          <div>
            <p className="text-forest/85">
              Owners can expect in-house property management, concierge, a dive-centre discount and an optional rental pool with a 10-year agreement renewable by the owner, plus
              owner nights and priority.
            </p>
            <p className="t-caption mt-3">Owner benefits are subject to the final rental and management agreements. No income or return is guaranteed.</p>
            <TextLink href="/ownership#owner-benefits" className="mt-6">Ownership and benefits</TextLink>
          </div>
        </Container>
      </Section>

      <ContactBlock
        title={`Ask about ${p.nameWithPlace}`}
        intro={p.page.availabilityNote ?? "For residences, availability or a site visit, reach our team directly."}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ApartmentComplex",
          name: p.nameWithPlace,
          description: p.summary,
          url: absoluteUrl(path),
          image: absoluteUrl(images[p.heroImage].src.src),
          address: { "@type": "PostalAddress", addressLocality: "Mabini", addressRegion: "Batangas", addressCountry: "PH" },
          ...(p.geo ? { geo: { "@type": "GeoCoordinates", latitude: p.geo.lat, longitude: p.geo.lng } } : {}),
          numberOfAccommodationUnits: units.reduce((n, u) => n + u.count, 0),
          containsPlace: units.map((u) => ({ "@type": "Accommodation", name: u.name, description: `${u.bedrooms} bedrooms, ${u.floorArea}` })),
          brand: { "@type": "Organization", name: site.legalName },
        }}
      />
    </div>
  );
}
