import type { Metadata } from "next"
import { Suspense } from "react"
import { CalendarDays } from "lucide-react"
import { SignupButton } from "@/components/site/actions"
import { PageHero, Section, SectionHeading } from "@/components/site/section"
import { WeeklySchedule } from "@/components/site/weekly-schedule"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CurrentMonth } from "@/components/site/current-date"
import { getSchedule } from "@/content/schedule"
import { calendarMonth, siteConfig } from "@/content/siteData"

export const metadata: Metadata = {
  title: "Monthly Calendar",
  description:
    "Weekly classes and open center hours at EPIC Learning Center in Jinja, plus special events for the month.",
}

export default async function CalendarPage() {
  const { classes, events } = await getSchedule()

  return (
    <>
      <PageHero
        eyebrow={
          <Suspense fallback="This month">
            <CurrentMonth />
          </Suspense>
        }
        title="This month at EPIC."
      >
        {calendarMonth.summary} Center hours run Monday–Friday 9:00am – 6:00pm and
        Saturday 9:00am – 5:00pm for members and daily drop-ins. We&apos;re closed
        Sundays.
      </PageHero>

      <div>
        <div className="h-8 sm:h-10" aria-hidden="true" />
        <div className="sticky top-[var(--header-height)] z-40 border-y-2 border-feather-depth bg-feather text-white">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="max-w-2xl text-lg font-extrabold sm:text-xl">
              Ready to join? Click here to register!
            </p>
            <SignupButton variant="outline" className="w-full shrink-0 sm:w-auto">
              Registration Form
            </SignupButton>
          </div>
        </div>

      <Section tone="cloud" wide className="pt-10 sm:pt-12">
        <SectionHeading
          eyebrow="Weekly rhythm"
          title="Monday through Saturday."
        >
          Colored cards are classes. Under each day is when the center is open
          for the library, study room, and outdoor play area.
        </SectionHeading>
        <WeeklySchedule classes={classes} />
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Special events"
          title={
            <>
              <Suspense fallback="This month">
                <CurrentMonth />
              </Suspense>{" "}
              highlights.
            </>
          }
        >
          One-off workshops and community events land here. Weekly classes keep
          running even when this board is quiet.
        </SectionHeading>
        {events.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {events.map((event) => (
              <Card key={event.id} className="border-bee">
                <CardHeader>
                  <Badge variant="age">{event.tag}</Badge>
                  <CardTitle>{event.title}</CardTitle>
                  <p className="font-extrabold text-macaw">{event.when}</p>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed font-semibold text-body">
                    {event.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Empty className="rounded-3xl border-2 border-dashed border-slate-200 bg-cloud">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <CalendarDays />
              </EmptyMedia>
              <EmptyTitle className="font-extrabold text-ink">
                No extra events posted yet
              </EmptyTitle>
              <EmptyDescription>
                Nothing extra is posted this month. Open center hours are on the
                board above, and new events will show up here when they are added.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </Section>

      {siteConfig.googleCalendarEmbedUrl ? (
        <Section tone="cloud" className="pt-0">
          <SectionHeading title="Google Calendar">
            The same month, pulled in from our shared calendar.
          </SectionHeading>
          <iframe
            title="EPIC Learning Center Google Calendar"
            src={siteConfig.googleCalendarEmbedUrl}
            className="h-[640px] w-full rounded-3xl border-2 border-b-4 border-slate-200 bg-white"
          />
        </Section>
      ) : null}
      </div>
    </>
  )
}
