import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PhotoFrame } from "@/components/site/photo-frame"
import { PageHero, Section } from "@/components/site/section"
import { WhatsAppButton } from "@/components/site/actions"
import { founders, mentorSubjects } from "@/content/siteData"

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "Meet the founders, mentors, and tutors behind EPIC Learning Center, a family landing pad in Jinja, Uganda.",
}

export default function WhoWeArePage() {
  return (
    <>
      <PageHero
        eyebrow="Who we are"
        title="More Than a Classroom—We're Your Home Base in Jinja."
      >
        Moving to or living in Jinja shouldn&apos;t feel isolating. Situated on the
        shores of Lake Victoria and the banks of the Nile River, Jinja is a
        tight-knit community of local families, entrepreneurs, non-profits, and
        global travelers. We created EPIC Learning Center as a landing pad where
        kids make fast friendships, explore hands-on passions, and parents find an
        instant network of support.
      </PageHero>

      <Section>
        <div className="grid gap-4 lg:grid-cols-2">
          {founders.map((founder) => (
            <Card key={founder.name}>
              <PhotoFrame
                src={founder.image}
                alt={founder.name}
                caption={founder.caption}
                tone="beetle"
                icon="person"
                aspect="portrait"
              />
              <CardHeader>
                <CardTitle>{founder.name}</CardTitle>
                <CardDescription>{founder.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed font-semibold text-body">{founder.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="cloud">
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Meet our mentors</CardTitle>
              <CardDescription>
                EPIC&apos;s mentors rotate with our classes. We tap into Jinja&apos;s
                talented global community of parents and local specialists who share
                their real-world passions — teaching everything from car mechanics and
                literacy to Afro-dance and breakdancing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mentorSubjects.map((subject) => (
                  <Badge key={subject} variant="outline">
                    {subject}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="border-macaw">
            <CardHeader>
              <CardTitle>Meet our tutors</CardTitle>
              <CardDescription>
                We offer private 1-on-1 and small-group tutoring sessions across
                academic subjects. Because every child learns differently, we match
                your child individually with the right tutor to fit their needs and
                goals.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WhatsAppButton>Ask about a tutor</WhatsAppButton>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  )
}
