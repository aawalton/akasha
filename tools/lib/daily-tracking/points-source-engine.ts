import { z } from "zod"
import {
  askComposed,
  assertNever,
  DEFAULT_GREEN_DAY_POINTS,
  evaluateCoherenceRules,
  getEsoDayWindow,
  kebabKey,
  numberOf,
  PERSONA_POINTS_SOURCE_COHERENCE_RULES,
  resolvePointsPrefixes,
  SOURCE_POINTS_FIELD,
} from "./tracking-modules.ts"
import { readNetBytesForWindow } from "./net-bytes-points.ts"
import { type PersonaDayTarget, patchPersonaDayField } from "./persona-day-points.ts"
import { personaRecipeRows } from "./persona-recipe-rows.ts"
import { askHere } from "../../../readouts/ask-here.ts"
import { readStoplightMeanForDay } from "../../../readouts/stoplight-mean-points.ts"
import { tallyWeightedIntervals } from "./weighted-interval-points.ts"

type WriteOutcome = "patched" | "created"

export type PointsSourceRecipe =
  | (PersonaDayTarget & {
      readonly kind: "windowed"
      readonly aggregate: "bytes"
      readonly pointsPathPrefixes: readonly string[]
    })
  | (PersonaDayTarget & {
      readonly kind: "windowed"
      readonly aggregate: "sum"
      readonly source: string
      readonly personaSlug?: string
      readonly pointField: string
    })
  | (PersonaDayTarget & {
      readonly kind: "windowed"
      readonly aggregate: "count"
      readonly source: string
      readonly personaSlug?: string
    })
  | (PersonaDayTarget & {
      readonly kind: "windowed"
      readonly aggregate: "weighted"
      readonly source: string
      readonly weightField: string
    })
  | (PersonaDayTarget & { readonly kind: "delta" })
  | (PersonaDayTarget & { readonly kind: "external" })
  | (PersonaDayTarget & { readonly kind: "stoplights" })

const RawPersonaSchema = z
  .object({
    id: z.string(),
    slug: z.string().optional(),
    title: z.string().optional(),
    valueSlug: z.string().optional(),
    greenDayPoints: z.number().optional(),
    pointsSourceKind: z.string().optional(),
    pointsSourceAggregate: z.string().optional(),
    pointsSource: z.string().optional(),
    pointsSourcePointField: z.string().optional(),
    pointsSourceWeightField: z.string().optional(),
    pointsPathPrefix: z.string().optional(),
    pointsPathPrefixes: z.array(z.string()).optional(),
  })
  .passthrough()

const PointsSourceKindSchema = z.enum([
  "windowed",
  "delta",
  "external",
  "stoplights",
  "manual",
  "direct",
  "seed",
  "unavailable",
])
const WindowedAggregateSchema = z.enum(["bytes", "sum", "count", "weighted"])

export function parsePointsSourceRecipe(
  row: Readonly<Record<string, unknown>>
): PointsSourceRecipe | null {
  try {
    return parsePointsSourceRecipeInner(row)
  } catch (error) {
    const id = typeof row.id === "string" ? row.id : "unknown"
    const title = typeof row.title === "string" ? row.title : id
    const kind = typeof row.pointsSourceKind === "string" ? row.pointsSourceKind : "unknown"
    const detail = error instanceof Error ? error.message : String(error)
    throw new Error(
      `points source recipe parse failed for persona ${title} (${id}, kind=${kind}): ${detail}`,
      { cause: error }
    )
  }
}

function parsePointsSourceRecipeInner(
  row: Readonly<Record<string, unknown>>
): PointsSourceRecipe | null {
  const raw = RawPersonaSchema.parse(row)
  const violations = evaluateCoherenceRules(
    PERSONA_POINTS_SOURCE_COHERENCE_RULES,
    row
  ) as readonly string[]
  if (violations.length > 0) {
    throw new Error(
      `points source recipe incoherent for persona "${raw.title ?? raw.id}" (${raw.id}): ${violations.join("; ")}`
    )
  }
  if (raw.pointsSourceKind === undefined) return null
  const kind = PointsSourceKindSchema.parse(raw.pointsSourceKind)
  if (kind === "direct" || kind === "seed" || kind === "manual" || kind === "unavailable") {
    return null
  }

  const target: PersonaDayTarget = {
    id: raw.id,
    slug: raw.slug ?? raw.id,
    title: raw.title ?? raw.id,
    ...(raw.valueSlug === undefined ? {} : { valueSlug: raw.valueSlug }),
    greenDayPoints: raw.greenDayPoints ?? DEFAULT_GREEN_DAY_POINTS,
  }

  if (kind === "delta") return { ...target, kind: "delta" }
  if (kind === "external") return { ...target, kind: "external" }
  if (kind === "stoplights") return { ...target, kind: "stoplights" }

  const aggregate = WindowedAggregateSchema.parse(raw.pointsSourceAggregate)
  switch (aggregate) {
    case "bytes":
      return {
        ...target,
        kind: "windowed",
        aggregate: "bytes",
        pointsPathPrefixes: z.array(z.string().min(1)).min(1).parse(resolvePointsPrefixes(raw)),
      }
    case "sum":
      return {
        ...target,
        kind: "windowed",
        aggregate: "sum",
        source: z.string().min(1).parse(raw.pointsSource),
        ...(raw.slug === undefined ? {} : { personaSlug: raw.slug }),
        pointField: z.string().min(1).parse(raw.pointsSourcePointField),
      }
    case "count":
      return {
        ...target,
        kind: "windowed",
        aggregate: "count",
        source: z.string().min(1).parse(raw.pointsSource),
        ...(raw.slug === undefined ? {} : { personaSlug: raw.slug }),
      }
    case "weighted":
      return {
        ...target,
        kind: "windowed",
        aggregate: "weighted",
        source: z.string().min(1).parse(raw.pointsSource),
        weightField: z.string().min(1).parse(raw.pointsSourceWeightField),
      }
    default:
      return assertNever(aggregate)
  }
}

