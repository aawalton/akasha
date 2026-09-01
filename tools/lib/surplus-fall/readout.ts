import { askPage } from "@shared/pages-query/ask"
import { resolveReadoutGroup } from "../../../readouts/readout-resolver.ts"
import { type ReadoutScale, readoutShape } from "../../../readouts/readout-scale-shape.ts"
import { isTierColor, type Rung } from "./tier.ts"

export const DAY_ARGUMENT_TYPE = "calendar-date"

export const MEASURES_QUERY = "daily-tracking-all"

export interface Readout {
  readonly slug: string
  readonly label: string
  readonly rungs: readonly Rung[]
  readonly querySlug: string
  readonly dayArgument: string
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

export async function dayArgumentOf(querySlug: string): Promise<string> {
  const asked = await askPage("page-query", querySlug)
  if (asked.outcome !== "found") throw new Error(`dayArgumentOf: ${asked.why}`)
  const takes = asked.page.values.takes
  if (takes === null || typeof takes !== "object" || Array.isArray(takes)) {
    throw new Error(
      `dayArgumentOf: the page query \`${querySlug}\` states no \`takes\`, so nothing on it says which argument the day fills`
    )
  }
  const named = Object.entries(takes as Record<string, unknown>)
    .filter(([, type]) => type === DAY_ARGUMENT_TYPE)
    .map(([name]) => name)
  const one = named[0]
  if (one === undefined || named.length > 1) {
    throw new Error(
      `dayArgumentOf: the page query \`${querySlug}\` takes ${named.length} \`${DAY_ARGUMENT_TYPE}\` arguments, and a readout holds one day`
    )
  }
  return one
}

export async function resolveOneReadout(groupSlug: string): Promise<Readout> {
  const group = await resolveReadoutGroup(groupSlug)
  const [readout, ...rest] = group.readouts
  if (readout === undefined || rest.length > 0) {
    throw new Error(
      `resolveOneReadout: the group \`${groupSlug}\` holds ${group.readouts.length} readouts, and this watches one reading rather than a strip`
    )
  }
  const querySlug = readout.querySlug
  if (querySlug === null) {
    throw new Error(
      `resolveOneReadout: the readout \`${readout.slug}\` states no \`query-slug\`, so nothing answers it`
    )
  }
  return {
    slug: readout.slug,
    label: readout.label,
    rungs: rungsOf(readout.scale),
    querySlug,
    dayArgument: await dayArgumentOf(querySlug),
  }
}

// BOTH READINGS BELOW ASKED A SAVED QUERY, AND NOTHING ANSWERS ONE. A saved query was a file in
// the checkout, read by the page engine that `4c1f05a264` severed; `askTaking` and `askNamed`
// have refused every slug since. Each of these asked one and threw on the refusal, so the fall
// notifier has stopped here on every tick since that commit.
//
// The refusal is stated here rather than fetched from a shim that always says no. What each
// wanted is rows and one number off them, which the service answers and does not reduce, so the
// reduction has to be written at this caller — as `alanwalton/web/app/routes/api.claude-usage.ts`
// does for the four saved queries it took over.
const NO_SAVED_QUERY =
  "a saved query is answered by the page engine that has been removed. ask `@akasha/pages-system-service/calling` for the rows and take the reading off them here"

export async function readReading(readout: Readout, _day: string): Promise<number | null> {
  throw new Error(
    `readReading: \`${readout.slug}\` went unread — its reading stands behind the saved query \`${readout.querySlug}\`, and ${NO_SAVED_QUERY}`
  )
}

export async function readSleepHours(_day: string): Promise<number | null> {
  throw new Error(
    `readSleepHours: sleep stands behind the saved query \`${MEASURES_QUERY}\`, and ${NO_SAVED_QUERY}`
  )
}
