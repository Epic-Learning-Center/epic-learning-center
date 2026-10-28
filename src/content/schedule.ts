import { cacheLife, cacheTag } from "next/cache"
import { mapClassRows, mapEventRows, mapReviewRows } from "@/lib/schedule-map"
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
 * are left out. A missing sheet, or a sheet with nothing to show, both come
 * back as empty lists so the pages can show the same quiet empty state.
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

  return {
    classes: (classRows && mapClassRows(classRows)) || [],
    events: (eventRows && mapEventRows(eventRows)) || [],
  }
}

/**
 * Parent reviews shown on the home page.
 * Reads the Reviews tab of the same public sheet. Rows with Show on website
 * set to No are left out, and row order is the order on the site. A missing
 * tab comes back as an empty list so the section quietly hides.
 */
export async function getReviews() {
  "use cache"
  cacheLife("minutes")
  cacheTag("epic-reviews")

  const rows = await loadSheet("Reviews").catch((error: unknown) => {
    console.error("EPIC reviews sheet could not be read.", error)
    return null
  })

  return (rows && mapReviewRows(rows)) || []
}
