import {
  askComposed,
  GREEN_DAY_POINTS_FIELD,
  kebabKey,
  numberOf,
  textOf,
  WRITER,
} from "./tracking-modules.ts"
import { upsertPage } from "@shared/pages-access/upsert"
import { PERSONA_DAY_PAGE_TYPE_SLUG } from "./persona-day-points.ts"
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
  readonly drifted: readonly RescoreDay[]
  readonly written: number
  readonly dryRun: boolean
  readonly horizon: { readonly earliest: string | null; readonly latest: string | null }
}

export function planRescore(
  rows: readonly Readonly<Record<string, unknown>>[],
  slug: string,
  currentBar: number
): readonly RescoreDay[] {
  const drifted: RescoreDay[] = []
  for (const row of rows) {
    const dayStr = textOf(row.date)
    if (dayStr === undefined) continue
    const storedBar = numberOf(row[GREEN_DAY_POINTS_KEY]) ?? null
    if (storedBar === currentBar) continue
    drifted.push({ name: `${slug}/${dayStr}`, dayStr, storedBar, newBar: currentBar })
  }
  return drifted.sort((a, b) => a.dayStr.localeCompare(b.dayStr))
}

export async function rescorePersona(args: {
  readonly slug: string
  readonly currentBar: number
  readonly dryRun: boolean
}): Promise<RescoreResult> {
  const { slug, currentBar, dryRun } = args

  const asked = await askComposed({
    "page-type": PERSONA_DAY_PAGE_TYPE_SLUG,
    where: { "persona-slug": { is: slug } },
    keys: ["persona-slug", "date", GREEN_DAY_POINTS_KEY],
  })
  if (!asked.ok) throw new Error(`rescorePersona(${slug}): ${asked.why}`)
  const rows = asked.answer.rows.map((row) => row.values)

  const days = rows
    .map((r) => textOf(r.date))
    .filter((d): d is string => d !== undefined)
    .sort()
  const drifted = planRescore(rows, slug, currentBar)

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
    drifted,
    written,
    dryRun,
    horizon: { earliest: days[0] ?? null, latest: days[days.length - 1] ?? null },
  }
}

export async function rescoreDriftedPersonas(): Promise<readonly RescoreResult[]> {
  const rows = await personaRecipeRows()
  const rewritten: RescoreResult[] = []
  for (const row of rows) {
    const bar = numberOf(row.greenDayPoints)
    if (bar === undefined || bar <= 0) continue
    const slug = textOf(row.slug) ?? textOf(row.title)?.toLowerCase()
    if (slug === undefined) continue
    const result = await rescorePersona({ slug, currentBar: bar, dryRun: false })
    if (result.written > 0) rewritten.push(result)
  }
  return rewritten
}
