import Link from "next/link"
import { centerHours, weekDays, type ClassOffering } from "@/content/siteData"
import { cn } from "@/lib/utils"

const dayTone: Record<(typeof weekDays)[number], string> = {
  Monday: "border-slate-200 bg-white",
  Tuesday: "border-bee bg-[#FFF8DC]",
  Wednesday: "border-macaw bg-[#E8F7FE]",
  Thursday: "border-slate-200 bg-white",
  Friday: "border-slate-200 bg-white",
  Saturday: "border-coral bg-[#FFF0F0]",
}

export function WeeklySchedule({ classes }: { classes: ClassOffering[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
      {weekDays.map((day) => {
        const sessions = classes
          .filter((item) => item.day === day)
          .sort((a, b) => startMinutes(a.time) - startMinutes(b.time))
        return (
          <article
            key={day}
            className="flex flex-col gap-3 rounded-3xl border-2 border-b-4 border-slate-200 bg-cloud p-4"
          >
            <h3 className="text-lg font-black tracking-tight text-ink">{day}</h3>
            <p className="rounded-2xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-extrabold text-slate-600">
              Center open
              <span className="mt-1 block font-black text-ink">{centerHours[day]}</span>
              <span className="mt-1 block text-xs font-semibold text-body">
                Library, study room & outdoor play
              </span>
            </p>
            {sessions.length > 0 ? (
              sessions.map((session) => (
                <Link
                  key={session.id}
                  href={`/what-we-offer#${session.id}`}
                  className={cn(
                    "rounded-2xl border-2 border-b-4 p-3 no-underline transition-transform motion-safe:hover:-translate-y-0.5",
                    dayTone[day]
                  )}
                >
                  <p className="text-xs font-extrabold tracking-wider text-slate-500 uppercase">
                    {session.time}
                  </p>
                  <p className="mt-1 font-extrabold text-ink">{session.title}</p>
                  <p className="mt-1 text-sm font-semibold text-body">{session.ages}</p>
                </Link>
              ))
            ) : (
              <p className="px-1 text-sm font-semibold text-slate-500">
                Open play and study. No scheduled class.
              </p>
            )}
          </article>
        )
      })}
    </div>
  )
}

function startMinutes(time: string) {
  const start = time.split("–")[0]?.trim().toLowerCase() ?? ""
  const match = start.match(/^(\d{1,2})(?::(\d{2}))?(am|pm)?$/)
  if (!match) return Number.POSITIVE_INFINITY

  let hours = Number(match[1])
  const minutes = Number(match[2] ?? 0)
  const meridiem = match[3]
  if (meridiem === "pm" && hours < 12) hours += 12
  if (meridiem === "am" && hours === 12) hours = 0
  return hours * 60 + minutes
}
