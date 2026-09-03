import { DAILY_TRACKING, dayByDate, landDayPage } from "../tracking/day-place.ts"

export type WriteOutcome = "patched" | "created"

export const POINTS_WRITER = "daily-tracking-points"

/**
 * The version a day states, which a day this creates has to state too.
 *
 * `lib/tracking/resolve.ts` holds the same number for the days the tracking commands make. A day
 * made here without it would be the only day carrying no version, and every reader that reads the
 * version off a day would meet nothing where every other day has something.
 */
const DAILY_TRACKING_VERSION = "3.0"

/**
 * How a day spells the key each reading lands under.
 *
 * The store spells a day's keys in kebab and these callers name them in camel, so the two spellings
 * meet here rather than at eight call sites. It is a stated list rather than a conversion because a
 * key this does not know is a key no day carries: `writeDailyReading` refuses one instead of
 * inventing a property on Alan's day out of a caller's typo.
 */
const DAY_KEY_OF: Readonly<Record<string, string>> = {
  activeCalories: "active-calories",
  strengthVolume: "strength-volume",
  sleepPoints: "sleep-points",
  nutritionPoints: "nutrition-points",
  taskPoints: "task-points",
  breathingPoints: "breathing-points",
  wisdomWords: "wisdom-words",
  intelligenceWords: "intelligence-words",
}

/**
 * One recomputed reading, landed on the day it is a reading of.
 *
 * This used to refuse every write, saying nothing rendered a `daily-tracking` body out of the keys a
 * page carries. That had stopped being true: `landDayPage` renders one, and `lib/tracking/resolve.ts`
 * already made days with it. A refusal whose reason has quietly become false is worse than the gap
 * it was written for, because it reads as a considered decision rather than as work left undone.
 *
 * Three things this leans on rather than redoing:
 *
 * `landDayPage` is the funnel, so which half of the corpus the day is kept in is decided in the one
 * file that decides it. A writer that composed a path itself would keep working until the first day
 * moved and then write to the half the day had left.
 *
 * `patch` merges rather than replaces. The page writer composes the new body from the standing one,
 * so the ~30 other keys a day carries are read off the file and written back. Landing the same six
 * readings with `write` would take a day down to six keys.
 *
 * A patch of a value the day already holds composes byte-identical text, and the writer commits
 * nothing where nothing changed. That is what makes an hourly rerun of a settled day cost nothing:
 * the second run is not a second write, it is no write.
 */
export async function writeDailyReading(
  dayStr: string,
  field: string,
  value: number
): Promise<WriteOutcome> {
  const key = DAY_KEY_OF[field]
  if (key === undefined) {
    throw new Error(
      `\`${field}\` is not a reading a \`${DAILY_TRACKING}\` day carries — the day keys are ` +
        `${Object.keys(DAY_KEY_OF).join(", ")}, and landing an unknown one would put a property ` +
        "on Alan's day that no reader of it asks for"
    )
  }
  if (!Number.isFinite(value)) {
    throw new Error(
      `the ${field} for ${dayStr} came out ${value}, which is no reading — landing it would ` +
        "state a failed computation as a measurement"
    )
  }

  const held = await dayByDate(dayStr)
  const created = held === null || held.id === ""
  const identity = created
    ? {
        id: Bun.randomUUIDv7(),
        title: `@date:${dayStr}`,
        date: dayStr,
        version: DAILY_TRACKING_VERSION,
      }
    : {}

  const landed = await landDayPage("patch", dayStr, { ...identity, [key]: value }, POINTS_WRITER)
  if (!landed.ok) {
    throw new Error(`the ${field} for ${dayStr} did not land: ${landed.why}`)
  }
  return created ? "created" : "patched"
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

export function writeWisdomWords(dayStr: string, wisdomWords: number): Promise<WriteOutcome> {
  return writeDailyReading(dayStr, "wisdomWords", wisdomWords)
}

export function writeIntelligenceWords(
  dayStr: string,
  intelligenceWords: number
): Promise<WriteOutcome> {
  return writeDailyReading(dayStr, "intelligenceWords", intelligenceWords)
}
