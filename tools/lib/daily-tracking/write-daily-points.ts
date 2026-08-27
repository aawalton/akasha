import { askComposed, kebabKey, numberOf, patchPage, WRITER } from "./code-bridge.ts"
import { DAILY_TRACKING_PAGE_TYPE_SLUG, ensureDailyPage } from "./daily-row.ts"
import { patchPersonaDayField, resolvePersonaBySlug } from "./persona-day-points.ts"
import { readingSources, sourcePointsFrom } from "./reading-sources.ts"
import { writeValuePointsForDay } from "./value-points.ts"

export type WriteOutcome = "patched" | "created"

const SOURCE_POINTS_FIELD = "sourcePoints"

async function readDailyReadings(
  dayStr: string,
  fields: readonly string[]
): Promise<Readonly<Record<string, number>>> {
  const asked = await askComposed({
    "page-type": DAILY_TRACKING_PAGE_TYPE_SLUG,
    where: { date: { is: dayStr } },
    keys: ["date", ...fields.map(kebabKey)],
    limit: 1,
  })
  if (!asked.ok) throw new Error(`readDailyReadings: ${asked.why}`)
  const row = asked.answer.rows[0]
  if (row === undefined) return {}
  const held: Record<string, number> = {}
  for (const field of fields) {
    const value = numberOf(row.values[kebabKey(field)])
    if (value !== undefined) held[field] = value
  }
  return held
}

export async function writeDailyReading(
  dayStr: string,
  field: string,
  value: number
): Promise<WriteOutcome> {
  await ensureDailyPage(dayStr)
  const landed = await patchPage(
    DAILY_TRACKING_PAGE_TYPE_SLUG,
    dayStr,
    { [kebabKey(field)]: value },
    WRITER
  )
  if (!landed.ok) throw new Error(`the ${field} for ${dayStr} went unwritten: ${landed.why}`)

  const sources = await readingSources()
  const earners = new Set(
    sources.filter((source) => source.field === field).map((source) => source.personaSlug)
  )
  if (earners.size === 0) return "patched"

  const readings = await readDailyReadings(
    dayStr,
    [...new Set(sources.map((source) => source.field))]
  )
  for (const personaSlug of earners) {
    const hers = sources.filter((source) => source.personaSlug === personaSlug)
    const persona = await resolvePersonaBySlug(personaSlug)
    await patchPersonaDayField(dayStr, SOURCE_POINTS_FIELD, sourcePointsFrom(hers, readings), persona)
  }
  await writeValuePointsForDay(dayStr)
  return "patched"
}

export function writeActiveCalories(dayStr: string, activeCalories: number): Promise<WriteOutcome> {
  return writeDailyReading(dayStr, "activeCalories", activeCalories)
}

export function writeStrengthVolume(dayStr: string, strengthVolume: number): Promise<WriteOutcome> {
  return writeDailyReading(dayStr, "strengthVolume", strengthVolume)
}

export function writeSleepPoints(dayStr: string, sleepPoints: number): Promise<WriteOutcome> {
  return writeDailyReading(dayStr, "sleepPoints", sleepPoints)
}

export function writeNutritionPoints(
  dayStr: string,
  nutritionPoints: number
): Promise<WriteOutcome> {
  return writeDailyReading(dayStr, "nutritionPoints", nutritionPoints)
}

export function writeTaskPoints(dayStr: string, taskPoints: number): Promise<WriteOutcome> {
  return writeDailyReading(dayStr, "taskPoints", taskPoints)
}

export function writeBreathingPoints(
  dayStr: string,
  breathingPoints: number
): Promise<WriteOutcome> {
  return writeDailyReading(dayStr, "breathingPoints", breathingPoints)
}
