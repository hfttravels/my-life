import type { Metadata } from "next";
import { Outfit, Pacifico, Bebas_Neue } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { FloatingLeadTrigger } from "@/components/enquiry/FloatingLeadTrigger";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const pacifico = Pacifico({ subsets: ["latin"], weight: "400", variable: "--font-pacifico" });
const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-bebas" });

const siteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const gaId = process.env.NEXT_PUBLIC_GA_ID;
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const isProduction = process.env.NODE_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL("https://hasslefreetravels.com"),
  title: "Hassle Free Travels | Best Travel Agency in India",
  description: "Book your dream trip with Hassle Free Travels. Explore premium destinations and curated travel experiences.",
  openGraph: {
    title: "Hassle Free Travels | Best Travel Agency in India",
    description: "Book your dream trip with Hassle Free Travels. Explore premium destinations and curated travel experiences.",
    url: "https://hasslefreetravels.com",
    siteName: "Hassle Free Travels",
    type: "website",
  },
  ...(siteVerification
    ? {
        verification: {
          google: siteVerification,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* GA4 — only in production with ID */}
        {isProduction && gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { send_page_view: true });
              `}
            </Script>
          </>
        )}

        {/* Meta Pixel — only in production with ID */}
        {isProduction && metaPixelId && (
          <Script id="meta-pixel-init" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}

        {/* dataLayer init for non-production (so push calls don't error) */}
        {!isProduction && (
          <Script id="datalayer-init" strategy="beforeInteractive">
            {`window.dataLayer = window.dataLayer || [];`}
          </Script>
        )}
      </head>
      <body className={`${outfit.variable} ${pacifico.variable} ${bebasNeue.variable} ${outfit.className}`}>
        <AnalyticsProvider />
        {children}
        <FloatingLeadTrigger />
      </body>
    </html>
  );
}
