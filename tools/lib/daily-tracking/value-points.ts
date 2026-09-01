import type { Query } from "@akasha/pages-system-service/asking"
import { askingFor } from "@akasha/pages-system-service/calling"
import { numberOf, textOf } from "./tracking-modules.ts"
import { DAILY_TRACKING_PAGE_TYPE_SLUG } from "./daily-row.ts"

type WriteOutcome = "patched" | "created"

const PERSONA_DAY_PAGE_TYPE_SLUG = "persona-day"
const PERSONA_PAGE_TYPE_SLUG = "persona"
const DECIMALS = 4

export const VALUE_POINT_KEY = {
  faith: "faith-points",
  love: "love-points",
  health: "health-points",
  learn: "learn-points",
  fun: "fun-points",
  wealth: "wealth-points",
} as const

export type ValueSlug = keyof typeof VALUE_POINT_KEY

export function isValueSlug(slug: string): slug is ValueSlug {
  return Object.hasOwn(VALUE_POINT_KEY, slug)
}

export interface PersonaBar {
  readonly personaSlug: string
  readonly valueSlug: string | null
  readonly greenDayPoints: number | null
}

export interface PersonaDayPoints {
  readonly personaSlug: string
  readonly sourcePoints: number | null
}

function round(value: number): number {
  const factor = 10 ** DECIMALS
  return Math.round(value * factor) / factor
}

/**
 * What each value earned across the personas standing under it.
 *
 * A day carrying no source points is passed over rather than counted as zero. A persona whose day
 * went unmeasured has not earned nothing — nothing is known about what she earned — and folding a
 * 0 in would put that unmeasured day into a total read as whole. A value no measured day stands
 * under is left out of the answer rather than answered 0, for the same reason.
 */
export function computeValuePoints(
  bars: readonly PersonaBar[],
  days: readonly PersonaDayPoints[]
): Readonly<Partial<Record<ValueSlug, number>>> {
  const barBySlug = new Map(bars.map((bar) => [bar.personaSlug, bar]))
  const sums = new Map<ValueSlug, number>()
  for (const day of days) {
    if (day.sourcePoints === null) continue
    const bar = barBySlug.get(day.personaSlug)
    if (bar === undefined) continue
    const slug = bar.valueSlug
    if (slug === null || !isValueSlug(slug)) continue
    const green = bar.greenDayPoints
    if (green === null || green <= 0) continue
    sums.set(slug, (sums.get(slug) ?? 0) + day.sourcePoints / green)
  }
  const out: Partial<Record<ValueSlug, number>> = {}
  for (const [slug, total] of sums) out[slug] = round(total)
  return out
}

export const PERSONA_BARS_ASKING: Query = {
  pageTypeSlug: PERSONA_PAGE_TYPE_SLUG,
  keys: ["slug", "valueSlug", "greenDayPoints"],
  sortBy: "slug",
}

export function personaDaysAsking(dayStr: string): Query {
  return {
    pageTypeSlug: PERSONA_DAY_PAGE_TYPE_SLUG,
    where: { date: { is: dayStr } },
    keys: ["personaSlug", "date", "sourcePoints"],
  }
}

/** Each persona's value and the points that make one of her days green. */
export async function readBars(): Promise<readonly PersonaBar[]> {
  const asked = await askingFor(PERSONA_BARS_ASKING)
  if ("refused" in asked) {
    throw new Error(`the persona bars went unread: ${asked.refused}`)
  }
  return asked.rows.flatMap((row) => {
    const slug = textOf(row.slug)
    if (slug === undefined) return []
    return [
      {
        personaSlug: slug,
        valueSlug: textOf(row.valueSlug) ?? null,
        greenDayPoints: numberOf(row.greenDayPoints) ?? null,
      },
    ]
  })
}

/**
 * The day's value points, had they anywhere to land.
 *
 * They have not. The figures stand on a `daily-tracking` page, which is written by naming a path
 * and the whole body standing at it, and nothing renders that body out of the keys a page carries.
 * The read is refused before that anyway: the `persona-day` pages the totals are summed from are
 * not held. This refuses rather than returning "patched" over a write that never happened.
 */
export async function writeValuePointsForDay(dayStr: string): Promise<WriteOutcome> {
  const asked = await askingFor(personaDaysAsking(dayStr))
  if ("refused" in asked) {
    throw new Error(
      `the value points for ${dayStr} went uncomputed, so none were written: ${asked.refused}`
    )
  }
  const days = asked.rows.flatMap((row) => {
    const personaSlug = textOf(row.personaSlug)
    if (personaSlug === undefined) return []
    return [{ personaSlug, sourcePoints: numberOf(row.sourcePoints) ?? null }]
  })
  const points = computeValuePoints(await readBars(), days)

  const values: Record<string, number> = {}
  for (const [slug, key] of Object.entries(VALUE_POINT_KEY)) {
    if (!isValueSlug(slug)) continue
    const total = points[slug]
    if (total !== undefined) values[key] = total
  }
  if (Object.keys(values).length === 0) {
    throw new Error(
      `no value earned a measured point on ${dayStr}, so nothing was written: a day of zeroes ` +
        "would state that every value went unserved rather than that none was measured"
    )
  }

  throw new Error(
    `the value points for ${dayStr} went unwritten: a \`${DAILY_TRACKING_PAGE_TYPE_SLUG}\` page is ` +
      "written by naming a path and a whole body, and nothing renders that body out of the keys a " +
      `page carries, so ${Object.keys(values).length} value total(s) have nowhere to land`
  )
}
