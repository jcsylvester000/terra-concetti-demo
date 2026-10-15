import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { cormorant, familjen, lexendGiga } from "./fonts";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ConsentManager } from "@/components/consent/consent-manager";
import { allowIndexing, gtmId, siteUrl } from "@/lib/env";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${site.name} | Sustainable Homes in Anilao, Batangas`, template: `%s | ${site.name}` },
  description: "Eco-luxury villas and residences above Anilao’s reefs, two hours from Manila.",
  applicationName: site.name,
  robots: allowIndexing ? undefined : { index: false, follow: false },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#404939",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PH" suppressHydrationWarning className={`${cormorant.variable} ${familjen.variable} ${lexendGiga.variable}`}>
      <body suppressHydrationWarning className="flex min-h-dvh flex-col antialiased">
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        {gtmId ? <ConsentManager gtmId={gtmId} /> : null}
      </body>
    </html>
  );
}
