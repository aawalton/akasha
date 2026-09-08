export function emitJson(value: unknown): string {
  return JSON.stringify(value, null, 2)
}

const CELL_ESCAPES: ReadonlyMap<string, string> = new Map([
  ["\n", "\\n"],
  ["\r", "\\r"],
  ["\t", "\\t"],
])

export function escapeTsvCell(text: string): string {
  return text.replace(/[\n\r\t]/g, (c) => CELL_ESCAPES.get(c) ?? c)
}

function renderCell(value: unknown): string {
  if (value === undefined) return ""
  if (value === null) return "null"
  if (typeof value === "string") return escapeTsvCell(value)
  return escapeTsvCell(JSON.stringify(value))
}

export function emitTsv(
  rows: ReadonlyArray<Record<string, unknown>>,
  columns: ReadonlyArray<string>
): string {
  const header = columns.join("\t")
  if (rows.length === 0) return header
  const dataLines = rows.map((row) => columns.map((col) => renderCell(row[col])).join("\t"))
  return [header, ...dataLines].join("\n")
}
