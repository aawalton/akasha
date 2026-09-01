import type { Query } from "@akasha/pages-system-service/asking"
import { askingFor } from "@akasha/pages-system-service/calling"
import { slugNamed } from "../../../page/page-address.ts"

const POINTS_SOURCE_PAGE_TYPE_SLUG = "persona-points-source"

export const POINTS_SOURCE_ASKING: Query = { pageTypeSlug: POINTS_SOURCE_PAGE_TYPE_SLUG }

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
  const asked = await askingFor(POINTS_SOURCE_ASKING)
  if ("refused" in asked) {
    throw new Error(
      `the points sources went unread, so what each persona earns a point for is unknown: ${asked.refused}`
    )
  }
  const out: ReadingSource[] = []
  for (const row of asked.rows) {
    const named = row.domainParentSlug
    if (typeof named !== "string" || named.length === 0) continue
    const personaSlug = slugNamed(named)
    for (const entry of entriesOf(row.readings)) {
      const parsed = parseReading(entry)
      if (parsed === undefined) continue
      out.push({ personaSlug, field: parsed.field, unitsPerPoint: parsed.unitsPerPoint })
    }
  }
  return out
}

/**
 * What the day's readings come to in points, or null where the day was not measured at all.
 *
 * A source the day carries no reading for is passed over rather than counted as zero. Where that
 * leaves nothing counted, the answer is null: a persona whose readings are all absent has an
 * unmeasured day, and writing 0 for one would state that she earned nothing, which is a different
 * claim and a false one. A caller taking null writes nothing.
 */
export function sourcePointsFrom(
  sources: readonly ReadingSource[],
  readings: Readonly<Record<string, unknown>>
): number | null {
  let points = 0
  let read = 0
  for (const source of sources) {
    const held = readings[source.field]
    if (typeof held !== "number" || !Number.isFinite(held)) continue
    points += held / source.unitsPerPoint
    read += 1
  }
  return read === 0 ? null : points
}
