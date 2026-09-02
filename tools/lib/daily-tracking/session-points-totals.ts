import {
  DEFAULT_GREEN_DAY_POINTS,
  getEsoDayWindow,
  numberOf,
  SOURCE_POINTS_FIELD,
  textOf,
  WRITER,
} from "./tracking-modules.ts"
import {
  allSessions,
  sessionPropertyDefinitions,
  sessionPropertyUndeclared,
} from "../tracking/day-place.ts"
import { type PersonaDayTarget, patchPersonaDayField } from "./persona-day-points.ts"
import { landTotalPoints } from "./persona-total-landing.ts"
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

/**
 * What a session row is declared as able to carry, and every session row there is.
 *
 * All three reads are asked through the funnel. They used to be composed here and handed to
 * `askComposed` off `./tracking-modules.ts` — the remote half of the query facade, which answers
 * that neither `page-property-definition` nor `session-tracking` names a page type the index holds.
 * So both refused, and the four functions below them had never once run against a real reading.
 *
 * The short-read comparison and the sentence about an undeclared property both went to the funnel
 * with them, because both are statements about the session page type, and the funnel is the one
 * thing that says what that page type is called and where its rows are kept.
 */
async function loadSessionTrackingDefs(): Promise<readonly PropertyDefinition[]> {
  const defs = await sessionPropertyDefinitions()
  return defs.map((values) => values as unknown as PropertyDefinition)
}

async function loadAllSessionRows(): Promise<
  readonly Readonly<Record<string, ReadonlyJSONValue>>[]
> {
  const { rows } = await allSessions()
  return rows.map((row) => row.values as Readonly<Record<string, ReadonlyJSONValue>>)
}

export async function readSessionPointsSource(
  spec: PersonaSessionSpec
): Promise<SessionPointsSource> {
  const [defs, rows, undeclared] = await Promise.all([
    loadSessionTrackingDefs(),
    loadAllSessionRows(),
    sessionPropertyUndeclared(spec.pointsPropId),
  ])
  return { defs, rows, undeclared }
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
    const landed = await landTotalPoints(
      patch.pageTypeSlug,
      patch.slug,
      patch.totalPoints,
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
