import {
  weekDays,
  type ClassOffering,
  type SpecialEvent,
  type Weekday,
} from "../content/siteData"
import type { SheetTable } from "./sheet-csv"

const classHeaders = ["Show on website", "Class name", "Day", "Category"] as const
const eventHeaders = ["Show on website", "Event name"] as const

const months: Record<string, number> = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11,
}

export function mapClassRows(table: SheetTable): ClassOffering[] | null {
  if (!hasHeaders(table, classHeaders)) return null

  const usedIds = new Set<string>()
  const classes = table.rows.flatMap((row) => {
    if (!isPublished(row["Show on website"])) return []

    const title = row["Class name"]?.trim() ?? ""
    const day = normalizeDay(row.Day ?? "")
    if (!title || !day) return []

    const time = joinTimes(row["Start time"] ?? "", row["End time"] ?? "")
    const id = uniqueId(row.ID || title, usedIds)

    return [
      {
        id,
        title,
        ages: row.Ages?.trim() || "All Ages",
        day,
        time,
        schedule: time ? `${day}s, ${time}` : `${day}s`,
        price: row.Price?.trim() ?? "",
        description: row.Description?.trim() ?? "",
        category: tidyCategory(row.Category ?? ""),
      },
    ]
  })

  return classes
}

export function mapEventRows(table: SheetTable, now = new Date()): SpecialEvent[] | null {
  if (!hasHeaders(table, eventHeaders)) return null

  const today = kampalaDayKey(now)
  const usedIds = new Set<string>()

  const events = table.rows.flatMap((row) => {
    if (!isPublished(row["Show on website"])) return []

    const title = row["Event name"]?.trim() ?? ""
    if (!title) return []

    const rawDate = row.Date?.trim() ?? ""
    const date = parseSheetDate(rawDate)
    if (date && kampalaDayKey(date) < today) return []

    const id = uniqueId(`${title} ${rawDate}`, usedIds)

    return [
      {
        id,
        title,
        when: formatWhen(date, rawDate, row["Start time"] ?? "", row["End time"] ?? ""),
        description: row.Description?.trim() ?? "",
        tag: row.Tag?.trim() || "Event",
        sort: date ? date.getTime() : Number.POSITIVE_INFINITY,
      },
    ]
  })

  return events
    .sort((a, b) => a.sort - b.sort || a.title.localeCompare(b.title))
    .map((event) => ({
      id: event.id,
      title: event.title,
      when: event.when,
      description: event.description,
      tag: event.tag,
    }))
}

export function parseSheetDate(value: string): Date | null {
  const raw = value.trim()
  if (!raw) return null

  if (/^\d{5}(\.\d+)?$/.test(raw)) {
    const serial = Math.floor(Number(raw))
    return new Date(Date.UTC(1899, 11, 30) + serial * 86_400_000)
  }

  const iso = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)
  if (iso) return utcDate(Number(iso[1]), Number(iso[2]), Number(iso[3]))

  const dayMonth = raw.match(/^(\d{1,2})[-\s/]+([A-Za-z]{3,9})[-\s,/]+(\d{4})$/)
  if (dayMonth) {
    const month = months[dayMonth[2].toLowerCase()]
    if (month === undefined) return null
    return utcDate(Number(dayMonth[3]), month + 1, Number(dayMonth[1]))
  }

  const monthDay = raw.match(/^([A-Za-z]{3,9})\s+(\d{1,2}),?\s+(\d{4})$/)
  if (monthDay) {
    const month = months[monthDay[1].toLowerCase()]
    if (month === undefined) return null
    return utcDate(Number(monthDay[3]), month + 1, Number(monthDay[2]))
  }

  const slash = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (slash) {
    const first = Number(slash[1])
    const second = Number(slash[2])
    const year = Number(slash[3])
    const day = first > 12 ? first : second > 12 ? second : first
    const month = first > 12 ? second : second > 12 ? first : second
    return utcDate(year, month, day)
  }

  return null
}

export function kampalaDayKey(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Kampala",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date)
}

function hasHeaders(table: SheetTable, required: readonly string[]) {
  return required.every((header) => table.headers.includes(header))
}

function isPublished(value: string | undefined) {
  return (value ?? "").trim().toLowerCase() === "yes"
}

function normalizeDay(value: string): Weekday | null {
  const match = weekDays.find((day) => day.toLowerCase() === value.trim().toLowerCase())
  return match ?? null
}

const familiarCategories = [
  "Arts",
  "STEM/Mechanics",
  "History",
  "Dance & Fitness",
  "Culture",
  "Sports",
]

function tidyCategory(value: string) {
  const trimmed = value.trim()
  const match = familiarCategories.find(
    (category) => category.toLowerCase() === trimmed.toLowerCase()
  )
  return match ?? trimmed
}

function tidyTime(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return ""
  return trimmed.replace(/\s+/g, "").replace(/(am|pm)$/i, (meridiem) => meridiem.toLowerCase())
}

function joinTimes(start: string, end: string) {
  const startTime = tidyTime(start)
  const endTime = tidyTime(end)
  if (startTime && endTime) return `${startTime} – ${endTime}`
  return startTime || endTime
}

function formatWhen(date: Date | null, rawDate: string, start: string, end: string) {
  let label = rawDate
  if (date) {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "UTC",
      weekday: "long",
      day: "numeric",
      month: "long",
    }).formatToParts(date)
    const weekday = parts.find((part) => part.type === "weekday")?.value ?? ""
    const day = parts.find((part) => part.type === "day")?.value ?? ""
    const month = parts.find((part) => part.type === "month")?.value ?? ""
    label = `${weekday} ${day} ${month}`.trim()
  }

  const time = joinTimes(start, end)
  if (label && time) return `${label} · ${time}`
  return label || time || "Date to be announced"
}

function utcDate(year: number, month: number, day: number) {
  if (month < 1 || month > 12 || day < 1 || day > 31) return null
  const date = new Date(Date.UTC(year, month - 1, day))
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null
  }
  return date
}

function uniqueId(value: string, used: Set<string>) {
  const root = slugify(value) || "item"
  let id = root
  let count = 2
  while (used.has(id)) {
    id = `${root}-${count}`
    count += 1
  }
  used.add(id)
  return id
}

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
