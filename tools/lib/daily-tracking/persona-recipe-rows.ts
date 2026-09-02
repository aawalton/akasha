import type { Asked, Query, Row } from "@akasha/pages-system-service/asking"
import { askingFor } from "@akasha/pages-system-service/calling"
import { numberOf, textOf } from "./tracking-modules.ts"

const PERSONA_PAGE_TYPE_SLUG = "persona"
const POINTS_SOURCE_PAGE_TYPE_SLUG = "persona-points-source"

/**
 * The keys the persona recipe is built from. `seq` and `title` stood in the saved query this
 * replaces and are left out: no persona declares either, and asking for one is refused outright
 * rather than answered absent. A persona's title was already falling back to her slug, so nothing
 * that reads a recipe row loses a value it was being given.
 */
const PERSONA_KEYS = [
  "id",
  "slug",
  "cover",
  "valueSlug",
  "greenDayPoints",
  "totalPoints",
] as const

/**
 * What a points source page carries, under the name a recipe row reads it by.
 *
 * The page type declares each of these with a slug wide enough to stand alone among the text
 * properties and a key that drops what `persona-points-source` already says, so the store answers
 * `kind` and `marker` where a recipe row wants `pointsSourceKind` and `pointsSource`.
 */
const SOURCE_KEYS = {
  kind: "pointsSourceKind",
  marker: "pointsSource",
  aggregate: "pointsSourceAggregate",
  pathPrefix: "pointsPathPrefix",
  pointField: "pointsSourcePointField",
  weightField: "pointsSourceWeightField",
} as const

/** The key a source page names the persona earning by. */
const PERSONA_SLUG_KEY = "personaSlug"

export const PERSONA_ASKING: Query = {
  pageTypeSlug: PERSONA_PAGE_TYPE_SLUG,
  keys: [...PERSONA_KEYS],
  sortBy: "slug",
}

export const POINTS_SOURCE_ASKING: Query = {
  pageTypeSlug: POINTS_SOURCE_PAGE_TYPE_SLUG,
  keys: [PERSONA_SLUG_KEY, ...Object.keys(SOURCE_KEYS)],
  sortBy: "slug",
}

/**
 * The rows a question answered with, or the refusal it answered with instead. A recipe built from
 * half an answer would describe personas earning nothing, so a refusal is carried up rather than
 * read as an empty set.
 */
function everyRowIn(what: string, asked: Asked): readonly Row[] {
  if ("refused" in asked) throw new Error(`${what} went unread: ${asked.refused}`)
  return asked.rows
}

/**
 * A points source page holds no persona to earn for unless it names one, and a source read as
 * belonging to nobody would leave that persona earning nothing with nothing saying so. So a row
 * carrying no persona slug is a fault rather than a row to skip.
 */
function personaSlugIn(row: Row): string {
  const named = textOf(row[PERSONA_SLUG_KEY])
  if (named === undefined || named === "") {
    const slug = textOf(row.slug) ?? "a source with no slug"
    throw new Error(
      `\`${slug}\` names no persona, so the persona it earns for would earn nothing with ` +
        "nothing saying so"
    )
  }
  return named
}

/**
 * Both asks take the same road: the pages service, over the index.
 *
 * They did not always. The points sources were twenty-four markdown files under
 * `pages/persona-points-source/`, and the index holds only page types declared in TypeScript under
 * `akasha/`, so the service refused this one by name and the sources were asked of the checkout
 * instead. They have since moved to `akasha/persona-system/persona-points-sources/`, which is what
 * lets this ask them by the same road every other page type is asked by.
 */
export async function personaRecipeRows(): Promise<
  readonly Readonly<Record<string, unknown>>[]
> {
  const [personas, sources] = await Promise.all([
    askingFor(PERSONA_ASKING),
    askingFor(POINTS_SOURCE_ASKING),
  ])
  const personaRows = everyRowIn(`the \`${PERSONA_PAGE_TYPE_SLUG}\` pages`, personas)
  const sourceRows = everyRowIn(`the \`${POINTS_SOURCE_PAGE_TYPE_SLUG}\` pages`, sources)

  const sourceByPersona = new Map<string, Record<string, unknown>>()
  for (const row of sourceRows) {
    const held: Record<string, unknown> = {}
    for (const [pageKey, rowKey] of Object.entries(SOURCE_KEYS)) {
      const value = textOf(row[pageKey])
      if (value !== undefined) held[rowKey] = value
    }
    sourceByPersona.set(personaSlugIn(row), held)
  }

  const out: Record<string, unknown>[] = []
  for (const row of personaRows) {
    const id = textOf(row.id)
    const slug = textOf(row.slug)
    if (id === undefined || slug === undefined) continue
    const greenDayPoints = numberOf(row.greenDayPoints)
    const totalPoints = numberOf(row.totalPoints)
    const valueSlug = textOf(row.valueSlug)
    out.push({
      id,
      slug,
      title: slug,
      ...(valueSlug === undefined ? {} : { valueSlug }),
      ...(greenDayPoints === undefined ? {} : { greenDayPoints }),
      ...(totalPoints === undefined ? {} : { totalPoints }),
      ...(sourceByPersona.get(slug) ?? {}),
    })
  }
  return out
}
