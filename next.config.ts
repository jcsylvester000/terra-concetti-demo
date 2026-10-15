import type { NextConfig } from "next";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.CONTEXT === "production" ? process.env.URL : process.env.DEPLOY_PRIME_URL) ||
  "http://localhost:3000"
).replace(/\/$/, "");

/** Indexing is OFF unless ALLOW_INDEXING=true on a production build (keeps previews out of Google). */
const allowIndexing =
  process.env.ALLOW_INDEXING === "true" && (process.env.CONTEXT ? process.env.CONTEXT === "production" : true);

const gtm = process.env.NEXT_PUBLIC_GTM_ID ?? "";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${gtm ? " https://www.googletagmanager.com https://connect.facebook.net" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self'",
  `connect-src 'self'${gtm ? " https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://www.facebook.com" : ""}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  ...(allowIndexing ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  trailingSlash: false,
  // Put metadata in the initial HTML for every crawler (agency SEO rule, W08).
  htmlLimitedBots: /.*/,
  experimental: { inlineCss: true },
  images: { formats: ["image/avif", "image/webp"] },
  env: {
    NEXT_PUBLIC_SITE_URL: siteUrl,
    NEXT_PUBLIC_ALLOW_INDEXING: allowIndexing ? "true" : "false",
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/projects", destination: "/destinations", permanent: true },
      { source: "/the-coral", destination: "/destinations/the-coral-anilao", permanent: true },
      { source: "/ocean-view", destination: "/destinations/ocean-view-anilao", permanent: true },
      { source: "/why-anilao", destination: "/anilao", permanent: true },
    ];
  },
};

export default nextConfig;
