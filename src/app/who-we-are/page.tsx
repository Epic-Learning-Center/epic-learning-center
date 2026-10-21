import type { Metadata } from "next"
import Image from "next/image"
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

      <Section className="pt-0">
        <figure className="overflow-hidden rounded-3xl border-2 border-b-4 border-slate-200 bg-white">
          <div className="relative aspect-[3/2]">
            <Image
              src="/images/classroom-circle.jpg"
              alt="Children and mentors gathered for a class in the yellow classroom"
              fill
              unoptimized
              sizes="(min-width: 1024px) 1100px, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="px-4 py-3 text-base font-extrabold text-slate-500">
            A class gathering in the big room
          </figcaption>
        </figure>
      </Section>

      <Section tone="cloud">
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="overflow-hidden p-0">
            <div className="relative aspect-[3/2]">
              <Image
                src="/images/chess-lesson.jpg"
                alt="A mentor teaching children chess in the classroom"
                fill
                unoptimized
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <CardHeader className="px-6 sm:px-8">
              <CardTitle>Meet our mentors</CardTitle>
              <CardDescription>
                EPIC&apos;s mentors rotate with our classes. We tap into Jinja&apos;s
                talented global community of parents and local specialists who share
                their real-world passions — teaching everything from car mechanics and
                literacy to Afro-dance and breakdancing.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6 sm:px-8 sm:pb-8">
              <div className="flex flex-wrap gap-2">
                {mentorSubjects.map((subject) => (
                  <Badge key={subject} variant="outline">
                    {subject}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden border-macaw p-0">
            <div className="relative aspect-[3/2]">
              <Image
                src="/images/drawing-maps.jpg"
                alt="A child drawing a map during a hands-on lesson"
                fill
                unoptimized
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[center_20%]"
              />
            </div>
            <CardHeader className="px-6 sm:px-8">
              <CardTitle>Meet our tutors</CardTitle>
              <CardDescription>
                We offer private 1-on-1 and small-group tutoring sessions across
                academic subjects. Because every child learns differently, we match
                your child individually with the right tutor to fit their needs and
                goals.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6 sm:px-8 sm:pb-8">
              <WhatsAppButton>Ask about a tutor</WhatsAppButton>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  )
}
