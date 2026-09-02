import type { Asked, Query, Row } from "@akasha/pages-system-service/asking"
import { askingFor } from "@akasha/pages-system-service/calling"
import { askComposed } from "../page-query-client.ts"
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
 * What a points source page carries, under the name a recipe row reads it by.
 *
 * These are kebab because a page read off the checkout answers in the spelling its own frontmatter
 * uses, and the twenty-four points source pages are markdown files under `pages/`. When they move
 * into `akasha/` the service will answer them camel, and these keys move with them.
 */
const SOURCE_KEYS = {
  kind: "pointsSourceKind",
  marker: "pointsSource",
  aggregate: "pointsSourceAggregate",
  "path-prefix": "pointsPathPrefix",
  "point-field": "pointsSourcePointField",
  "weight-field": "pointsSourceWeightField",
} as const

export const PERSONA_ASKING: Query = {
  pageTypeSlug: PERSONA_PAGE_TYPE_SLUG,
  keys: [...PERSONA_KEYS],
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
 * The two asks below take different roads because the two page types are kept in different places.
 *
 * `persona` moved into `akasha/` and the service answers all forty-two of them. The points sources
 * did not move: their page type is declared only at `pages/page-type/persona-points-source.md` and
 * their pages are twenty-four markdown files under `pages/persona-points-source/`. The service
 * indexes only page types declared in TypeScript under `akasha/`, so it refuses this one by name.
 *
 * Declaring the type in TypeScript without moving the pages would not mend that. The index would
 * hold the name and answer zero rows, every persona would parse to no recipe, and the recompute
 * would report itself working while writing nothing — which is worse than the refusal it replaced.
 * `daily-tracking` is already in that state: it is in the index and answers nothing against the
 * files on disk.
 *
 * So the sources are asked of the checkout, where they are. `exercise-pages.ts` met the same
 * refusal over four page types and took this road for the same reason. Nothing here decides what a
 * query means or what a row means; the only thing this changes is which store answers.
 */
export async function personaRecipeRows(): Promise<
  readonly Readonly<Record<string, unknown>>[]
> {
  const [personas, sources] = await Promise.all([
    askingFor(PERSONA_ASKING),
    askComposed({ "page-type": POINTS_SOURCE_PAGE_TYPE_SLUG }),
  ])
  const personaRows = everyRowIn(`the \`${PERSONA_PAGE_TYPE_SLUG}\` pages`, personas)
  if (!sources.ok) {
    throw new Error(`the \`${POINTS_SOURCE_PAGE_TYPE_SLUG}\` pages went unread: ${sources.why}`)
  }
  if (sources.rows.length !== sources.n) {
    throw new Error(
      `the \`${POINTS_SOURCE_PAGE_TYPE_SLUG}\` pages answered with ${sources.rows.length} of ` +
        `${sources.n}, so a persona whose source was in the part that did not come back would ` +
        "earn nothing with nothing saying so"
    )
  }
  const sourceRows = sources.rows.map((one) => one.values)

  const sourceByPersona = new Map<string, Record<string, unknown>>()
  for (const row of sourceRows) {
    const persona = slugNamed(textOf(row["domain-parent-slug"]) ?? null)
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
