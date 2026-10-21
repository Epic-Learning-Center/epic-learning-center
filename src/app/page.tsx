import Image from "next/image"
import Link from "next/link"
import {
  Check,
  Compass,
  Globe,
  Hammer,
  House,
  Library,
  Sparkles,
  Sun,
  TreePalm,
  Users,
} from "lucide-react"
import { SignupButton, WhatsAppButton } from "@/components/site/actions"
import { ClassCard } from "@/components/site/class-card"
import { PhotoFrame } from "@/components/site/photo-frame"
import { Section, SectionHeading } from "@/components/site/section"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getSchedule } from "@/content/schedule"
import {
  audiences,
  familyQuote,
  heroPhotos,
  highlights,
  safetyPoints,
} from "@/content/siteData"
import { cn } from "@/lib/utils"

const audienceIcons = {
  home: House,
  sun: Sun,
  globe: Globe,
} as const

const audienceBorder = {
  feather: "border-feather",
  macaw: "border-macaw",
  bee: "border-bee",
} as const

const audienceIconTone = {
  feather: "bg-[#E9F8D8] text-[#3F8F00]",
  macaw: "bg-[#DDF4FE] text-[#0C7AAD]",
  bee: "bg-[#FFF4CC] text-[#8A6A00]",
} as const

const highlightIcons = {
  hammer: Hammer,
  trees: TreePalm,
  library: Library,
  compass: Compass,
  users: Users,
} as const

const highlightTone = [
  "bg-[#E9F8D8] text-[#3F8F00]",
  "bg-[#FFF4CC] text-[#8A6A00]",
  "bg-[#DDF4FE] text-[#0C7AAD]",
  "bg-[#F6E8FF] text-[#7A3EAD]",
  "bg-[#FFE4E4] text-[#C62828]",
]

