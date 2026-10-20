import type { Metadata } from "next"
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
import { calendarMonth, siteConfig, specialEvents } from "@/content/siteData"

export const metadata: Metadata = {
  title: "Monthly Calendar",
  description:
    "Weekly classes and open center hours at EPIC Learning Center in Jinja, plus special events for the month.",
}

export default function CalendarPage() {
  return (
    <>
      <PageHero eyebrow={calendarMonth.label} title="This month at EPIC.">
        {calendarMonth.summary} Center hours run Monday–Friday 9:00am – 6:00pm and
        Saturday 9:00am – 5:00pm for members and daily drop-ins. We&apos;re closed
        Sundays.
      </PageHero>

      <div>
        <div className="sticky top-20 z-40 border-y-2 border-feather-depth bg-feather text-white sm:top-24">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="max-w-2xl text-base font-extrabold sm:text-lg">
              Ready to join a class this month? Click here to fill out our quick
              Registration Form!
            </p>
            <SignupButton variant="outline" className="w-full shrink-0 sm:w-auto">
              Registration Form
            </SignupButton>
          </div>
        </div>

      <Section tone="cloud">
        <SectionHeading
          eyebrow="Weekly rhythm"
          title="Monday through Saturday."
        >
          Colored cards are classes. The white note on each day is open center time
          for the library, study room, and outdoor play area.
        </SectionHeading>
        <WeeklySchedule />
      </Section>

      <Section>
        <SectionHeading eyebrow="Special events" title={`${calendarMonth.label} highlights.`}>
          One-off workshops and community events land here. Weekly classes keep
          running even when this board is quiet.
        </SectionHeading>
        {specialEvents.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {specialEvents.map((event) => (
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
                Weekly classes and open center hours are on as usual. Check back
                when the month turns — or ask us what&apos;s coming.
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
