import { cacheLife, cacheTag } from "next/cache"
import { classes as savedClasses, specialEvents as savedEvents } from "@/content/siteData"
import { mapClassRows, mapEventRows } from "@/lib/schedule-map"
import { parseCsv } from "@/lib/sheet-csv"

const sheetId = "1xPTSbbbwSgvuGUrOPdlVoKEza721vMMwFjz8mPy7RtM"

function sheetCsvUrl(sheetName: string) {
  const params = new URLSearchParams({
    tqx: "out:csv",
    sheet: sheetName,
  })
  return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?${params}`
}

async function loadSheet(sheetName: string) {
  const response = await fetch(sheetCsvUrl(sheetName), {
    signal: AbortSignal.timeout(8000),
  })
  if (!response.ok) {
    throw new Error(`${sheetName} sheet returned ${response.status}`)
  }

  const text = await response.text()
  if (!text.trim() || text.trimStart().startsWith("<")) {
    throw new Error(`${sheetName} sheet did not return a spreadsheet`)
  }

  return parseCsv(text)
}

/**
 * Classes and special events shown on the site.
 * Reads the public EPIC schedule sheet. Rows with Show on website set to No
 * are left out. If a tab cannot be read, that part falls back to siteData.
 */
export async function getSchedule() {
  "use cache"
  cacheLife("minutes")
  cacheTag("epic-schedule")

  const [classRows, eventRows] = await Promise.all([
    loadSheet("Classes").catch((error: unknown) => {
      console.error("EPIC class sheet could not be read.", error)
      return null
    }),
    loadSheet("Special events").catch((error: unknown) => {
      console.error("EPIC special events sheet could not be read.", error)
      return null
    }),
  ])

  const classes = classRows ? mapClassRows(classRows) : null
  const events = eventRows ? mapEventRows(eventRows) : null

  return {
    classes: classes ?? savedClasses,
    events: events ?? savedEvents,
  }
}
