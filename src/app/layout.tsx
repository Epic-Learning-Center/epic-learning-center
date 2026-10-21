import type { Metadata } from "next"
import "@fontsource/nunito/latin-600.css"
import "@fontsource/nunito/latin-700.css"
import "@fontsource/nunito/latin-800.css"
import "@fontsource/nunito/latin-900.css"
import "./globals.css"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { siteConfig } from "@/content/siteData"

export const metadata: Metadata = {
  title: {
    default: "EPIC Learning Center · Jinja, Uganda",
    template: "%s · EPIC Learning Center",
  },
  description:
    "Hands-on classes, Jinja's only children's library, and a family community hub for homeschoolers, after-school learners, and worldschooling families.",
  openGraph: {
    title: "EPIC Learning Center · Jinja, Uganda",
    description:
      "Learning. Community. Friends. Fun. Classes and a family hub on Plot 2 Speke Road, Jinja.",
    locale: "en_UG",
    type: "website",
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-white">
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: siteConfig.name,
              address: {
                "@type": "PostalAddress",
                streetAddress: "Plot 2 Speke Road",
                addressLocality: "Jinja",
                addressCountry: "UG",
              },
              email: siteConfig.email,
              telephone: siteConfig.phone,
              url: siteConfig.facebookUrl,
              sameAs: [siteConfig.facebookUrl, siteConfig.instagramUrl],
            }),
          }}
        />
      </body>
    </html>
  )
}