export function sumSourceRows(
  rows: readonly Readonly<Record<string, unknown>>[],
  pointField: string
): number {
  let total = 0
  for (const row of rows) total += numberOf(row[pointField]) ?? 0
  return total
}

export function countSourceRows(rows: readonly unknown[]): number {
  return rows.length
}

async function askedPages(
  pageTypeSlug: string,
  where: Readonly<Record<string, unknown>>
): Promise<readonly Readonly<Record<string, unknown>>[]> {
  const asked = await askComposed({ "page-type": pageTypeSlug, where })
  if (!asked.ok) throw new Error(`\`${pageTypeSlug}\` went unread: ${asked.why}`)
  const { n, rows } = asked.answer
  if (rows.length !== n) {
    throw new Error(
      `\`${pageTypeSlug}\` answered with ${rows.length} of ${n} page(s), so the figure summed ` +
        `from it would be low without anything saying so`
    )
  }
  return rows.map((row) => row.values)
}

async function fetchPersonaDayRows(
  source: string,
  persona: Extract<PointsSourceRecipe, { aggregate: "sum" | "count" }>,
  dayStr: string
): Promise<readonly Readonly<Record<string, unknown>>[]> {
  return askedPages(source, {
    "persona-slug": { is: persona.personaSlug ?? persona.slug },
    date: { is: dayStr },
  })
}

async function fetchIntervalRowsForWindow(
  source: string,
  window: { readonly start: Date; readonly end: Date }
): Promise<readonly Readonly<Record<string, unknown>>[]> {
  return askedPages(source, {
    "start-time": {
      "at-or-after": window.start.toISOString(),
      before: window.end.toISOString(),
    },
  })
}

async function computeWindowed(
  repoRoot: string,
  recipe: Extract<PointsSourceRecipe, { kind: "windowed" }>,
  dayStr: string
): Promise<number> {
  switch (recipe.aggregate) {
    case "bytes":
      return readNetBytesForWindow(repoRoot, getEsoDayWindow(dayStr), recipe.pointsPathPrefixes)
    case "sum":
      return sumSourceRows(
        await fetchPersonaDayRows(recipe.source, recipe, dayStr),
        kebabKey(recipe.pointField)
      )
    case "count":
      return countSourceRows(await fetchPersonaDayRows(recipe.source, recipe, dayStr))
    case "weighted": {
      const rows = await fetchIntervalRowsForWindow(recipe.source, getEsoDayWindow(dayStr))
      return tallyWeightedIntervals(rows, kebabKey(recipe.weightField)).points
    }
    default:
      return assertNever(recipe)
  }
}

export function isEngineDeferred(
  recipe: PointsSourceRecipe
): recipe is Extract<PointsSourceRecipe, { kind: "delta" | "external" }> {
  return recipe.kind === "delta" || recipe.kind === "external"
}

async function computeDayPoints(
  repoRoot: string,
  recipe: PointsSourceRecipe,
  dayStr: string
): Promise<number | null> {
  if (isEngineDeferred(recipe)) return null
  switch (recipe.kind) {
    case "windowed":
      return computeWindowed(repoRoot, recipe, dayStr)
    case "stoplights":
      return (
        await readStoplightMeanForDay({
          day: dayStr,
          personaId: recipe.id,
          ask: askHere(),
        })
      ).points
    default:
      return assertNever(recipe)
  }
}

export interface SourcePointsOutcome {
  readonly personaTitle: string
  readonly dayStr: string
  readonly sourcePoints: number
  readonly outcome: WriteOutcome
}

export function filterRecipesByPersona(
  recipes: readonly PointsSourceRecipe[],
  names: readonly string[] | undefined
): readonly PointsSourceRecipe[] {
  if (names === undefined) return recipes
  const wanted = new Set(names.map((n) => n.toLowerCase()))
  return recipes.filter((r) => wanted.has(r.title.toLowerCase()))
}

export function orderRecipesForCompute(
  recipes: readonly PointsSourceRecipe[]
): readonly PointsSourceRecipe[] {
  return [
    ...recipes.filter((recipe) => recipe.kind !== "stoplights"),
    ...recipes.filter((recipe) => recipe.kind === "stoplights"),
  ]
}

export async function writeDailySourcePointsForPersonas(
  repoRoot: string,
  dayStrs: readonly string[],
  options?: { readonly personaTitles?: readonly string[] }
): Promise<readonly SourcePointsOutcome[]> {
  const rows = await personaRecipeRows()
  const recipes = orderRecipesForCompute(
    filterRecipesByPersona(
      rows.map(parsePointsSourceRecipe).filter((r): r is PointsSourceRecipe => r !== null),
      options?.personaTitles
    )
  )

  const outcomes: SourcePointsOutcome[] = []
  for (const recipe of recipes) {
    for (const dayStr of dayStrs) {
      const sourcePoints = await computeDayPoints(repoRoot, recipe, dayStr)
      if (sourcePoints === null) continue
      const outcome = await patchPersonaDayField(dayStr, SOURCE_POINTS_FIELD, sourcePoints, recipe)
      outcomes.push({ personaTitle: recipe.title, dayStr, sourcePoints, outcome })
    }
  }
  return outcomes
}
