"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, readConsent, writeConsent, type Consent } from "./consent";

/**
 * Data Privacy Act consent banner + consent-gated Google Tag Manager (BRD §8.3).
 * - Rendered only when NEXT_PUBLIC_GTM_ID is set (T-AC5).
 * - "Accept all" and "Reject all" have equal visual weight (T-AC1).
 * - Consent Mode v2 defaults to denied; GTM loads only after a choice is made, and tags read the
 *   consent state, so no analytics/marketing request is sent before opt-in (T-AC2).
 */
export function ConsentManager({ gtmId }: { gtmId: string }) {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [open, setOpen] = useState(false);
  const [manage, setManage] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const c = readConsent();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading browser-only storage after mount
    setConsent(c);
    setOpen(!c);
    const reopen = () => {
      const cur = readConsent();
      setAnalytics(!!cur?.analytics);
      setMarketing(!!cur?.marketing);
      setManage(true);
      setOpen(true);
    };
    window.addEventListener(CONSENT_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_EVENT, reopen);
  }, []);

  useEffect(() => {
    if (!consent) return;
    const w = window as unknown as { gtag?: (...a: unknown[]) => void };
    w.gtag?.("consent", "update", {
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_storage: consent.marketing ? "granted" : "denied",
      ad_user_data: consent.marketing ? "granted" : "denied",
      ad_personalization: consent.marketing ? "granted" : "denied",
    });
  }, [consent]);

  const save = (a: boolean, m: boolean) => {
    setConsent(writeConsent(a, m));
    setOpen(false);
    setManage(false);
  };

  const anyGranted = !!consent && (consent.analytics || consent.marketing);

  return (
    <>
      {anyGranted ? (
        <>
          <Script id="tc-consent-default" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});
            gtag('consent','update',{analytics_storage:'${consent?.analytics ? "granted" : "denied"}',ad_storage:'${consent?.marketing ? "granted" : "denied"}',ad_user_data:'${consent?.marketing ? "granted" : "denied"}',ad_personalization:'${consent?.marketing ? "granted" : "denied"}'});
          `}</Script>
          <Script id="tc-gtm" strategy="lazyOnload" src={`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`} />
        </>
      ) : null}

      {open ? (
        <div role="dialog" aria-modal="false" aria-labelledby="consent-title" className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4">
          <div className="mx-auto max-w-3xl rounded-[6px] border border-line bg-shell p-5 text-forest shadow-[0_18px_40px_-16px_rgba(31,36,24,0.4)] sm:p-6">
            <p id="consent-title" className="t-h4">Your privacy</p>
            <p className="mt-2 text-[15px] leading-6 text-forest/85">
              We use optional cookies to understand how the site is used and to measure our advertising. They are off unless you allow them. See our{" "}
              <Link href="/legal/privacy-notice" className="underline decoration-gold decoration-2 underline-offset-4">Privacy Notice</Link>.
            </p>
            {manage ? (
              <fieldset className="mt-4 space-y-3">
                <legend className="sr-only">Cookie preferences</legend>
                <label className="flex min-h-11 items-center gap-3">
                  <input type="checkbox" checked disabled className="size-5 accent-moss" /> Necessary (always on)
                </label>
                <label className="flex min-h-11 items-center gap-3">
                  <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="size-5 accent-moss" /> Analytics
                </label>
                <label className="flex min-h-11 items-center gap-3">
                  <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="size-5 accent-moss" /> Marketing
                </label>
              </fieldset>
            ) : null}
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <button type="button" onClick={() => save(true, true)} className="min-h-12 rounded-[2px] border border-forest bg-shell px-4 font-medium text-forest hover:bg-forest hover:text-shell">
                Accept all
              </button>
              <button type="button" onClick={() => save(false, false)} className="min-h-12 rounded-[2px] border border-forest bg-shell px-4 font-medium text-forest hover:bg-forest hover:text-shell">
                Reject all
              </button>
              {manage ? (
                <button type="button" onClick={() => save(analytics, marketing)} className="min-h-12 rounded-[2px] border border-forest bg-shell px-4 font-medium text-forest hover:bg-forest hover:text-shell">
                  Save choices
                </button>
              ) : (
                <button type="button" onClick={() => setManage(true)} className="min-h-12 rounded-[2px] px-4 font-medium text-forest underline decoration-gold decoration-2 underline-offset-4">
                  Manage preferences
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
