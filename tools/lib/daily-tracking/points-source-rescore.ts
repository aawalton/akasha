import { askComposed } from "../page-query-client.ts"
import {
  GREEN_DAY_POINTS_FIELD,
  kebabKey,
  numberOf,
  textOf,
  trackingScanFloorDayStr,
  WRITER,
} from "./tracking-modules.ts"
import { upsertPage } from "@akasha/pages-access/upsert"
import { personaDaySlug, PERSONA_DAY_PAGE_TYPE_SLUG } from "./persona-day-points.ts"
import { personaRecipeRows } from "./persona-recipe-rows.ts"

const GREEN_DAY_POINTS_KEY = kebabKey(GREEN_DAY_POINTS_FIELD)

export interface RescoreDay {
  readonly name: string
  readonly dayStr: string
  readonly storedBar: number | null
  readonly newBar: number
}

export interface RescoreResult {
  readonly slug: string
  readonly currentBar: number
  readonly examined: number
  /** The oldest day this rescore was allowed to touch. */
  readonly floorDayStr: string
  /** Days whose stored bar differs but which sit before the floor, so they stand. */
  readonly settled: number
  readonly drifted: readonly RescoreDay[]
  readonly written: number
  readonly dryRun: boolean
  readonly horizon: { readonly earliest: string | null; readonly latest: string | null }
}

export interface RescorePlan {
  readonly drifted: readonly RescoreDay[]
  /** How many days differed from the current bar but stand because they precede the floor. */
  readonly settled: number
}

/**
 * Which of a persona's days a rescore may restate.
 *
 * A day is restated only when its stored bar differs from the bar the persona carries now
 * AND it is not older than `floorDayStr`. The floor is what keeps a bar that changed for a
 * reason from silently rewriting every day judged under the old one: outside the window the
 * engine recomputes, a stored bar is the record of what the day was scored against, not a
 * stale copy of the persona's.
 */
export function planRescore(
  rows: readonly Readonly<Record<string, unknown>>[],
  slug: string,
  currentBar: number,
  floorDayStr: string
): RescorePlan {
  const drifted: RescoreDay[] = []
  let settled = 0
  for (const row of rows) {
    const dayStr = textOf(row.date)
    if (dayStr === undefined) continue
    const storedBar = numberOf(row[GREEN_DAY_POINTS_KEY]) ?? null
    if (storedBar === currentBar) continue
    if (dayStr < floorDayStr) {
      settled++
      continue
    }
    drifted.push({ name: personaDaySlug(slug, dayStr), dayStr, storedBar, newBar: currentBar })
  }
  drifted.sort((a, b) => a.dayStr.localeCompare(b.dayStr))
  return { drifted, settled }
}

export async function rescorePersona(args: {
  readonly slug: string
  readonly currentBar: number
  readonly dryRun: boolean
  readonly floorDayStr: string
}): Promise<RescoreResult> {
  const { slug, currentBar, dryRun, floorDayStr } = args

  const asked = await askComposed({
    "page-type": PERSONA_DAY_PAGE_TYPE_SLUG,
    where: { "persona-slug": { is: slug } },
    keys: ["persona-slug", "date", GREEN_DAY_POINTS_KEY],
  })
  if (!asked.ok) throw new Error(`rescorePersona(${slug}): ${asked.why}`)
  const rows = asked.rows.map((row) => row.values)

  const days = rows
    .map((r) => textOf(r.date))
    .filter((d): d is string => d !== undefined)
    .sort()
  const { drifted, settled } = planRescore(rows, slug, currentBar, floorDayStr)

  let written = 0
  if (!dryRun) {
    for (const day of drifted) {
      await upsertPage({
        pageTypeSlug: PERSONA_DAY_PAGE_TYPE_SLUG,
        where: [
          { key: "persona-slug", eq: slug },
          { key: "date", eq: day.dayStr },
        ],
        set: { [GREEN_DAY_POINTS_KEY]: day.newBar },
        writer: WRITER,
      })
      written++
    }
  }

  return {
    slug,
    currentBar,
    examined: rows.length,
    floorDayStr,
    settled,
    drifted,
    written,
    dryRun,
    horizon: { earliest: days[0] ?? null, latest: days[days.length - 1] ?? null },
  }
}

export async function rescoreDriftedPersonas(now: Date = new Date()): Promise<
  readonly RescoreResult[]
> {
  const floorDayStr = trackingScanFloorDayStr(now)
  const rows = await personaRecipeRows()
  const rewritten: RescoreResult[] = []
  for (const row of rows) {
    const bar = numberOf(row.greenDayPoints)
    if (bar === undefined || bar <= 0) continue
    const slug = textOf(row.slug) ?? textOf(row.title)?.toLowerCase()
    if (slug === undefined) continue
    const result = await rescorePersona({ slug, currentBar: bar, dryRun: false, floorDayStr })
    if (result.written > 0 || result.settled > 0) rewritten.push(result)
  }
  return rewritten
}
