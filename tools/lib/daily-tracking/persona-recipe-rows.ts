import type { Asked, Query, Row } from "@akasha/pages-system-service/asking"
import { askingFor } from "@akasha/pages-system-service/calling"
import { slugNamed } from "../../../page/page-address.ts"
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
 * What a points source page carries, under the name a recipe row reads it by. The service answers
 * a page's keys in the spelling a page type exports, so a multi-word key is camel here rather than
 * kebab as the saved query spelled it.
 */
const SOURCE_KEYS = {
  kind: "pointsSourceKind",
  marker: "pointsSource",
  aggregate: "pointsSourceAggregate",
  pathPrefix: "pointsPathPrefix",
  pointField: "pointsSourcePointField",
  weightField: "pointsSourceWeightField",
} as const

export const PERSONA_ASKING: Query = {
  pageTypeSlug: PERSONA_PAGE_TYPE_SLUG,
  keys: [...PERSONA_KEYS],
  sortBy: "slug",
}

export const POINTS_SOURCE_ASKING: Query = { pageTypeSlug: POINTS_SOURCE_PAGE_TYPE_SLUG }

/**
 * The rows a question answered with, or the refusal it answered with instead. A recipe built from
 * half an answer would describe personas earning nothing, so a refusal is carried up rather than
 * read as an empty set.
 */
function everyRowIn(what: string, asked: Asked): readonly Row[] {
  if ("refused" in asked) throw new Error(`${what} went unread: ${asked.refused}`)
  return asked.rows
}

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
    const persona = slugNamed(textOf(row.domainParentSlug) ?? null)
    if (persona === null) continue
    const held: Record<string, unknown> = {}
    for (const [pageKey, rowKey] of Object.entries(SOURCE_KEYS)) {
      const value = textOf(row[pageKey])
      if (value !== undefined) held[rowKey] = value
    }
    sourceByPersona.set(persona, held)
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
