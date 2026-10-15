import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/legal-page";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Notice",
  description: "How Terra Concetti Properties Corp. collects, uses and protects personal data under the Philippine Data Privacy Act of 2012.",
  path: "/legal/privacy-notice",
});

/** P17 Privacy Notice (Data Privacy Act, RA 10173). Draft pending counsel review. */
export default function PrivacyNoticePage() {
  return (
    <LegalPage title="Privacy Notice" path="/legal/privacy-notice">
      <p>
        {site.legalName} (&ldquo;Terra Concetti&rdquo;, &ldquo;we&rdquo;) respects your privacy. This notice explains what personal data we collect through this website
        and when you contact us, why we collect it, and your rights under the Data Privacy Act of 2012 (Republic Act No. 10173) and its implementing rules.
      </p>
      <h2>Who we are</h2>
      <p>
        {site.legalName}, {site.office.street}, {site.office.locality}, {site.office.region}, Philippines. For privacy questions or requests, email {site.email} with the
        subject &ldquo;Data privacy&rdquo;. Our Data Protection Officer’s details will be published here.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>When you contact us</strong> by phone or email: your name, contact details and anything you choose to tell us, such as the destination or type of home you
          are interested in.
        </li>
        <li>
          <strong>When you browse</strong>: our hosting provider records technical data such as IP address, browser type and pages requested, to deliver and secure the site.
        </li>
        <li>
          <strong>Optional cookies</strong>: only if you allow them in the cookie banner, analytics and marketing cookies measure how the site is used and the performance
          of our advertising.
        </li>
      </ul>
      <p>This website does not currently have enquiry forms. If forms are added, this notice will be updated before they go live.</p>
      <h2>Why we use it</h2>
      <ul>
        <li>To answer your enquiry and arrange site visits you ask for.</li>
        <li>To operate, secure and improve this website.</li>
        <li>With your consent, to measure site use and advertising.</li>
        <li>To comply with legal and regulatory obligations.</li>
      </ul>
      <h2>Legal basis</h2>
      <p>
        We process personal data on the basis of your consent, to respond to requests you make before entering into a contract, for our legitimate interests in running
        a secure website, and where the law requires it.
      </p>
      <h2>Who we share it with</h2>
      <p>
        We do not sell personal data. We share it only with service providers that help us run the website and our business, under appropriate safeguards: our hosting
        provider (Netlify) and, only if you consent to optional cookies, Google (Analytics, Tag Manager) and Meta (advertising measurement). Some of these providers
        process data outside the Philippines.
      </p>
      <h2>How long we keep it</h2>
      <p>
        We keep enquiry information for as long as needed to respond to you and for any follow-up you agree to, and then delete or anonymise it, unless the law requires us
        to keep it longer. Cookie choices are remembered for six months.
      </p>
      <h2>Your rights</h2>
      <p>
        You have the right to be informed, to access your data, to object, to have it corrected, erased or blocked, to data portability, and to claim damages, as provided
        by the Data Privacy Act. You may also lodge a complaint with the National Privacy Commission. To exercise your rights, email {site.email}.
      </p>
      <h2>Cookies</h2>
      <p>
        Necessary cookies keep the site working. Analytics and marketing cookies are off unless you choose to allow them, and you can change your choice at any time using
        &ldquo;Cookie settings&rdquo; in the site footer (shown when analytics is active).
      </p>
      <h2>Changes</h2>
      <p>
        We may update this notice. The date at the top shows the latest version. See also our <Link href="/legal/terms">Terms of Use</Link> and{" "}
        <Link href="/legal/disclaimers">Disclaimers</Link>.
      </p>
    </LegalPage>
  );
}
