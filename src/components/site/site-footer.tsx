import Link from "next/link"
import { Suspense } from "react"
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { navLinks, siteConfig } from "@/content/siteData"
import { CurrentYear } from "@/components/site/current-date"
import { Logo } from "@/components/site/logo"
import { FacebookIcon } from "@/components/site/facebook-icon"

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-slate-200 bg-cloud">
      <div className="mx-auto grid w-full max-w-6xl gap-x-10 gap-y-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[11rem_minmax(0,1.15fr)_minmax(0,1.45fr)_minmax(0,0.75fr)]">
        <div className="flex flex-col gap-4">
          <Logo size="footer" />
          <p className="leading-relaxed font-semibold text-body">
            Jinja&apos;s hands-on learning center and family community hub for ages 0–18.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-extrabold tracking-wider text-ink uppercase">Visit</h2>
          <p className="flex items-start gap-2 font-semibold text-body">
            <MapPin className="mt-0.5 size-4 shrink-0 text-macaw" aria-hidden="true" />
            <span>
              {siteConfig.address}
              <span className="mt-1 block text-sm">{siteConfig.directions}</span>
            </span>
          </p>
          <ul className="flex flex-col gap-3 font-semibold text-body">
            {siteConfig.hours.map((slot) => (
              <li key={slot.days}>
                <span className="block font-extrabold text-ink">{slot.days}</span>
                <span className="whitespace-nowrap">{slot.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-extrabold tracking-wider text-ink uppercase">Contact</h2>
          <a
            href={siteConfig.phoneHref}
            className="flex items-center gap-2 font-semibold text-body no-underline hover:text-ink"
          >
            <Phone className="size-4 text-macaw" aria-hidden="true" />
            {siteConfig.phone}
          </a>
          <a
            href={siteConfig.whatsappUrl}
            className="flex items-center gap-2 font-semibold text-body no-underline hover:text-ink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="size-4 text-feather" aria-hidden="true" />
            WhatsApp {siteConfig.whatsapp}
          </a>
          <a
            href={siteConfig.emailHref}
            className="flex items-start gap-2 font-semibold text-body no-underline hover:text-ink"
          >
            <Mail className="mt-0.5 size-4 shrink-0 text-bee" aria-hidden="true" />
            <span className="break-words">{siteConfig.email}</span>
          </a>
          <a
            href={siteConfig.facebookUrl}
            className="flex items-center gap-2 font-semibold text-body no-underline hover:text-ink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon className="size-4 text-macaw" />
            Facebook
          </a>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-extrabold tracking-wider text-ink uppercase">Explore</h2>
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-semibold text-body no-underline hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t-2 border-slate-200">
        <p className="mx-auto w-full max-w-6xl px-4 py-4 text-sm font-semibold text-slate-500 sm:px-6">
          ©{" "}
          <Suspense fallback={null}>
            <CurrentYear />
          </Suspense>{" "}
          {siteConfig.name}. Plot 2 Speke Road, Jinja, Uganda.
        </p>
      </div>
    </footer>
  )
}
