import type { Metadata } from "next"
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { SignupButton } from "@/components/site/actions"
import { FacebookIcon } from "@/components/site/facebook-icon"
import { NewsletterForm } from "@/components/site/newsletter-form"
import { PageHero, Section, SectionHeading } from "@/components/site/section"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { signupSteps, siteConfig } from "@/content/siteData"

export const metadata: Metadata = {
  title: "Join Us",
  description:
    "Register for classes, get the monthly calendar, and find EPIC Learning Center at Plot 2 Speke Road, Jinja.",
}

const stepTone = [
  "bg-feather text-white border-feather-depth",
  "bg-macaw text-white border-macaw-depth",
  "bg-bee text-ink border-[#E6B400]",
]

export default function JoinUsPage() {
  return (
    <>
      <PageHero eyebrow="Join us" title="Come learn with us.">
        Three short steps to register, a way to get the monthly calendar, and
        everything you need to find the white wall on Speke Road.
      </PageHero>

      <Section>
        <SectionHeading eyebrow="How to sign up" title="From the form to the front gate." />
        <ol className="grid gap-4 md:grid-cols-3">
          {signupSteps.map((step, index) => (
            <li key={step.title}>
              <Card className="h-full">
                <CardHeader>
                  <span
                    className={`flex size-12 items-center justify-center rounded-2xl border-b-4 text-xl font-black ${stepTone[index]}`}
                  >
                    {index + 1}
                  </span>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed font-semibold text-body">{step.body}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
        <SignupButton className="w-full sm:w-auto">Register on Google Forms</SignupButton>
      </Section>

      <Section tone="cloud" id="calendar-signup" className="scroll-mt-24">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center">
          <SectionHeading title="Get Our Monthly Calendar & Upcoming Classes">
            Drop your email below to receive our new monthly class calendar and
            special event updates.
          </SectionHeading>
          <Card>
            <CardContent>
              <NewsletterForm />
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section id="contact" className="scroll-mt-24">
        <SectionHeading eyebrow="Find us" title="Plot 2 Speke Road, Jinja.">
          {siteConfig.directions}
        </SectionHeading>
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Contact & hours</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-macaw" aria-hidden="true" />
                  <span className="font-semibold text-body">
                    <span className="block font-extrabold text-ink">Location</span>
                    {siteConfig.address}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-5 shrink-0 text-bee" aria-hidden="true" />
                  <span className="font-semibold text-body">
                    <span className="block font-extrabold text-ink">Hours</span>
                    {siteConfig.hoursSummary}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-5 shrink-0 text-beetle" aria-hidden="true" />
                  <span>
                    <span className="block font-extrabold text-ink">Email</span>
                    <a className="font-semibold text-body no-underline hover:text-ink" href={siteConfig.emailHref}>
                      {siteConfig.email}
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 size-5 shrink-0 text-macaw" aria-hidden="true" />
                  <span>
                    <span className="block font-extrabold text-ink">Phone</span>
                    <a className="font-semibold text-body no-underline hover:text-ink" href={siteConfig.phoneHref}>
                      {siteConfig.phone}
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle className="mt-0.5 size-5 shrink-0 text-feather" aria-hidden="true" />
                  <span>
                    <span className="block font-extrabold text-ink">WhatsApp</span>
                    <a
                      className="font-semibold text-body no-underline hover:text-ink"
                      href={siteConfig.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {siteConfig.whatsapp}
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <FacebookIcon className="mt-0.5 size-5 shrink-0 text-macaw" />
                  <a
                    className="font-extrabold text-ink no-underline hover:text-macaw"
                    href={siteConfig.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Follow EPIC Learning Center on Facebook
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
          <div className="overflow-hidden rounded-3xl border-2 border-b-4 border-slate-200 bg-cloud">
            <iframe
              title="Map showing EPIC Learning Center at Plot 2 Speke Road, Jinja, Uganda"
              src={siteConfig.mapEmbedUrl}
              className="h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Section>
    </>
  )
}
