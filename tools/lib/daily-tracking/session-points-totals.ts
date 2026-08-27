import {
  askComposed,
  DEFAULT_GREEN_DAY_POINTS,
  getEsoDayWindow,
  numberOf,
  patchPage,
  SOURCE_POINTS_FIELD,
  textOf,
  WRITER,
} from "./code-bridge.ts"
import { type PersonaDayTarget, patchPersonaDayField } from "./persona-day-points.ts"
import { personaRecipeRows } from "./persona-recipe-rows.ts"
import {
  PERSONA_PAGE_TYPE_SLUG,
  PersonaSessionRowSchema,
  planPersonaSessionWrite,
  type SessionTotalsOutcome,
  sumSessionPointsForValue,
  sumSessionPointsForWindow,
} from "./session-points-compute.ts"
import type { PropertyDefinition, ReadonlyJSONValue } from "./tracking-types.ts"

import { addressOf } from "../../../page/page-address.ts"

const PAGE_TYPE_PAGE_TYPE = "page-type"

const PROPERTY_DEFINITION_PAGE_TYPE_SLUG = "page-property-definition"

const SESSION_TRACKING_PAGE_TYPE_SLUG = "session-tracking"

export interface PersonaSessionSpec {
  readonly personaSlug: string
  readonly pointsPropId: string
}

export const VISUAL_ARTS_SESSION_SPEC: PersonaSessionSpec = {
  personaSlug: "zeli",
  pointsPropId: "visual-arts-points",
}

export const PRAYER_SESSION_SPEC: PersonaSessionSpec = {
  personaSlug: "selah",
  pointsPropId: "prayer-points",
}

export const ROMANCE_SESSION_SPEC: PersonaSessionSpec = {
  personaSlug: "ruby",
  pointsPropId: "romance-points",
}

export const SESSION_SPECS_BY_SLUG: Readonly<Record<string, PersonaSessionSpec>> = {
  zeli: VISUAL_ARTS_SESSION_SPEC,
  selah: PRAYER_SESSION_SPEC,
  ruby: ROMANCE_SESSION_SPEC,
}

export interface SessionPointsSource {
  readonly defs: readonly PropertyDefinition[]
  readonly rows: readonly Readonly<Record<string, ReadonlyJSONValue>>[]
  readonly undeclared: string | null
}

async function loadSessionTrackingDefs(): Promise<readonly PropertyDefinition[]> {
  const asked = await askComposed({
    "page-type": PROPERTY_DEFINITION_PAGE_TYPE_SLUG,
    where: { "defined-on-slug": { is: addressOf(PAGE_TYPE_PAGE_TYPE, SESSION_TRACKING_PAGE_TYPE_SLUG) } },
  })
  if (!asked.ok) throw new Error(`session points: ${asked.why}`)
  return asked.answer.rows.map((row) => row.values as unknown as PropertyDefinition)
}

async function loadAllSessionRows(): Promise<
  readonly Readonly<Record<string, ReadonlyJSONValue>>[]
> {
  const asked = await askComposed({ "page-type": SESSION_TRACKING_PAGE_TYPE_SLUG })
  if (!asked.ok) throw new Error(`session points: ${asked.why}`)
  const { n, rows } = asked.answer
  if (rows.length !== n) {
    throw new Error(
      `session points: the ${SESSION_TRACKING_PAGE_TYPE_SLUG} read came back with ` +
        `${rows.length} of ${n} page(s), so any total summed from it would be low`
    )
  }
  return rows.map((row) => row.values as Readonly<Record<string, ReadonlyJSONValue>>)
}

export async function readSessionPointsSource(
  spec: PersonaSessionSpec
): Promise<SessionPointsSource> {
  const [defs, rows] = await Promise.all([loadSessionTrackingDefs(), loadAllSessionRows()])
  const declared = defs.some((def) => (def as { readonly key?: unknown }).key === spec.pointsPropId)
  if (!declared) {
    return {
      defs,
      rows,
      undeclared:
        `no property definition declares \`${spec.pointsPropId}\` on ` +
        `\`${SESSION_TRACKING_PAGE_TYPE_SLUG}\`, so every session scores 0 and any total ` +
        `written from it would state an instrument's silence as a measurement`,
    }
  }
  return { defs, rows, undeclared: null }
}

async function personaFor(
  personaSlug: string
): Promise<Readonly<Record<string, unknown>> | undefined> {
  return (await personaRecipeRows()).find((row) => textOf(row.slug) === personaSlug)
}

export interface SessionTotalsReport {
  readonly outcomes: readonly SessionTotalsOutcome[]
  readonly undeclared: string | null
}

export async function writeSessionPointsTotalForPersona(
  spec: PersonaSessionSpec
): Promise<SessionTotalsReport> {
  const source = await readSessionPointsSource(spec)
  if (source.undeclared !== null) return { outcomes: [], undeclared: source.undeclared }

  const total = sumSessionPointsForValue(source.rows, spec.pointsPropId)

  const personaRaw = await personaFor(spec.personaSlug)
  const persona = personaRaw === undefined ? null : PersonaSessionRowSchema.parse(personaRaw)

  const { patches, outcomes } = planPersonaSessionWrite(total, persona)
  for (const patch of patches) {
    const landed = await patchPage(
      patch.pageTypeSlug,
      patch.slug,
      { "total-points": patch.totalPoints },
      WRITER
    )
    if (!landed.ok) throw new Error(`the ${patch.slug} session total went unwritten: ${landed.why}`)
  }

  return { outcomes, undeclared: null }
}

export interface SessionDailyOutcome {
  readonly dayStr: string
  readonly personaTitle: string
  readonly sourcePoints: number
  readonly outcome: "created" | "patched"
}

export interface SessionDailyReport {
  readonly days: readonly SessionDailyOutcome[]
  readonly undeclared: string | null
}

export async function writeSessionPointsDailyForPersona(
  spec: PersonaSessionSpec,
  dayStrs: readonly string[]
): Promise<SessionDailyReport> {
  const source = await readSessionPointsSource(spec)
  if (source.undeclared !== null) return { days: [], undeclared: source.undeclared }

  const personaRaw = await personaFor(spec.personaSlug)
  if (personaRaw === undefined) return { days: [], undeclared: null }
  const persona = PersonaSessionRowSchema.parse(personaRaw)
  const target: PersonaDayTarget = {
    id: persona.id,
    slug: persona.slug ?? persona.id,
    title: persona.title ?? persona.slug ?? persona.id,
    ...(persona.valueSlug === undefined ? {} : { valueSlug: persona.valueSlug }),
    greenDayPoints: numberOf(persona.greenDayPoints) ?? DEFAULT_GREEN_DAY_POINTS,
  }

  const days: SessionDailyOutcome[] = []
  for (const dayStr of dayStrs) {
    const raw = sumSessionPointsForWindow(source.rows, spec.pointsPropId, getEsoDayWindow(dayStr))
    const sourcePoints = Math.max(0, raw)
    const outcome = await patchPersonaDayField(dayStr, SOURCE_POINTS_FIELD, sourcePoints, target)
    days.push({ dayStr, personaTitle: target.title, sourcePoints, outcome })
  }
  return { days, undeclared: null }
}

export { PERSONA_PAGE_TYPE_SLUG }
