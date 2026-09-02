import { z } from "zod"
import { askComposed, pageLanding } from "../page-query-client.ts"
import { DEFAULT_GREEN_DAY_POINTS, kebabKey, WRITER } from "./tracking-modules.ts"
import { personaRecipeRows } from "./persona-recipe-rows.ts"
import type { WriteOutcome } from "./tracking-types.ts"

export const PERSONA_DAY_PAGE_TYPE_SLUG = "persona-day"

export const CARDIO_PERSONA_TITLE = "Aelwyn"

export interface PersonaDayTarget {
  readonly id: string
  readonly slug: string
  readonly title: string
  readonly valueSlug?: string | undefined
  readonly greenDayPoints: number
}

const PersonaRowSchema = z
  .object({
    id: z.string(),
    slug: z.string().optional(),
    title: z.string().optional(),
    valueSlug: z.string().optional(),
    greenDayPoints: z.number().optional(),
  })
  .passthrough()

export async function resolvePersonaBySlug(slug: string): Promise<PersonaDayTarget> {
  const rows = await personaRecipeRows()
  const wanted = slug.toLowerCase()
  const match = rows
    .map((r) => PersonaRowSchema.parse(r))
    .find((r) => (r.slug ?? "").toLowerCase() === wanted)
  if (match === undefined) throw new Error(`resolvePersonaBySlug: no persona slugged "${slug}"`)
  return {
    id: match.id,
    slug: match.slug ?? wanted,
    title: match.title ?? slug,
    ...(match.valueSlug === undefined ? {} : { valueSlug: match.valueSlug }),
    greenDayPoints: match.greenDayPoints ?? DEFAULT_GREEN_DAY_POINTS,
  }
}

export function personaDaySlug(personaSlug: string, dayStr: string): string {
  return `${personaSlug}-${dayStr}`
}

// A refusal and an empty answer read alike here and mean opposite things. Taking a refusal as
// "no page yet" sends the caller down the create arm, which writes over a persona-day that may
// already carry the day's points. So a question that could not be answered is raised rather than
// answered false.
async function personaDayStands(personaSlug: string, dayStr: string): Promise<boolean> {
  const asked = await askComposed({
    "page-type": PERSONA_DAY_PAGE_TYPE_SLUG,
    keys: ["persona-slug", "date"],
    where: { "persona-slug": { is: personaSlug }, date: { is: dayStr } },
    limit: 1,
  })
  if (!asked.ok) {
    throw new Error(
      `personaDayStands: whether \`${personaDaySlug(personaSlug, dayStr)}\` is already written could not be read, so nothing is written over: ${asked.why}`
    )
  }
  return asked.rows.length > 0
}

/**
 * One persona's day, landed where that day is kept.
 *
 * This wrote through `upsertPage` from `@akasha/pages-access`, which could not land any page of any
 * type: `fileBackedPageTypes` in `pages-access/file-read` throws for every slug it is handed, because
 * the roster saying which page types are files was taken out when the service became the one store.
 * A persona-day is not in that store — there are over two thousand of them as markdown files under
 * `pages/persona-day/` — so the road out is the file writer rather than a roster that would have to
 * name them.
 *
 * `pageLanding` is that writer, and it is the same one `lib/tracking/day-place.ts` lands Alan's day
 * pages through. `patch` merges rather than replaces, so the keys a persona-day already carries are
 * read off the file and written back, and a patch of a value the day already holds composes
 * byte-identical text and commits nothing. That is what makes an hourly rerun of a settled day cost
 * nothing.
 *
 * The id is minted only on the create arm. Handing one to a page that already stands would replace
 * the identity of a record Alan's history is keyed by.
 */
async function patchPersonaDayFields(
  dayStr: string,
  fields: Readonly<Record<string, number>>,
  persona: PersonaDayTarget
): Promise<WriteOutcome> {
  const stood = await personaDayStands(persona.slug, dayStr)
  const named = personaDaySlug(persona.slug, dayStr)
  const values: Record<string, string | number> = {
    slug: named,
    "persona-slug": persona.slug,
    date: dayStr,
    "green-day-points": persona.greenDayPoints,
  }
  if (persona.valueSlug !== undefined) values["value-slug"] = persona.valueSlug
  if (!stood) {
    values["id"] = Bun.randomUUIDv7()
    values["source-points"] = 0
  }
  for (const [key, value] of Object.entries(fields)) values[kebabKey(key)] = value

  const landed = await pageLanding("patch", PERSONA_DAY_PAGE_TYPE_SLUG, named, values, WRITER)
  if (!landed.ok) {
    throw new Error(`the persona day \`${named}\` did not land: ${landed.why}`)
  }
  return stood ? "patched" : "created"
}

export async function patchPersonaDayField(
  dayStr: string,
  field: string,
  value: number,
  persona: PersonaDayTarget
): Promise<WriteOutcome> {
  return patchPersonaDayFields(dayStr, { [field]: value }, persona)
}