export default async function HomePage() {
  const { classes } = await getSchedule()

  return (
    <>
      <section className="bg-white pt-10 pb-16 sm:pt-16 sm:pb-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6">
          <div className="flex max-w-3xl flex-col gap-5">
            <p className="w-fit rounded-full border-2 border-slate-200 bg-cloud px-4 py-1.5 text-sm font-extrabold text-ink">
              <span aria-hidden="true">📍 </span>
              Jinja, Uganda • Classes & Community for Ages 0–18
            </p>
            <h1 className="text-4xl font-black tracking-tight text-ink sm:text-6xl">
              Learning. Community. Friends. Fun.
            </h1>
            <p className="text-lg leading-relaxed font-semibold text-body">
              Welcome to Jinja&apos;s hands-on learning center and family community hub!
              From car mechanics, science, and ancient history to dance, arts, and
              Jinja&apos;s only children&apos;s library—we bring learning to life for
              homeschoolers, local students, and traveling worldschooling families.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <SignupButton className="w-full sm:w-auto" />
              <Button
                variant="secondary"
                className="w-full sm:w-auto"
                nativeButton={false}
                render={<Link href="/calendar" />}
              >
                View Monthly Calendar
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {heroPhotos.map((photo, index) => (
              <PhotoFrame
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                caption={photo.caption}
                tone={photo.tone}
                icon={photo.icon}
                priority={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      <Section tone="cloud">
        <SectionHeading eyebrow="Jinja families" title="Who we serve">
          Daytime classes, after-school adventures, and a soft landing for families
          passing through Jinja.
        </SectionHeading>
        <div className="grid gap-4 lg:grid-cols-3">
          {audiences.map((audience) => {
            const Icon = audienceIcons[audience.icon]
            return (
              <Card
                key={audience.title}
                className={cn(
                  "motion-safe:transition-transform motion-safe:hover:-translate-y-1",
                  audienceBorder[audience.tone]
                )}
              >
                <CardHeader>
                  <span
                    className={cn(
                      "flex size-12 items-center justify-center rounded-2xl",
                      audienceIconTone[audience.tone]
                    )}
                  >
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <CardTitle>{audience.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed font-semibold text-body">{audience.body}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="The EPIC difference" title="Why families love EPIC" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {highlights.map((item, index) => {
            const Icon = highlightIcons[item.icon]
            return (
              <Card
                key={item.title}
                className={cn(
                  "lg:col-span-2",
                  index >= 3 && "lg:col-span-3"
                )}
              >
                <CardHeader>
                  <span
                    className={cn(
                      "flex size-12 items-center justify-center rounded-2xl",
                      highlightTone[index]
                    )}
                  >
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.body}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
        <figure className="max-w-3xl border-l-4 border-bee pl-5 sm:pl-6">
          <blockquote className="text-lg leading-relaxed font-extrabold text-ink sm:text-xl">
            “{familyQuote.text}”
          </blockquote>
          <figcaption className="mt-4 text-base font-extrabold text-slate-500">
            {familyQuote.attribution}
          </figcaption>
        </figure>
      </Section>

      <Section tone="green">
        <SectionHeading eyebrow="Safety & security" title="A place parents can trust.">
          EPIC is a fully supervised compound, so you can drop off with total peace of mind.
        </SectionHeading>
        <ul className="grid gap-4 md:grid-cols-2">
          {safetyPoints.map((point) => (
            <li
              key={point.title}
              className="flex items-start gap-3 rounded-3xl border-2 border-b-4 border-slate-200 bg-white p-5 sm:p-6"
            >
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-feather text-white">
                <Check className="size-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-extrabold text-ink">{point.title}</span>
                <span className="mt-1 block leading-relaxed font-semibold text-body">
                  {point.body}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="cloud">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Happening now" title="Classes families are joining.">
            Small groups, real projects, and mentors who love the subject as much as the kids do.
          </SectionHeading>
          <Button variant="outline" nativeButton={false} render={<Link href="/what-we-offer" />}>
            See all offerings
          </Button>
        </div>
        {classes.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-3">
            {classes.map((item) => (
              <ClassCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <Empty className="rounded-3xl border-2 border-dashed border-slate-200 bg-white">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Sparkles />
              </EmptyMedia>
              <EmptyTitle className="font-extrabold text-ink">
                No classes posted right now
              </EmptyTitle>
              <EmptyDescription>
                Mentors rotate through the year. Tell us what your child wants to
                try and we&apos;ll keep you posted when a class opens.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <WhatsAppButton size="sm">Ask about a class</WhatsAppButton>
            </EmptyContent>
          </Empty>
        )}
        <Card className="relative overflow-hidden border-macaw bg-macaw p-0 text-white sm:p-0">
          <div className="order-last flex flex-1 flex-col gap-4 p-6 sm:p-8 lg:order-none lg:w-[56%]">
            <CardHeader>
              <p className="text-sm font-extrabold tracking-wider text-white/90 uppercase">
                EPIC Worldschooling Hub
              </p>
              <CardTitle className="text-3xl text-white">
                Adventure for kids. Work time for parents.
              </CardTitle>
              <CardDescription className="text-white/95">
                Visiting children join classes alongside local kids — crafts, drumming,
                dance, and culture — while traveling parents get a quiet place to work
                in the Adventure Capital of East Africa.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                variant="outline"
                nativeButton={false}
                render={<Link href="/what-we-offer#worldschooling" />}
              >
                Explore the hub
              </Button>
            </CardFooter>
          </div>
          <div className="relative order-first min-h-72 overflow-hidden rounded-t-3xl lg:absolute lg:inset-y-0 lg:right-0 lg:order-none lg:w-[44%] lg:rounded-none lg:rounded-r-3xl">
            <Image
              src="/images/soccer-group.jpg"
              alt="Children and a mentor with soccer balls on the grass at EPIC"
              fill
              unoptimized
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </Card>
      </Section>
    </>
  )
}
