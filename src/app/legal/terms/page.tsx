import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/legal-page";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description: "The terms that apply when you use the Terra Concetti website.",
  path: "/legal/terms",
});

/** P18 Terms of Use. Draft pending counsel review. */
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" path="/legal/terms">
      <p>
        These terms apply to your use of this website, operated by {site.legalName}. By using the site you agree to them. If you do not agree, please do not use the site.
      </p>
      <h2>Information only</h2>
      <p>
        The content on this site is general information about Terra Concetti and its planned developments. It is not an offer to sell, a contract or professional advice.
        Please read our <Link href="/legal/disclaimers">Disclaimers</Link>.
      </p>
      <h2>Intellectual property</h2>
      <p>
        The text, designs, renders, photographs, logos and other material on this site belong to Terra Concetti or its licensors and are protected by law. You may view and
        share pages for personal, non-commercial use. Any other use needs our written permission.
      </p>
      <h2>Image credits</h2>
      <p>Underwater photography by Irwin Cua is used under licence. Renders are artist’s perspectives prepared for Terra Concetti.</p>
      <h2>Links to other sites</h2>
      <p>Links to third-party websites are provided for convenience. We are not responsible for their content or privacy practices.</p>
      <h2>Acceptable use</h2>
      <p>Do not misuse the site, attempt to gain unauthorised access, or interfere with its operation or security.</p>
      <h2>Limitation of liability</h2>
      <p>
        We work to keep the site accurate and available, but we do not guarantee that it is complete, current or error-free. To the extent allowed by law, we are not liable
        for loss arising from use of, or reliance on, the site.
      </p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the Republic of the Philippines. Courts of Makati City have jurisdiction, subject to applicable law.</p>
      <h2>Contact</h2>
      <p>Questions about these terms: {site.email}.</p>
    </LegalPage>
  );
}
