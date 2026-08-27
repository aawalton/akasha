import { slugNamed } from "../../../page/page-address.ts"
import { askNamed } from "./tracking-modules.ts"

const POINTS_SOURCE_QUERY = "persona-points-source-all"

export interface ReadingSource {
  readonly personaSlug: string
  readonly field: string
  readonly unitsPerPoint: number
}

function parseReading(entry: string): { field: string; unitsPerPoint: number } | undefined {
  const [field, per] = entry.split(":")
  if (field === undefined || field.length === 0) return undefined
  if (per === undefined) return { field, unitsPerPoint: 1 }
  const units = Number(per)
  if (!Number.isFinite(units) || units <= 0) return undefined
  return { field, unitsPerPoint: units }
}

function entriesOf(held: unknown): readonly string[] {
  if (typeof held === "string") return held.length > 0 ? [held] : []
  if (!Array.isArray(held)) return []
  return held.filter((entry): entry is string => typeof entry === "string")
}

export async function readingSources(): Promise<readonly ReadingSource[]> {
  const asked = await askNamed(POINTS_SOURCE_QUERY)
  if (!asked.ok) throw new Error(`the points sources went unread: ${asked.why}`)
  const out: ReadingSource[] = []
  for (const row of asked.answer.rows) {
    const named = row.values["domain-parent-slug"]
    if (typeof named !== "string" || named.length === 0) continue
    const personaSlug = slugNamed(named)
    for (const entry of entriesOf(row.values["readings"])) {
      const parsed = parseReading(entry)
      if (parsed === undefined) continue
      out.push({ personaSlug, field: parsed.field, unitsPerPoint: parsed.unitsPerPoint })
    }
  }
  return out
}

export function sourcePointsFrom(
  sources: readonly ReadingSource[],
  readings: Readonly<Record<string, unknown>>
): number {
  let points = 0
  for (const source of sources) {
    const held = readings[source.field]
    if (typeof held !== "number" || !Number.isFinite(held)) continue
    points += held / source.unitsPerPoint
  }
  return points
}
