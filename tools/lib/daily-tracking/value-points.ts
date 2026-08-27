import { askComposed, numberOf, patchPage, textOf, WRITER } from "./tracking-modules.ts"
import { DAILY_TRACKING_PAGE_TYPE_SLUG, ensureDailyPage } from "./daily-row.ts"

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

export function computeValuePoints(
  bars: readonly PersonaBar[],
  days: readonly PersonaDayPoints[]
): Readonly<Partial<Record<ValueSlug, number>>> {
  const barBySlug = new Map(bars.map((bar) => [bar.personaSlug, bar]))
  const sums = new Map<ValueSlug, number>()
  for (const day of days) {
    const bar = barBySlug.get(day.personaSlug)
    if (bar === undefined) continue
    const slug = bar.valueSlug
    if (slug === null || !isValueSlug(slug)) continue
    const green = bar.greenDayPoints
    if (green === null || green <= 0) continue
    const units = (day.sourcePoints ?? 0) / green
    sums.set(slug, (sums.get(slug) ?? 0) + units)
  }
  const out: Partial<Record<ValueSlug, number>> = {}
  for (const [slug, total] of sums) out[slug] = round(total)
  return out
}

async function readBars(): Promise<readonly PersonaBar[]> {
  const asked = await askComposed({
    "page-type": PERSONA_PAGE_TYPE_SLUG,
    keys: ["slug", "title", "value-slug", "green-day-points"],
  })
  if (!asked.ok) throw new Error(`readBars: ${asked.why}`)
  return asked.answer.rows.flatMap((row) => {
    const slug = textOf(row.values.slug) ?? textOf(row.values.title)?.toLowerCase()
    if (slug === undefined) return []
    return [
      {
        personaSlug: slug,
        valueSlug: textOf(row.values["value-slug"]) ?? null,
        greenDayPoints: numberOf(row.values["green-day-points"]) ?? null,
      },
    ]
  })
}

export async function writeValuePointsForDay(dayStr: string): Promise<WriteOutcome> {
  const asked = await askComposed({
    "page-type": PERSONA_DAY_PAGE_TYPE_SLUG,
    where: { date: { is: dayStr } },
    keys: ["persona-slug", "date", "source-points"],
  })
  if (!asked.ok) throw new Error(`writeValuePointsForDay: ${asked.why}`)
  const days = asked.answer.rows.flatMap((row) => {
    const personaSlug = textOf(row.values["persona-slug"])
    if (personaSlug === undefined) return []
    return [{ personaSlug, sourcePoints: numberOf(row.values["source-points"]) ?? null }]
  })
  const points = computeValuePoints(await readBars(), days)

  const values: Record<string, number> = {}
  for (const [slug, key] of Object.entries(VALUE_POINT_KEY)) {
    if (!isValueSlug(slug)) continue
    const total = points[slug]
    if (total !== undefined) values[key] = total
  }
  if (Object.keys(values).length === 0) return "patched"

  await ensureDailyPage(dayStr)
  const landed = await patchPage(DAILY_TRACKING_PAGE_TYPE_SLUG, dayStr, values, WRITER)
  if (!landed.ok) {
    throw new Error(`the value points for ${dayStr} went unwritten: ${landed.why}`)
  }
  return "patched"
}
