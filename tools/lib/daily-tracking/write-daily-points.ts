import { DAILY_TRACKING } from "../tracking/day-place.ts"

export type WriteOutcome = "patched" | "created"

/**
 * A day's reading has nowhere to land.
 *
 * These readings stand on `daily-tracking` pages, and a page is written by naming a path and the
 * whole body standing at it. Nothing renders a `daily-tracking` body out of the keys a page
 * carries, so the figure cannot become a file. This refuses rather than reporting a write, because
 * every caller reports what it is told and a day silently unwritten reads as a day with no points
 * in it — a false statement about the day rather than the gap it is.
 */
function unwritable(dayStr: string, field: string): never {
  throw new Error(
    `the ${field} for ${dayStr} went unwritten: a \`${DAILY_TRACKING}\` page is ` +
      "written by naming a path and a whole body, and nothing renders that body out of the keys a " +
      "page carries, so this figure has nowhere to land"
  )
}

export async function writeDailyReading(
  dayStr: string,
  field: string,
  _value: number
): Promise<WriteOutcome> {
  return unwritable(dayStr, field)
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
