import { z } from "zod"
import { askComposed, DEFAULT_GREEN_DAY_POINTS, kebabKey, WRITER } from "./tracking-modules.ts"
import { upsertPage } from "@shared/pages-access/upsert"
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

async function personaDayStands(personaSlug: string, dayStr: string): Promise<boolean> {
  const asked = await askComposed({
    "page-type": PERSONA_DAY_PAGE_TYPE_SLUG,
    keys: ["persona-slug", "date"],
    where: { "persona-slug": { is: personaSlug }, date: { is: dayStr } },
    limit: 1,
  })
  return asked.ok && asked.answer.rows.length > 0
}

async function patchPersonaDayFields(
  dayStr: string,
  fields: Readonly<Record<string, number>>,
  persona: PersonaDayTarget
): Promise<WriteOutcome> {
  const stood = await personaDayStands(persona.slug, dayStr)
  const values: Record<string, string | number> = {
    slug: personaDaySlug(persona.slug, dayStr),
    "persona-slug": persona.slug,
    date: dayStr,
    "green-day-points": persona.greenDayPoints,
  }
  if (persona.valueSlug !== undefined) values["value-slug"] = persona.valueSlug
  if (!stood) values["source-points"] = 0
  for (const [key, value] of Object.entries(fields)) values[kebabKey(key)] = value

  await upsertPage({
    pageTypeSlug: PERSONA_DAY_PAGE_TYPE_SLUG,
    where: [
      { key: "persona-slug", eq: persona.slug },
      { key: "date", eq: dayStr },
    ],
    set: values,
    writer: WRITER,
  })
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
