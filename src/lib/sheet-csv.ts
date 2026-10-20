export type SheetTable = {
  headers: string[]
  rows: Record<string, string>[]
}

/**
 * Parse a Google Sheets CSV export, including quoted cells that contain commas.
 */
export function parseCsv(text: string): SheetTable {
  const records = parseRecords(text.replace(/^\uFEFF/, ""))
  if (records.length === 0) {
    return { headers: [], rows: [] }
  }

  const headers = records[0].map((header) => header.trim())
  const rows = records
    .slice(1)
    .filter((record) => record.some((cell) => cell.trim() !== ""))
    .map((record) => {
      const row: Record<string, string> = {}
      headers.forEach((header, index) => {
        if (!header) return
        row[header] = (record[index] ?? "").trim()
      })
      return row
    })

  return { headers, rows }
}

function parseRecords(text: string): string[][] {
  const records: string[][] = []
  let record: string[] = []
  let cell = ""
  let inQuotes = false

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index]

    if (inQuotes) {
      if (char === '"') {
        if (text[index + 1] === '"') {
          cell += '"'
          index += 1
        } else {
          inQuotes = false
        }
      } else {
        cell += char
      }
      continue
    }

    if (char === '"') {
      inQuotes = true
      continue
    }

    if (char === ",") {
      record.push(cell)
      cell = ""
      continue
    }

    if (char === "\n" || char === "\r") {
      if (char === "\r" && text[index + 1] === "\n") index += 1
      record.push(cell)
      records.push(record)
      record = []
      cell = ""
      continue
    }

    cell += char
  }

  if (cell.length > 0 || record.length > 0) {
    record.push(cell)
    records.push(record)
  }

  return records.filter((item) => item.some((value) => value.trim() !== ""))
}
