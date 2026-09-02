import { fetchSurplusHours } from "@akasha/readout-system/upkeep-surplus"
import { askComposed } from "../page-query-client.ts"
import { resolveReadoutGroup } from "../../../readouts/readout-resolver.ts"
import { type ReadoutScale, readoutShape } from "../../../readouts/readout-scale-shape.ts"
import { isTierColor, type Rung } from "./tier.ts"

// WHERE THE TWO READINGS COME FROM. Both are keys on the day's `daily-tracking` row, asked of
// `@akasha/pages-system-service` and reduced here. `surplus-hours` is read by the same
// `fetchSurplusHours` the surplus reading service uses, so the tier said here and the tile drawn
// on the website are taken off one function rather than two that can drift.
//
// `sleep-hours` has no such function of its own yet, so the ask is written out below in the shape
// `fetchSurplusHours` uses. The `sleep-hours-on-day` readout query states the same page type and
// the same target, so the two agree; if a third caller wants the night, lift this beside the
// surplus one rather than writing it a third time.
export const DAY_PAGE_TYPE = "daily-tracking"

export const DAY_KEY = "date"

export const SLEEP_HOURS_KEY = "sleep-hours"

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
  return fetchSurplusHours(askComposed, day)
}

export async function readSleepHours(day: string): Promise<number | null> {
  const asked = await askComposed({
    "page-type": DAY_PAGE_TYPE,
    where: { [DAY_KEY]: { is: day } },
    keys: [SLEEP_HOURS_KEY],
    limit: 1,
  })
  if (!asked.ok) {
    throw new Error(
      `readSleepHours: the tracking day went unread, so the night the day opened on is unknown rather than unslept: ${asked.why}`
    )
  }
  const row = asked.rows[0]
  if (row === undefined) return null
  return hoursIn(row.values[SLEEP_HOURS_KEY])
}
