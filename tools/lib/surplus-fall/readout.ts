import { surplusIn } from "@akasha/readout-system/upkeep-surplus"
import { dayValuesByDate } from "../tracking/day-place.ts"
import { resolveReadoutGroup } from "../../../readouts/readout-resolver.ts"
import { type ReadoutScale, readoutShape } from "../../../readouts/readout-scale-shape.ts"
import { isTierColor, type Rung } from "./tier.ts"

// WHERE THE TWO READINGS COME FROM. Both are keys on the day's tracking row, and the row is asked
// for through `dayValuesByDate` — the funnel's by-date reader, which is what says where a day is
// kept. Neither reading composes a query of its own any more: this file used to name the day page
// type and hand the query straight to the page client, which decided for itself which half of the
// migration the day was in, and would have gone on reading the markdown half after the day moved.
//
// What each reading *means* is still decided in akasha. `surplusIn` is the same reducer
// `fetchSurplusHours` uses and the same one the surplus reading service draws its tile from, so the
// tier said here and the tile on the website are taken off one function rather than two that can
// drift. The split is that akasha says what a reading means and the funnel says where the day is.
//
// `sleep-hours` has no reducer of its own, so `hoursIn` is applied to the key below. The
// `sleep-hours-on-day` readout query names the same key, so the two agree.
export const SLEEP_HOURS_KEY = "sleep-hours"

const SURPLUS_KEYS = ["surplus-hours", SLEEP_HOURS_KEY, "spend-hours"] as const

export interface Readout {
  readonly slug: string
  readonly label: string
  readonly rungs: readonly Rung[]
}

export function rungsOf(scale: ReadoutScale): readonly Rung[] {
  const shape = readoutShape(scale)
  const rungs: Rung[] = []
  for (const rung of shape.rungs) {
    if (!isTierColor(rung.color)) {
      throw new Error(
        `rungsOf: the readout scale \`${shape.slug}\` states a \`${rung.color}\` rung, and a fall is said in the five colors a tier carries`
      )
    }
    rungs.push({ at: rung.at, color: rung.color })
  }
  if (shape.direction !== "ascending") {
    throw new Error(
      `rungsOf: the readout scale \`${shape.slug}\` falls from black through blue, so a lower reading is the better one and a fall down it is a climb`
    )
  }
  return rungs
}

export async function resolveOneReadout(groupSlug: string): Promise<Readout> {
  const group = await resolveReadoutGroup(groupSlug)
  const [readout, ...rest] = group.readouts
  if (readout === undefined || rest.length > 0) {
    throw new Error(
      `resolveOneReadout: the group \`${groupSlug}\` holds ${group.readouts.length} readouts, and this watches one reading rather than a strip`
    )
  }
  return {
    slug: readout.slug,
    label: readout.label,
    rungs: rungsOf(readout.scale),
  }
}

export function hoursIn(held: unknown): number | null {
  if (typeof held !== "number" && typeof held !== "string") return null
  const trimmed = typeof held === "string" ? held.trim() : held
  if (trimmed === "") return null
  const hours = Number(trimmed)
  return Number.isFinite(hours) ? hours : null
}

export async function readReading(day: string): Promise<number | null> {
  const values = await dayValuesByDate(day, SURPLUS_KEYS)
  if (values === null) return null
  return surplusIn(values)
}

export async function readSleepHours(day: string): Promise<number | null> {
  const values = await dayValuesByDate(day, [SLEEP_HOURS_KEY])
  if (values === null) return null
  return hoursIn(values[SLEEP_HOURS_KEY])
}
