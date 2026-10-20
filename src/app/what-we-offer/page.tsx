import type { Metadata } from "next"
import { SignupButton, WhatsAppButton } from "@/components/site/actions"
import { CheckList } from "@/components/site/check-list"
import { ClassBrowser } from "@/components/site/class-browser"
import { PageHero, Section, SectionHeading } from "@/components/site/section"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { memberships, rentalIncludes, siteConfig } from "@/content/siteData"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "What We Offer",
  description:
    "Family memberships, hands-on classes, the EPIC Worldschooling Hub, tutoring, and facility rentals in Jinja.",
}

const accentBorder = {
  macaw: "border-macaw",
  bee: "border-bee",
  beetle: "border-beetle",
} as const

export default function WhatWeOfferPage() {
  return (
    <>
      <PageHero
        eyebrow="What we offer"
        title="A place to learn, play, and belong."
      >
        Memberships for everyday access, hands-on classes, a worldschooling hub,
        private tutoring, and a space you can rent for birthdays and workshops.
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="Memberships & drop-in"
          title="Come for the day, or make EPIC part of the month."
        >
          Class fees are separate. Members pay discounted rates when they sign up
          for a class.
        </SectionHeading>
        <div className="grid gap-4 lg:grid-cols-3">
          {memberships.map((plan) => (
            <Card key={plan.id} className={cn(accentBorder[plan.accent])}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <p className="text-3xl font-black tracking-tight text-ink">{plan.price}</p>
                <CardDescription>{plan.period}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed font-semibold text-body">{plan.summary}</p>
                <CheckList items={plan.perks} />
              </CardContent>
              <CardFooter>
                <SignupButton variant="outline" className="w-full sm:w-auto">
                  Register your family
                </SignupButton>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="classes" tone="cloud" className="scroll-mt-24">
        <SectionHeading eyebrow="Classes" title="Current and upcoming classes.">
          Filter by subject. Every card links straight to the registration form.
        </SectionHeading>
        <ClassBrowser />
      </Section>

      <Section id="worldschooling" className="scroll-mt-24">
        <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
          <Card className="border-macaw">
            <CardHeader>
              <p className="text-sm font-extrabold tracking-wider text-macaw uppercase">
                The EPIC Worldschooling Hub
              </p>
              <CardTitle className="text-3xl">
                Worldschooling in Jinja, Uganda: Adventure for Kids, Work Time for Parents.
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed font-semibold text-body">
                Looking for an unforgettable community experience in the Adventure
                Capital of East Africa? At the EPIC Worldschooling Hub, visiting kids
                join classes alongside local children—learning Ugandan crafts,
                drumming, dance, and culture while making lifelong friends. Plus, our
                quiet study room and library give traveling students a dedicated space
                for their online studies.
              </p>
              <div className="rounded-2xl bg-cloud p-4">
                <h3 className="font-extrabold text-ink">For the parents</h3>
                <p className="mt-2 leading-relaxed font-semibold text-body">
                  Through our partnership with Surjio&apos;s GuestHouse, traveling
                  families enjoy affordable, comfortable accommodation with dedicated
                  parent co-working spaces. Parents can also drop off children ages
                  11+ at the EPIC Center while they work remotely, explore the Jinja
                  market, stroll down Main Street, or grab lunch by the Nile.
                </p>
              </div>
              <p className="leading-relaxed font-semibold text-body">
                Join one of our scheduled all-inclusive EPIC Worldschooling Hub
                cohorts, or contact us any time of year for custom-packaged days and
                times tailored around your family&apos;s travel and work schedule.
              </p>
            </CardContent>
            <CardFooter>
              <WhatsAppButton>Plan a worldschooling stay</WhatsAppButton>
            </CardFooter>
          </Card>
          <Card className="border-bee bg-[#FFF8DC]">
            <CardHeader>
              <CardTitle>Good to know</CardTitle>
            </CardHeader>
            <CardContent>
              <CheckList
                items={[
                  "Kids learn beside local children, not in a separate tourist group.",
                  "Quiet study room and library for online schoolwork.",
                  "Drop-off for ages 11+ while parents work or explore Jinja.",
                  "Scheduled cohorts, or custom days built around your trip.",
                  "Stay nearby through Surjio's GuestHouse.",
                ]}
              />
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section tone="cloud">
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Private tutoring</CardTitle>
              <CardDescription>
                1-on-1 and small group tutoring sessions booked directly through the
                Center. Rates vary by tutor and subject — reach out and we&apos;ll
                match your child with the ideal educator.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <WhatsAppButton variant="outline">Ask about tutoring</WhatsAppButton>
            </CardFooter>
          </Card>
          <Card className="border-coral" id="rentals">
            <CardHeader>
              <CardTitle>Rent EPIC for Birthday Parties, Workshops & Events!</CardTitle>
              <CardDescription>
                Host your next kids&apos; birthday party, community meetup, or weekend
                workshop at EPIC Learning Center.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="font-extrabold text-ink">Included with every rental</h3>
              <CheckList items={rentalIncludes} />
              <p className="font-extrabold text-ink">
                Pricing: contact us for custom rental rates.
              </p>
            </CardContent>
            <CardFooter>
              <WhatsAppButton>
                Book a Rental via WhatsApp ({siteConfig.whatsapp})
              </WhatsAppButton>
            </CardFooter>
          </Card>
        </div>
      </Section>
    </>
  )
}
